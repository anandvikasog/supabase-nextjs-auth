"use server";

import createClient from "../supabase/server";

const signup = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const supabase = createClient();

  const data = {
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  };

  const result = await supabase.auth.signUp(data);
  return JSON.stringify(result);
};

export default signup;
