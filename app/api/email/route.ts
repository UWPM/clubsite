// app/api/email/route.ts
import { sendConfirmationEmail } from "@/trigger/trigger-email";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, fullName, responses } = await request.json(); // expect email and fullName in the request body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const handle = await tasks.trigger<typeof sendConfirmationEmail>(
      "send-confirmation-email",
      { type: "confirmation", email, fullName, responses } // pass the payload
    );

    return NextResponse.json({ message: "Email task triggered", handle });
  } catch (err: any) {
    // In development, return the underlying error message to aid debugging.
    // In production, avoid leaking internals.
    const isProd = process.env.NODE_ENV === "production";
    const message = err?.message ?? String(err);
    if (isProd) {
      return NextResponse.json({ error: "Failed to trigger email" }, { status: 500 });
    }

    return NextResponse.json(
      {
        error: "Failed to trigger email",
        details: message,
        stack: err?.stack,
      },
      { status: 500 }
    );
  }
}

// Keep GET for testing
export async function GET() {
  const handle = await tasks.trigger<typeof sendConfirmationEmail>(
    "send-confirmation-email",
    {
      type: "confirmation",
      email: "test@gmail.com",
      fullName: "Test User",
      responses: { example: "This is a test response", timestamp: new Date().toISOString() },
    } // hardcoded for testing
  );

  return NextResponse.json({ message: "Test email task triggered", handle });
}