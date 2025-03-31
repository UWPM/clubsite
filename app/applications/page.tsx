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
import { getApplications } from "./get-applications";
import { supabase } from "../apply/supabaseClient";

type TeamId = keyof TeamResponses;

export default function ClubApplications() {
  const [selectedTeam, setSelectedTeam] = useState<TeamId | null>(null);
  const [view, setView] = useState<"all" | "selected">("all");
  const [applications, setApplications] = useState<{
    [key in TeamId]?: FormSubmission[];
  }>({});

  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleToggleSelection = async (
    applicantId: string,
    selected: boolean,
  ) => {
    // Optimistically update the UI
    setApplications((prev) => {
      const newApplications = { ...prev };
      Object.keys(newApplications).forEach((teamId) => {
        const teamApplicants = newApplications[teamId as TeamId] || [];
        const applicant = teamApplicants.find((a) => a.id === applicantId);
        if (applicant) {
          applicant.selected = selected;
        }
      });
      return newApplications;
    });

    // Update the database
    const { error } = await supabase
      .from("applications")
      .update({ selected })
      .eq("id", applicantId);

    if (error) {
      console.error("Error updating selection status:", error);
      // Revert the optimistic update on error
      fetchApplications();
    }
  };

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
                <h2 className="text-2xl font-bold">Club Applications</h2>
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
