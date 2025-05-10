"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormSubmission } from "../../apply/layouts/formSchema";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: FormSubmission[];
  teamName: string;
}

type EmailType = "acceptance" | "rejection";

export function EmailModal({
  isOpen,
  onClose,
  recipients,
  teamName,
}: EmailModalProps) {
  const [emailType, setEmailType] = useState<EmailType>("acceptance");
  const [subject, setSubject] = useState(`${teamName} Team Application Update`);
  const [message, setMessage] = useState(`Dear [Applicant Name],

Thank you for your interest in joining the ${teamName} Team. We're pleased to inform you that your application has been successful.

We'll be in touch shortly with more details about next steps.

Best regards,
The ${teamName} Team`);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailTypeChange = (type: EmailType) => {
    setEmailType(type);
    if (type === "acceptance") {
      setSubject(`UWPM ${teamName} Team Application Update`);
      setMessage(`Dear [Applicant Name],

Thank you for your interest in joining the ${teamName} Team. We're pleased to inform you that your application has been successful.

We'll be in touch shortly with more details about next steps.

Best regards,
The ${teamName} Team`);
    } else {
      setSubject(`UWPM ${teamName} Team Application Status`);
      setMessage(`Dear [Applicant Name],

Thank you for your interest in joining the ${teamName} Team. After careful consideration, we regret to inform you that we are unable to offer you a position at this time.

We encourage you to apply again in the future and wish you the best in your future endeavors.

Best regards,
The ${teamName} Team`);
    }
  };

  const handleSendEmails = async () => {
    setSending(true);
    setError(null);

    try {
      // Send emails to all selected applicants
      for (const applicant of recipients) {
        const personalizedMessage = message
          .replace("[Applicant Name]", applicant.full_name)
          .replace(/\n/g, "<br>"); // Convert all \n to <br>

        const response = await fetch("/api/result-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: applicant.uw_email_address,
            fullName: applicant.full_name,
            responses: {
              subject,
              message: personalizedMessage,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to send email to ${applicant.full_name}`);
        }
      }

      setSent(true);
      // Reset after showing success message
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending emails:", error);
      setError(
        error instanceof Error ? error.message : "Failed to send emails",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Email to Selected Applicants</DialogTitle>
          <DialogDescription>
            Compose and send emails to {recipients.length} selected applicants.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Email Type</Label>
            <RadioGroup
              value={emailType}
              onValueChange={(value) =>
                handleEmailTypeChange(value as EmailType)
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="acceptance" id="acceptance" />
                <Label htmlFor="acceptance">Acceptance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejection" id="rejection" />
                <Label htmlFor="rejection">Rejection</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Use [Applicant Name] as a placeholder for the applicant&apos;s
              name.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="mb-2 text-sm font-medium">
            Recipients ({recipients.length})
          </h4>
          <div className="max-h-[100px] overflow-y-auto rounded-md border p-2">
            {recipients.length > 0 ? (
              <ul className="text-sm">
                {recipients.map((applicant) => (
                  <li key={applicant.id}>
                    {applicant.full_name} ({applicant.uw_email_address})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No applicants selected
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          {error && (
            <div className="mb-2 flex items-center text-red-600">{error}</div>
          )}
          {sent ? (
            <div className="flex items-center text-green-600">
              <Mail className="mr-2 h-4 w-4" /> Emails sent successfully!
            </div>
          ) : (
            <Button
              onClick={handleSendEmails}
              disabled={recipients.length === 0 || sending}
            >
              {sending
                ? "Sending..."
                : `Send ${emailType === "acceptance" ? "Acceptance" : "Rejection"} Emails to ${recipients.length} Applicants`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
