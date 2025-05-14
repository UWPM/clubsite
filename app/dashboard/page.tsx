"use client";

import { useState, useEffect } from "react";
import { TeamSidebar } from "./layouts/team-sidebar";
import { ApplicantView } from "./layouts/applicant-view";
import { SelectedApplicantsView } from "./layouts/selected-applicants-view";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  type TeamResponses,
  type FormSubmission,
} from "../apply/layouts/formSchema";
import { getApplications, updateApplicationSelection } from "./actions";

type TeamId = keyof TeamResponses;

export default function ClubApplications() {
  const [selectedTeam, setSelectedTeam] = useState<TeamId | null>(null);
  const [view, setView] = useState<"all" | "selected">("all");
  const [applications, setApplications] = useState<{
    [key in TeamId]?: FormSubmission[];
  }>({});
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    const data = await getApplications();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

const handleToggleSelection = async (
  applicantId: string,
  selected: boolean
) => {
  // Find the applicant in the current selectedTeam
  const teamApplicants = applications[selectedTeam as TeamId] || [];
  const applicant = teamApplicants.find((a) => a.id === applicantId);

  // Determine if this team is the first choice
  const first_choice = applicant?.first_choice_team.toLowerCase() === selectedTeam?.toLowerCase();

  // Optimistically update the UI
  setApplications((prev) => {
    const newApplications = { ...prev };
    Object.keys(newApplications).forEach((teamId) => {
      const teamApplicants = newApplications[teamId as TeamId] || [];
      const applicant = teamApplicants.find((a) => a.id === applicantId);
      if (applicant) {
        if(first_choice) {
          applicant.selected_first_choice = selected;
        } else {
          applicant.selected_second_choice = selected;
        }
      }
    });
    return newApplications;
  });

  // Update the database
  updateApplicationSelection(applicantId, selected, first_choice)
    .then(() => {
      fetchApplications(); // optionally refetch
    })
    .catch((error) => {
      console.error("Error updating selection status:", error);
      fetchApplications(); // revert UI if needed
    });
};

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <TeamSidebar
          onSelectTeam={setSelectedTeam}
          selectedTeam={selectedTeam}
          onChangeView={setView}
          currentView={view}
          applications={applications}
        />
        <main className="flex-1 overflow-auto">
          {selectedTeam ? (
            view === "all" ? (
              <ApplicantView
                teamId={selectedTeam}
                applications={applications}
                onToggleSelection={handleToggleSelection}
              />
            ) : (
              <SelectedApplicantsView
                teamId={selectedTeam}
                applications={applications}
                onToggleSelection={handleToggleSelection}
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md text-center">
                <h2 className="text-2xl font-bold">UWPM Applications</h2>
                <p className="mt-2 text-muted-foreground">
                  Select a team from the sidebar to view applications.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
