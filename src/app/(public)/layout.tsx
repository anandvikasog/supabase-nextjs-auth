import React from "react";
import { redirect } from "next/navigation";

import createClient from "@/lib/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();

  if (userData?.data?.user !== null) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
