"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormSubmission } from "../../apply/layouts/formSchema"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  recipients: FormSubmission[]
  teamName: string
}

export function EmailModal({ isOpen, onClose, recipients, teamName }: EmailModalProps) {
  const [subject, setSubject] = useState(`${teamName} Team Application Update`)
  const [message, setMessage] = useState(`Dear [Applicant Name],

Thank you for your interest in joining the ${teamName} Team. We're pleased to inform you that your application has been successful.

We'll be in touch shortly with more details about next steps.

Best regards,
The ${teamName} Team`)

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSendEmails = async () => {
    setSending(true)

    // Simulate sending emails
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSending(false)
    setSent(true)

    // Reset after showing success message
    setTimeout(() => {
      setSent(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Email to Selected Applicants</DialogTitle>
          <DialogDescription>Compose and send emails to {recipients.length} selected applicants.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={10} value={message} onChange={(e) => setMessage(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              Use [Applicant Name] as a placeholder for the applicant&apos;s name.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Recipients ({recipients.length})</h4>
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
              <p className="text-sm text-muted-foreground">No applicants selected</p>
            )}
          </div>
        </div>

        <DialogFooter>
          {sent ? (
            <div className="flex items-center text-green-600">
              <Mail className="h-4 w-4 mr-2" /> Emails sent successfully!
            </div>
          ) : (
            <Button onClick={handleSendEmails} disabled={recipients.length === 0 || sending}>
              {sending ? "Sending..." : `Send Email to ${recipients.length} Applicants`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

