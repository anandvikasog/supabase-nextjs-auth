"use server";

import createClient from "../supabase/server";

const verifyCode = async (code: string) => {
  const supabase = createClient();

  const result = await supabase.auth.exchangeCodeForSession(code);
  return result;
};

export default verifyCode;
