"use server";

import createClient from "../supabase/server";

const forgetPassword = async ({ email }: { email: string }) => {
  const supabase = await createClient();

  const result = await supabase.auth.resetPasswordForEmail(email);
  return JSON.stringify(result);
};

export default forgetPassword;
