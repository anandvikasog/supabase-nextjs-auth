import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: `Reset password | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <ResetPasswordForm />;
}
