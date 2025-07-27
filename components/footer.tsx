import { APP_NAME } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 align_middle text-center text-sm">
        {currentYear} &copy; {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};
