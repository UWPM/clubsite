"use client";

import { Users, CheckSquare, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { TEAMS, MOCK_APPLICANTS } from "../example-data";
import { type TeamResponses } from "../../apply/layouts/formSchema";

type TeamId = keyof TeamResponses;

interface TeamSidebarProps {
  onSelectTeam: (teamId: TeamId) => void;
  selectedTeam: TeamId | null;
  onChangeView: (view: "all" | "selected") => void;
  currentView: "all" | "selected";
}

export function TeamSidebar({
  onSelectTeam,
  selectedTeam,
  onChangeView,
  currentView,
}: TeamSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = TEAMS.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Initialize selectedCounts with all team IDs set to 0
  const selectedCounts = TEAMS.reduce(
    (acc, team) => {
      acc[team.id as TeamId] = 0;
      return acc;
    },
    {} as Record<TeamId, number>,
  );

  // Count selected applicants for each team
  Object.entries(MOCK_APPLICANTS).forEach(([teamId, applicants]) => {
    selectedCounts[teamId as TeamId] = applicants.filter(
      (a) => a.selected,
    ).length;
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-2">
          <h2 className="text-lg font-semibold">Club Applications</h2>
        </div>
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              className="pl-8"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>View</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentView === "all"}
                  onClick={() => onChangeView("all")}
                >
                  <Users className="h-4 w-4" />
                  <span>All Applicants</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentView === "selected"}
                  onClick={() => onChangeView("selected")}
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>Selected Applicants</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Teams</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredTeams.map((team) => {
                const applicantCount = MOCK_APPLICANTS[team.id]?.length || 0;
                const selectedCount = selectedCounts[team.id as TeamId];

                return (
                  <SidebarMenuItem key={team.id}>
                    <SidebarMenuButton
                      isActive={selectedTeam === team.id}
                      onClick={() => onSelectTeam(team.id as TeamId)}
                    >
                      <Users className="h-4 w-4" />
                      <span>{team.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>
                      {selectedCount > 0
                        ? `${selectedCount}/${applicantCount}`
                        : applicantCount}
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
