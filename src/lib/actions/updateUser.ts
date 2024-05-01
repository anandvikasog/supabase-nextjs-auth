"use server";

import createClient from "../supabase/server";

const updateUser = async (data: any) => {
  const supabase = await createClient();

  const result = await supabase.auth.updateUser(data);
  if (result?.error) {
    return JSON.stringify(result);
  }
  return JSON.stringify({ error: { code: "Email already registered." } });
};

export default updateUser;
