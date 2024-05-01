import verifyCode from "@/lib/actions/verifyCode";
import { paths } from "@/paths";
// import createClient from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const next = paths.private.emailVerified;

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  // redirectTo.searchParams.delete("code");

  if (code) {
    const { error } = await verifyCode(code);
    // const supabase = createClient();
    // const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = paths.public.signIn;
  return NextResponse.redirect(redirectTo);
}
