import { logger, task } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  email: string;
  fullName?: string; // maybe: include user’s full name to personalize the email
}

export const sendConfirmationEmail = task({
  id: "send-confirmation-email",
  maxDuration: 300, // 5 minutes max execution time (maxDuration is in seconds)
  run: async (payload: EmailPayload, { ctx }) => {
    const { email, fullName } = payload;

    logger.log("Sending confirmation email", { email, fullName, ctx });

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // replace with no-reply@uwaterloopm.com eventually
      to: email,
      subject: "UWPM Application Confirmation",
      html: `
        <h1>Application Received</h1>
        <p>Hi ${fullName || "there"},</p>
        <p>Thank you for applying to UWPM! Your application has been received. We’ll review it and get back to you soon.</p>
        <p>Best,<br>The UWPM Team</p>
      `,
    });

    logger.log("Email sent", { emailResponse });

    return {
      message: `Confirmation email sent to ${email}`,
      emailResponse,
    };
  },
});