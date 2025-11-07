"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// removed checkbox option to include responses in confirmation email

interface SubmissionDialogProps {
  submitted: boolean;
  submitError: boolean;
  setSubmitted: (value: boolean) => void;
  setSubmitError: (value: boolean) => void;
  values: any;
}

export default function SubmissionDialog({
  submitted,
  submitError,
  setSubmitted,
  setSubmitError,
  values,
}: SubmissionDialogProps) {
  const [dialogStep, setDialogStep] = useState(1);
  // responses will no longer be included in confirmation emails

  // Derive a best-effort recipient email and a display name from the submission
  const derivedEmail =
    values?.submitter_email ??
    values?.raw?.individual_app_email ??
    values?.raw?.team_app_member1_email ??
    values?.raw?.team_app_member2_email ??
    values?.raw?.team_app_member3_email ??
    values?.raw?.team_app_member4_email ??
    null;

  const derivedFullName =
    values?.raw?.individual_app_name ??
    values?.raw?.team_app_name ??
    values?.raw?.team_app_member1_name ??
    "Applicant";

  const handleClose = () => {
    // capture whether we had a submission so we can refresh after closing
    const wasSubmitted = submitted;

    setSubmitted(false);
    setSubmitError(false);
    setDialogStep(1); // Reset step when dialog closes

    // If a submission had occurred, refresh the page after the dialog closes
    // if (wasSubmitted) {
    //   // allow the dialog close animation to play briefly
    //   setTimeout(() => {
    //     try {
    //       window.location.href = window.location.pathname;
    //     } catch (e) {
    //       window.location.reload();
    //     }
    //   }, 300);
    // }
  };

  const handleNext = async () => {
    // For now, we'll just move to the next step (no waiting for email to actually send)
    setDialogStep(2);

    const requestBody = {
      email: derivedEmail,
      fullName: derivedFullName,
      // responses are no longer sent for privacy
      responses: null,
    };

    // trigger confirmation email via the API route
    try {
      const response = await fetch("/api/email", {
        method: "POST", // GET for testing, will be POST in production
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error("Failed to trigger email");
      // move to step 2 (Confirmation Email Sent) and then auto-refresh the page
      setDialogStep(2);
      // give the user a moment to read the confirmation, then reload to reset the form
      // setTimeout(() => {
      //   // close dialog and reset parent submitted state
      //   handleClose();
      //   // reload current page path to return form to initial state
      //   try {
      //     window.location.href = window.location.pathname;
      //   } catch (e) {
      //     // fallback to a full reload
      //     window.location.reload();
      //   }
      // }, 1500);
    } catch (error) {
      console.error("Error triggering email:", error);
    }
  };

  return (
    <Dialog
      open={submitted || submitError}
      onOpenChange={(open: any) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {submitError
              ? "Submission Failed"
              : dialogStep === 1
                ? "Submission Successful"
                : "Confirmation Email Sent"}
          </DialogTitle>
          <DialogDescription>
            {submitError
              ? "There was an error submitting your application. This may be because an application has already been submitted with this email address, or due to a technical issue."
              : dialogStep === 1
                ? `Thank you for applying to UWPM! A confirmation email will be sent to you (${derivedEmail ?? "no email provided"}).`
                : `A confirmation email has been sent to ${derivedEmail ?? "no email provided"}. Good luck!`}
          </DialogDescription>
        </DialogHeader>

        {/* responses copy option removed for privacy */}

        <div className="mt-4 flex justify-end">
          {submitError ? (
            <Button variant="destructive" onClick={handleClose}>
              Close
            </Button>
          ) : dialogStep ===
            1 ? <Button onClick={handleNext}>Send Email</Button> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
