"use client";

import { ExternalLink, FileText, Calendar, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TEAMS } from "../get-applications";
import {
  type FormSubmission,
  questionToText,
} from "../../apply/layouts/formSchema";
import { Button } from "@/components/ui/button";

interface ApplicantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: FormSubmission;
  teamId: string;
  onToggleSelection: (applicantId: string, selected: boolean) => Promise<void>;
}

export function ApplicantDetailModal({
  isOpen,
  onClose,
  applicant,
  teamId,
  onToggleSelection,
}: ApplicantDetailModalProps) {
  // Get team-specific responses
  const teamResponses =
    applicant.team_responses[teamId as keyof typeof applicant.team_responses] ||
    {};

  const handleToggleSelection = async () => {
    const newSelectedState = !applicant.selected;
    await onToggleSelection(applicant.id!, newSelectedState);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {applicant.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <DialogTitle className="text-xl">
                {applicant.full_name}
              </DialogTitle>
            </div>
            <Button
              variant={applicant.selected ? "destructive" : "default"}
              onClick={handleToggleSelection}
            >
              {applicant.selected ? (
                <>
                  <X className="mr-2 h-4 w-4" /> Remove Selection
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Select Applicant
                </>
              )}
            </Button>
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {applicant.tag && (
              <Badge variant="secondary">
                {applicant.tag}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium">Email</h3>
                <p className="text-sm">{applicant.uw_email_address}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Program</h3>
                <p className="text-sm">{applicant.program}</p>
              </div>

              <div className="flex gap-6">
                <div>
                  <h3 className="mb-1 text-sm font-medium">Term</h3>
                  <p className="text-sm">{applicant.term}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium">Term Type</h3>
                  <p className="text-sm">{applicant.term_type}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium">On Campus</h3>
                  <p className="text-sm">
                    {applicant.on_campus ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Applied On</h3>
                <p className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3" />
                  {new Date(applicant.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Resume</h3>
                <a
                  href={applicant.resume_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <FileText className="h-3 w-3" />
                  View Resume <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Team Preferences</h3>
                <p className="text-sm">
                  1st Choice:{" "}
                  {
                    TEAMS.find(
                      (t) => t.id === applicant.first_choice_team.toLowerCase(),
                    )?.name
                  }
                  {applicant.second_choice_team && (
                    <>
                      , 2nd Choice:{" "}
                      {
                        TEAMS.find(
                          (t) =>
                            t.id ===
                            applicant.second_choice_team?.toLowerCase(),
                        )?.name
                      }
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium">Why Interested</h3>
                <p className="whitespace-pre-line text-sm">
                  {applicant.why_interested}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-md mb-3 font-medium">
              Team-Specific Questions
            </h3>
            <div className="space-y-4">
              {Object.entries(teamResponses)
                .filter(([key]) => key !== "choice_num")
                .map(([key, value]) => (
                  <div key={key}>
                    <h4 className="mb-1 text-sm font-medium">
                      {questionToText[key] || key}
                    </h4>
                    <p className="whitespace-pre-line text-sm">
                      {value as string}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
