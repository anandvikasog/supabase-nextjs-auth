"use server";

import createClient from "../supabase/server";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();

  const data = {
    email,
    password,
  };

  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
};

export default login;
