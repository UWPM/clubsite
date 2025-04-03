import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);


export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1️⃣ Fetch user from Supabase
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // 2️⃣ Compare password with hash
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // 3️⃣ Set token (cookie) for authentication
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", "some_random_token", { httpOnly: true });

  return response;
}
