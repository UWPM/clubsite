import fs from "fs";
import path from "path";

// Simplified preview script: produces the same minimal HTML as the current ProdCon email task.
const payload = {
  fullName: "Aly Example",
  responses: {
    program: "Product Design",
    term: "Fall 2026",
    why_interested: "I love building products.",
    resume_link: "https://example.com/resume.pdf",
    team_responses: {
      product: {
        feature_idea: "A simpler onboarding flow",
        previous_work: "Built a prototype at hackathon",
      },
      engineering: {
        feature_idea: "Scalable API architecture",
        lead_applicant: "true",
      },
    },
  },
};

const escape = (str) => {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\'/g, "&#39;");
};

const json = escape(JSON.stringify(payload.responses || {}, null, 2));

const html = `
  <html>
    <body>
      <h1>ProdCon Application Received</h1>
      <p>Hi ${escape(payload.fullName) || "there"},</p>
      <p>Thanks for applying to ProdCon.</p>
      <hr />
      <h2>Your Submission (JSON)</h2>
      <pre style="background:#f6f8fa;padding:12px;border-radius:6px;overflow:auto;">${json}</pre>
      <p>Best,<br/>The ProdCon Team</p>
    </body>
  </html>
`;

const outDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "prodcon-email-preview.html");
fs.writeFileSync(outPath, html, "utf8");
console.log(`Wrote preview to ${outPath}`);
console.log("Open this file in your browser to preview the email.");
