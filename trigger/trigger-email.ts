import { logger, task } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";
import { questionToText } from "@/app/apply/layouts/formSchema";

// console.log("RESEND_API_KEY: ", process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

interface BaseEmailPayload {
  email: string;
  fullName?: string;
}

interface ApplicationConfirmationPayload extends BaseEmailPayload {
  type: "confirmation";
  responses: {
    term: string;
    program: string;
    term_type: string;
    on_campus: boolean;
    resume_link: string;
    why_interested: string;
    first_choice_team: string;
    second_choice_team?: string;
    team_responses: Record<string, Record<string, string>>;
  };
}

interface ResultEmailPayload extends BaseEmailPayload {
  type: "result";
  responses: {
    subject: string;
    message: string;
  };
}

type EmailPayload = ApplicationConfirmationPayload | ResultEmailPayload;

export const sendConfirmationEmail = task({
  id: "send-confirmation-email",
  maxDuration: 300, // 5 minutes max execution time
  run: async (payload: EmailPayload, { ctx }) => {
    const { email, fullName, type, responses } = payload;

    logger.log("Sending email", { email, fullName, type, responses, ctx });

    let emailContent;
    let emailSubject;

    if (type === "confirmation") {
      emailSubject = "UWPM Application Confirmation";
      emailContent = createConfirmationEmailTemplate(fullName, responses);
    } else {
      emailSubject = responses.subject;
      emailContent = responses.message;
    }

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "no-reply@uwaterloopm.com",
      to: email,
      subject: emailSubject,
      html: emailContent,
    });

    logger.log("Email sent", { emailResponse });

    return {
      message: `Email sent to ${email}`,
      emailResponse,
    };
  },
});

const createConfirmationEmailTemplate = (fullName: string | undefined, responses: ApplicationConfirmationPayload["responses"]) => {
  let email = `
    <html>
      <body>
          <h1>UWPM Application Received</h1>
          <p>Hi ${fullName || "there"},</p>
          <p>Thank you for applying to UWPM! Your application has been received. We'll review it and get back to you soon.</p>
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
    for (const [question, answer] of Object.entries(responses.team_responses[first_team] as Record<string, string>)) {
      if (question === 'choice_num' || question === "director_applicant" || question === "lead_applicant") continue;
      responseSection += `<p><strong>${questionToText[question] ? questionToText[question] : question}</strong></p>
                          <p style="margin-top: -0.5rem">${answer}</p>`
    }
    responseSection += '</div>'

    // second choice team
    if (Object.keys(responses.team_responses).length == 2 && responses.second_choice_team) {
      responseSection += '<br>'
      let second_team = responses.second_choice_team.toLowerCase();
      responseSection += `<div>
              <h3>${second_team.charAt(0).toUpperCase() + second_team.slice(1)} Team (Second Choice)</h3>
              `;
      for (const [question, answer] of Object.entries(responses.team_responses[second_team] as Record<string, string>)) {
        if (question === 'choice_num' || question === "director_applicant" || question === "lead_applicant") continue;
        responseSection += `<p><strong>${questionToText[question] ? questionToText[question] : question}</strong></p>
                            <p style="margin-top: -0.5rem">${answer}</p>`
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

  return email;
}