import { logger, task } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";
import { questionToText } from "@/app/apply/layouts/formSchema";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY. Set it in your environment variables.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  type: "confirmation" | "result"; // type of email to send
  email: string;
  fullName?: string; // maybe: include user’s full name to personalize the email
  responses?: any; // include user’s responses to the application questions
}

export const sendConfirmationEmail = task({
  id: "send-confirmation-email",
  maxDuration: 300, // 5 minutes max execution time (maxDuration is in seconds)
  run: async (payload: EmailPayload, { ctx }) => {
    const { type, email, fullName, responses } = payload;

    logger.log(`Sending ${type} email`, { type, email, fullName, responses, ctx });

    // If DRY_RUN is enabled, do not call Resend — return the generated HTML for preview.
    const html = type === "confirmation" ? createEmailTemplate(fullName, responses) : responses?.message;

    if (process.env.RESEND_DRY_RUN === "1") {
      logger.log("DRY RUN - email payload", { from: process.env.RESEND_FROM || "no-reply@uwaterloopm.com", to: email, subject: type === "confirmation" ? "ProdCon Application Confirmation" : responses?.subject });
      // Return the html so callers or tests can preview it without sending
      return {
        message: `DRY_RUN: ${type} email generated for ${email}`,
        html,
      };
    }

    // Send the email using Resend. Use `RESEND_FROM` if available so different envs can test with a verified sender.
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM || "no-reply@uwaterloopm.com",
      to: email,
      subject: type === "confirmation" ? "ProdCon Application Confirmation" : responses?.subject,
      html,
    });

    logger.log("Email sent", { emailResponse });

    return {
      message: `${type} email sent to ${email}`,
      emailResponse,
    };
  },
});


const createEmailTemplate = (fullName: string | undefined, responses: any) => {
  const escape = (str: any) => {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/\'/g, "&#39;");
  };

  const applicantName = (responses && (responses.individual_app_name || responses.team_app_name)) || fullName || "Applicant";

  const email = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f172a; }
          .container { max-width: 680px; margin: 24px auto; padding: 24px; background: #ffffff; border-radius: 8px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
          h1 { margin: 0 0 8px 0; font-size: 20px; }
          p.lead { margin: 8px 0 18px 0; color: #475569; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Application Received</h1>
          <p class="lead">Hi ${escape(applicantName) || "there"},</p>
          <p>Thank you for submitting your application. We will review your submission and get back to you within a few days.</p>

          <p style="margin-top:20px;color:#475569">Best regards,<br/>The UWPM Team</p>
        </div>
      </body>
    </html>
  `;

  return email;
};