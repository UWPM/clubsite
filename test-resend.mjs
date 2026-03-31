// test-resend.mjs
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
(async () => {
  try {
    const r = await resend.emails.send({
      from: "no-reply@uwaterloopm.com",
      to: "yhbarve@uwaterloo.ca",
      subject: "Resend test",
      html: "<b>test</b>",
    });
    console.log("Sent:", r);
  } catch (err) {
    console.error("Resend error:", err);
  }
})();