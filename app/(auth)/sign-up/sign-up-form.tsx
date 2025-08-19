"use client";

import { Button, Label, Input } from "@/components/ui";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full">
        {pending ? "Signing Up..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" />
          {data?.errors?.name && (
            <p className="text-sm text-destructive">{data.errors.name[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            required
          />
          {data?.errors?.email && (
            <p className="text-sm text-destructive">{data.errors.email[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          {data?.errors?.password && (
            <p className="text-sm text-destructive">
              {data.errors.password[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
          {data?.errors?.confirmPassword && (
            <p className="text-sm text-destructive">
              {data.errors.confirmPassword[0]}
            </p>
          )}
        </div>
        <SignUpButton />
        {/* Top-level message (non-field specific) */}
        {data?.message && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{""}
          <Link href="/sign-in" target="_self" className="link ps-1">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
