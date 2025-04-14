// app/api/result-email/route.ts
import { sendConfirmationEmail } from "@/trigger/trigger-email";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse } from "next/server";

interface EmailRequest {
  email: string;
  fullName: string;
  responses: {
    subject: string;
    message: string;
  };
}

export async function POST(request: Request) {
  try {
    const { email, fullName, responses }: EmailRequest = await request.json();

    if (!email || !fullName || !responses?.subject || !responses?.message) {
      return NextResponse.json(
        { error: "Missing required fields: email, fullName, subject, or message" },
        { status: 400 }
      );
    }

    const handle = await tasks.trigger<typeof sendConfirmationEmail>(
      "send-confirmation-email",
      {
        type: "result",
        email,
        fullName,
        responses,
      }
    );

    return NextResponse.json({ message: "Email task triggered", handle });
  } catch (error) {
    console.error("Error processing email request:", error);
    return NextResponse.json(
      { error: "Failed to process email request" },
      { status: 500 }
    );
  }
}

// Keep GET for testing
export async function GET() {
  try {
    const handle = await tasks.trigger<typeof sendConfirmationEmail>(
      "send-confirmation-email",
      {
        type: "result",
        email: "test@gmail.com",
        fullName: "Test User",
        responses: {
          subject: "Test Subject",
          message: "Test Message",
        },
      }
    );

    return NextResponse.json({ message: "Test email task triggered", handle });
  } catch (error) {
    console.error("Error processing test email:", error);
    return NextResponse.json(
      { error: "Failed to process test email" },
      { status: 500 }
    );
  }
}