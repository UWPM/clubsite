"use client"

import { ExternalLink, FileText, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { TEAMS } from "../example-data"
import { type FormSubmission, questionToText } from "../../apply/layouts/formSchema"

interface ApplicantDetailModalProps {
  isOpen: boolean
  onClose: () => void
  applicant: FormSubmission
  teamId: string
}

export function ApplicantDetailModal({ isOpen, onClose, applicant, teamId }: ApplicantDetailModalProps) {
  // Get team-specific responses
  const teamResponses = applicant.team_responses[teamId as keyof typeof applicant.team_responses] || {}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {applicant.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <DialogTitle className="text-xl">{applicant.full_name}</DialogTitle>
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {(applicant.tags || []).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Email</h3>
                <p className="text-sm">{applicant.uw_email_address}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Program</h3>
                <p className="text-sm">{applicant.program}</p>
              </div>

              <div className="flex gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-1">Term</h3>
                  <p className="text-sm">{applicant.term}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Term Type</h3>
                  <p className="text-sm">{applicant.term_type}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">On Campus</h3>
                  <p className="text-sm">{applicant.on_campus ? "Yes" : "No"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Applied On</h3>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(applicant.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Resume</h3>
                <a
                  href={applicant.resume_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <FileText className="h-3 w-3" />
                  View Resume <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Team Preferences</h3>
                <p className="text-sm">
                  1st Choice: {TEAMS.find((t) => t.id === applicant.first_choice_team)?.name}
                  {applicant.second_choice_team && (
                    <>, 2nd Choice: {TEAMS.find((t) => t.id === applicant.second_choice_team)?.name}</>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Why Interested</h3>
                <p className="text-sm whitespace-pre-line">{applicant.why_interested}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-md font-medium mb-3">Team-Specific Questions</h3>
            <div className="space-y-4">
              {Object.entries(teamResponses)
                .filter(([key]) => key !== "choice_num")
                .map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-sm font-medium mb-1">{questionToText[key] || key}</h4>
                    <p className="text-sm whitespace-pre-line">{value as string}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

