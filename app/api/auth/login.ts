import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);


export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Fetch user from Supabase
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Hashes password to comapre to supabase
  const hashedPassword = hashPassword(password)
  if (hashedPassword != user.password) {
    return NextResponse.json({error: "Invalid password"}, {status: 401});
  }

  // Set token (cookie) for authentication
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", "some_random_token", { httpOnly: true });

  console.log(user.password)


  return response;
  
}
