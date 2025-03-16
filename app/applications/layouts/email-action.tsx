"use client";

import { useState, useEffect } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Applicant {
  id: string;
  name: string;
  email: string;
  selected: boolean;
  [key: string]: any;
}

interface EmailActionProps {
  selectedApplicants: Applicant[];
  teamName: string;
}

export function EmailAction({
  selectedApplicants,
  teamName,
}: EmailActionProps) {
  const [emailType, setEmailType] = useState("acceptance");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Set default email templates when email type or team changes
  useEffect(() => {
    if (emailType === "acceptance") {
      setSubject(`Congratulations on your ${teamName} Team Application!`);
      setMessage(`Dear [Applicant Name],

We are pleased to inform you that your application to join the ${teamName} Team has been accepted. We were impressed by your qualifications and experience, and we believe you will be a valuable addition to our team.

Please let us know your availability for an onboarding session next week.

Best regards,
The ${teamName} Team`);
    } else {
      setSubject(`Update on your ${teamName} Team Application`);
      setMessage(`Dear [Applicant Name],

Thank you for your interest in joining the ${teamName} Team. We appreciate the time and effort you put into your application.

After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. We received many qualified applications and had to make difficult decisions.

We encourage you to apply for future opportunities that match your skills and interests.

Best regards,
The ${teamName} Team`);
    }
  }, [emailType, teamName]);

  const handleSendEmails = async () => {
    setSending(true);

    // Simulate sending emails
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSending(false);
    setSent(true);

    // Reset after showing success message
    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={selectedApplicants.length === 0}>
          <Mail className="mr-2 h-4 w-4" /> Send Emails (
          {selectedApplicants.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Emails to Selected Applicants</DialogTitle>
          <DialogDescription>
            Compose and send emails to {selectedApplicants.length} selected
            applicants.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="acceptance"
          value={emailType}
          onValueChange={setEmailType}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="acceptance">Acceptance Email</TabsTrigger>
            <TabsTrigger value="rejection">Rejection Email</TabsTrigger>
          </TabsList>
          <TabsContent value="acceptance" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="subject-acceptance">Subject</Label>
              <Input
                id="subject-acceptance"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message-acceptance">Message</Label>
              <Textarea
                id="message-acceptance"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use [Applicant Name] as a placeholder for the applicant's name.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="rejection" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="subject-rejection">Subject</Label>
              <Input
                id="subject-rejection"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message-rejection">Message</Label>
              <Textarea
                id="message-rejection"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use [Applicant Name] as a placeholder for the applicant's name.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-2">
          <h4 className="mb-2 text-sm font-medium">
            Recipients ({selectedApplicants.length})
          </h4>
          <div className="max-h-[100px] overflow-y-auto rounded-md border p-2">
            {selectedApplicants.length > 0 ? (
              <ul className="text-sm">
                {selectedApplicants.map((applicant) => (
                  <li key={applicant.id}>
                    {applicant.name} ({applicant.email})
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
          {sent ? (
            <div className="flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" /> Emails sent successfully!
            </div>
          ) : (
            <Button
              onClick={handleSendEmails}
              disabled={selectedApplicants.length === 0 || sending}
            >
              {sending
                ? "Sending..."
                : `Send ${emailType === "acceptance" ? "Acceptance" : "Rejection"} Emails`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
