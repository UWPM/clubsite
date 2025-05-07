"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const [sendResponseCopy, setSendResponseCopy] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
    setSubmitError(false);
    setDialogStep(1); // Reset step when dialog closes
  };

  const handleNext = async () => {
    // For now, we'll just move to the next step (no waiting for email to actually send)
    setDialogStep(2);

    const requestBody = {
      email: values.uw_email_address,
      fullName: values.full_name,
      responses: sendResponseCopy ? values : null,
    };

    console.log("requestBody: ", requestBody);

    // trigger confirmation email via the API route
    try {
      const response = await fetch("/api/email", {
        method: "POST", // GET for testing, will be POST in production
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error("Failed to trigger email");
      console.log("Email trigger response:", await response.json());
    } catch (error) {
      console.error("Error triggering email:", error);
    }
  };

  return (
    <Dialog
      open={submitted || submitError}
      onOpenChange={(open) => {
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
                ? `Thank you for applying to UWPM! A confirmation email will be sent to you (${values?.uw_email_address}).`
                : `A confirmation email has been sent to ${values?.uw_email_address}${sendResponseCopy ? " with a copy of your responses" : ""}. Good luck!`}
          </DialogDescription>
        </DialogHeader>

        {submitted && dialogStep === 1 && (
          <div className="flex items-start space-x-2 pt-4">
            <Checkbox
              id="send-copy"
              checked={sendResponseCopy}
              onCheckedChange={(checked) =>
                setSendResponseCopy(checked === true)
              }
            />
            <Label
              htmlFor="send-copy"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include a copy of my responses in the confirmation email
            </Label>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          {submitError ? (
            <Button variant="destructive" onClick={handleClose}>
              Close
            </Button>
          ) : dialogStep === 1 ? (
            <Button onClick={handleNext}>Send Email</Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
