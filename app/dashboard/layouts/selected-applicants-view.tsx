"use client";

import { useState } from "react";
import { Mail, Search, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { TEAMS } from "../../apply/layouts/formSchema";
import {
  type FormSubmission,
  type TeamResponses,
} from "../../apply/layouts/formSchema";
import { EmailModal } from "./email-modal";
import { ApplicantDetailModal } from "./applicant-detail-modal";

type TeamId = keyof TeamResponses;

interface SelectedApplicantsViewProps {
  teamId: TeamId;
  applications: { [key in TeamId]?: FormSubmission[] };
  onToggleSelection: (applicantId: string, selected: boolean) => Promise<void>;
}

export function SelectedApplicantsView({
  teamId,
  applications,
  onToggleSelection,
}: SelectedApplicantsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<FormSubmission | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Get selected applicants for the team
  const allApplicants = applications[teamId] || [];
  
  // Filter for applicants selected for this team
  const selectedApplicants = allApplicants.filter(
    (a: FormSubmission) => {
      // If this team is the applicant's first choice
      if (a.first_choice_team && a.first_choice_team.toLowerCase() === teamId.toLowerCase()) {
        return a.selected_first_choice;
      }
      // If this team is the applicant's second choice
      else if (a.second_choice_team && a.second_choice_team.toLowerCase() === teamId.toLowerCase()) {
        return a.selected_second_choice;
      }
      return false;
    }
  );

  // Filter by search query
  const filteredApplicants = selectedApplicants.filter(
    (applicant: FormSubmission) =>
      applicant.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.uw_email_address
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      applicant.program.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenDetailModal = (applicant: FormSubmission) => {
    setSelectedApplicant(applicant);
    setIsDetailModalOpen(true);
  };

  // Get the appropriate tag for an applicant based on the team
  const getApplicantTag = (applicant: FormSubmission) => {
    // If this team is the applicant's first choice
    if (applicant.first_choice_team && applicant.first_choice_team.toLowerCase() === teamId.toLowerCase()) {
      return applicant.tag_first_choice;
    }
    // If this team is the applicant's second choice
    else if (applicant.second_choice_team && applicant.second_choice_team.toLowerCase() === teamId.toLowerCase()) {
      return applicant.tag_second_choice;
    }
    return null;
  };

  // Determine if this team is the applicant's first or second choice
  const getTeamChoiceLabel = (applicant: FormSubmission) => {
    if (applicant.first_choice_team && applicant.first_choice_team.toLowerCase() === teamId.toLowerCase()) {
      return "1st Choice";
    }
    else if (applicant.second_choice_team && applicant.second_choice_team.toLowerCase() === teamId.toLowerCase()) {
      return "2nd Choice";
    }
    return "";
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Selected{" "}
            {
              TEAMS.find(
                (team) => team.id.toLowerCase() === teamId.toLowerCase(),
              )?.name
            }{" "}
            Applicants
          </h1>
          <p className="text-muted-foreground">
            {selectedApplicants.length} selected applicants
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button
            onClick={() => setIsEmailModalOpen(true)}
            disabled={selectedApplicants.length === 0}
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Email to All ({selectedApplicants.length})
          </Button> */}
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredApplicants.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-medium">No selected applicants</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "No applicants match your search"
                : "Select applicants to see them here"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplicants.map((applicant: FormSubmission) => (
            <Card
              key={applicant.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => handleOpenDetailModal(applicant)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {applicant.full_name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {applicant.full_name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {applicant.program}, {applicant.term}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center gap-1 text-sm">
                    <FileText className="h-3 w-3" />
                    <a
                      href={applicant.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Resume <ExternalLink className="inline h-3 w-3" />
                    </a>
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge className="text-xs">{getTeamChoiceLabel(applicant)}</Badge>
                    
                    {getApplicantTag(applicant) && (
                      <Badge variant="secondary" className="text-xs">
                        {getApplicantTag(applicant)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        recipients={selectedApplicants}
        teamName={TEAMS.find((team) => team.id === teamId)?.name || ""}
      /> */}

      {selectedApplicant && (
        <ApplicantDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          applicant={selectedApplicant}
          teamId={teamId}
          onToggleSelection={onToggleSelection}
        />
      )}
    </div>
  );
}