import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Fetch user from Supabase
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // Ensure supabase query was processed
  if (error || !users) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Hashes password to comapre to supabase
  const passwordMatch = await bcrypt.compare(password, users.password);
  if (!passwordMatch) {
    const response = NextResponse.json(
      { error: "Invalid password" },
      { status: 401 },
    );
    response.cookies.set("auth_token", "", {
      expires: new Date(0),
      httpOnly: true,
    }); // Expire the cookie after session
    return response;
  }

  // Cookie for authentication
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", "some_random_token", { httpOnly: true });

  return response;
}
