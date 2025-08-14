"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

type SignUpState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

// sign in the user with credentials
export async function signInWithCredetials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

export async function signUpUser(_: SignUpState, formData: FormData): Promise<SignUpState> {
  // 1) Validate safely
  const parsed = signUpFormSchema.safeParse({
    name: (formData.get("name") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    password: (formData.get("password") ?? "").toString(),
    confirmPassword: (formData.get("confirmPassword") ?? "").toString(),
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    return { success: false, message: "", errors: fieldErrors };
  }

  const { name, email, password } = parsed.data;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";

  try {
    await prisma.user.create({
      data: { name, email, password: hashSync(password, 10) },
    });

    await signIn("credentials", { email, password, redirectTo: callbackUrl });

    return { success: true, message: "Your account has been registered successfully" };
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    if (isRedirectError(error)) throw error;

    // Prisma unique email
    if (error?.code === "P2002") {
      return { success: false, message: "", errors: { email: ["Email is already registered"] }};
    }

    // Unknown error
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
