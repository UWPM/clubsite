// app/api/email/route.ts
import { sendConfirmationEmail } from "@/trigger/trigger-email";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, fullName, responses } = await request.json(); // expect email and fullName in the request body

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const handle = await tasks.trigger<typeof sendConfirmationEmail>(
    "send-confirmation-email",
    { type:"confirmation", email, fullName, responses } // pass the payload
  );

  return NextResponse.json({ message: "Email task triggered", handle });
}

// Keep GET for testing
export async function GET() {
  const handle = await tasks.trigger<typeof sendConfirmationEmail>(
    "send-confirmation-email",
    { type: "confirmation", email: "test@gmail.com", fullName: "Test User" } // hardcoded for testing
  );

  return NextResponse.json({ message: "Test email task triggered", handle });
}