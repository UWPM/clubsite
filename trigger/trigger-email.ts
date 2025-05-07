import { logger, task } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";
import { questionToText } from "@/app/apply/layouts/formSchema";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY. Set it in your environment variables.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  email: string;
  fullName?: string; // maybe: include user’s full name to personalize the email
  responses?: any; // include user’s responses to the application questions
}

export const sendConfirmationEmail = task({
  id: "send-confirmation-email",
  maxDuration: 300, // 5 minutes max execution time (maxDuration is in seconds)
  run: async (payload: EmailPayload, { ctx }) => {
    const { email, fullName, responses } = payload;

    logger.log("Sending confirmation email", { email, fullName, responses, ctx });

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "no-reply@uwaterloopm.com", // replace with no-reply@uwaterloopm.com eventually
      to: email,
      subject: "UWPM Application Confirmation",
      html: createEmailTemplate(fullName, responses),
    });

    logger.log("Email sent", { emailResponse });

    return {
      message: `Confirmation email sent to ${email}`,
      emailResponse,
    };
  },
});


const createEmailTemplate = (fullName: string | undefined, responses: any) => {
  let email = `
    <html>
      <body>
          <h1>UWPM Application Received</h1>
          <p>Hi ${fullName || "there"},</p>
          <p>Thank you for applying to UWPM! Your application has been received. We’ll review it and get back to you soon.</p>
  `;

  // Include responses if available
  if (responses) {
    email = email + `
    <br>
    <hr>
    <h2>Your Responses</h2>
    `;

    let applicantProfile = `
      <div>
        <h3>Applicant Profile:</h3>
        <p>${fullName} (${responses.term} ${responses.program})</p>
        <p>On ${responses.term_type} (${responses.on_campus ? 'On Campus' : 'Off Campus'})</p>
        <p><a href="${responses.resume_link}">Resume Link</a></p>
        <i>"${responses.why_interested}"</i>
      </div>
    `

    email = email + applicantProfile + '<br>';

    let responseSection = ''

    // first choice team
    let first_team = responses.first_choice_team.toLowerCase();
    responseSection += `<div>
            <h3>${first_team.charAt(0).toUpperCase() + first_team.slice(1)} Team ${Object.keys(responses.team_responses).length == 2 ? "(First Choice)" : ""}</h3>
            `;
    if (responses.team_responses[first_team]) {
      for (const [question, answer] of Object.entries(responses.team_responses[first_team] as Record<string, string>)) {
        if (question === 'choice_num' || question === "director_applicant" || question === "lead_applicant") continue;
        responseSection += `<p><strong>${questionToText[question] ? questionToText[question] : question}</strong></p>
                            <p style="margin-top: -0.5rem">${answer}</p>`;
      }
    } else {
      console.warn(`No responses found for the first choice team: ${first_team}`);
    }
    responseSection += '</div>'

    // second choice team
    if (Object.keys(responses.team_responses).length == 2) {
      responseSection += '<br>'
      let second_team = responses.second_choice_team.toLowerCase();
      responseSection += `<div>
              <h3>${second_team.charAt(0).toUpperCase() + second_team.slice(1)} Team (Second Choice)</h3>
              `;
      if (responses.team_responses[second_team]) {
        for (const [question, answer] of Object.entries(responses.team_responses[second_team] as Record<string, string>)) {
          if (question === 'choice_num' || question === "director_applicant" || question === "lead_applicant") continue;
          responseSection += `<p><strong>${questionToText[question] ? questionToText[question] : question}</strong></p>
                              <p style="margin-top: -0.5rem">${answer}</p>`;
        }
      } else {
        console.warn(`No responses found for the second choice team: ${second_team}`);
      }
      responseSection += '</div>'
    }

    email = email + responseSection + '<hr><br>';
  }

  email = email + 
  `
        <p>Best,<br>The UWPM Team</p>
      </body>
    </html>
  `;

  console.log(email);
  return email;
}