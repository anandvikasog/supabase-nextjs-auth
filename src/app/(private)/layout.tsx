import AddAuthData from "@/components/auth/auth-store";
import createClient from "@/lib/supabase/server";
import { paths } from "@/paths";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();

  if (!userData?.data?.user) {
    redirect(paths.public.signIn);
  }

  return (
    <>
      <AddAuthData userData={userData.data.user} />
      {children}
    </>
  );
}
