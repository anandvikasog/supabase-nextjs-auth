"use server";

import createClient from "../supabase/server";

const logout = async () => {
  const supabase = await createClient();

  const result = await supabase.auth.signOut();
  return JSON.stringify(result);
};

export default logout;
