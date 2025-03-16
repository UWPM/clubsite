"use client";

import { useState } from "react";
import { TeamSidebar } from "./layouts/team-sidebar";
import { ApplicantView } from "./layouts/applicant-view";
import { SelectedApplicantsView } from "./layouts/selected-applicants-view";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ClubApplications() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [view, setView] = useState<"all" | "selected">("all");

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <TeamSidebar
          onSelectTeam={setSelectedTeam}
          selectedTeam={selectedTeam}
          onChangeView={setView}
          currentView={view}
        />
        <main className="flex-1 overflow-auto">
          {selectedTeam ? (
            view === "all" ? (
              <ApplicantView teamId={selectedTeam} />
            ) : (
              <SelectedApplicantsView teamId={selectedTeam} />
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
