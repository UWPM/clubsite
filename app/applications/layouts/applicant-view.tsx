"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  ExternalLink,
  Calendar,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicantTags } from "./applicant-tags";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEAMS } from "../get-applications";
import {
  type FormSubmission,
  questionToText,
  type TeamResponses,
} from "../../apply/layouts/formSchema";
import { supabase } from "../../apply/supabaseClient";

type TeamId = keyof TeamResponses;

interface ApplicantViewProps {
  teamId: TeamId;
  applications: { [key in TeamId]?: FormSubmission[] };
  onToggleSelection: (applicantId: string, selected: boolean) => Promise<void>;
}

// Map tag names to their corresponding background classes (same as in ApplicantTags)
const TAG_COLOR_MAP: { [tagName: string]: string } = {
  Reject: "bg-red-500",
  Review: "bg-yellow-500",
  Advance: "bg-green-500",
  Select: "bg-green-700",
};

export function ApplicantView({
  teamId,
  applications,
  onToggleSelection,
}: ApplicantViewProps) {
  const teamApplicants = applications[teamId] || [];

  // Create local state for applicants so that UI updates immediately
  const [localApplicants, setLocalApplicants] = useState(teamApplicants);
  useEffect(() => {
    setLocalApplicants(teamApplicants);
  }, [teamApplicants]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredApplicants = localApplicants.filter((applicant) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "selected") return applicant.selected;
    if (filterStatus === "not-selected") return !applicant.selected;
    return true;
  });

  const currentApplicant = filteredApplicants[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < filteredApplicants.length - 1 ? prev + 1 : prev,
    );
  };

  const handleToggleSelection = async () => {
    if (!currentApplicant) return;
    const newSelectedState = !currentApplicant.selected;
    await onToggleSelection(currentApplicant.id!, newSelectedState);
  };

  const handleAddTag = (tag: string | null) => {
    if (!currentApplicant) return;
    // Update local state so that the UI re-renders immediately
    setLocalApplicants((prevApplicants) =>
      prevApplicants.map((app) =>
        app.id === currentApplicant.id ? { ...app, tag } : app,
      ),
    );
  };

  const handleRemoveTag = async () => {
    if (!currentApplicant) return;
    // Update the tag in the DB
    const { error } = await supabase
      .from("applications")
      .update({ tag: null })
      .eq("id", currentApplicant.id);
    if (error) {
      console.error("Error clearing tag:", error);
      return;
    }
    // Update local state so the UI re-renders immediately
    setLocalApplicants((prevApplicants) =>
      prevApplicants.map((app) =>
        app.id === currentApplicant.id ? { ...app, tag: null } : app,
      ),
    );
  };

  if (!currentApplicant) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold">No Applicants</h2>
          <p className="mt-2 text-muted-foreground">
            There are no applicants for this team yet
          </p>
        </div>
      </div>
    );
  }

  // Get team-specific responses
  const teamResponses = currentApplicant.team_responses[teamId] || {};

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {
              TEAMS.find(
                (team) => team.id.toLowerCase() === teamId.toLowerCase(),
              )?.name
            }{" "}
            Team Applications
          </h1>
          <p className="text-muted-foreground">
            {filteredApplicants.length} applicants •{" "}
            {teamApplicants.filter((a) => a.selected).length} selected
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applicants</SelectItem>
              <SelectItem value="selected">Selected Only</SelectItem>
              <SelectItem value="not-selected">Not Selected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === filteredApplicants.length - 1}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <span className="ml-2 text-sm text-muted-foreground">
            {currentIndex + 1} of {filteredApplicants.length}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {currentApplicant.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{currentApplicant.full_name}</CardTitle>
            </div>
            <Button
              variant={currentApplicant.selected ? "destructive" : "default"}
              onClick={handleToggleSelection}
            >
              {currentApplicant.selected ? (
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
            {currentApplicant.tag && (
              <Badge
                key={currentApplicant.tag}
                variant="secondary"
                className={`flex items-center gap-1 text-xs text-white cursor-default ${
                  TAG_COLOR_MAP[currentApplicant.tag]
                }`}
              >
                {currentApplicant.tag}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-3 w-3 rounded-full"
                  onClick={handleRemoveTag}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
            <ApplicantTags
              currentTag={currentApplicant.tag}
              applicantId={currentApplicant.id || ""}
              onTagChange={handleAddTag}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium">Email</h3>
                <p className="text-sm">{currentApplicant.uw_email_address}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Program</h3>
                <p className="text-sm">{currentApplicant.program}</p>
              </div>

              <div className="flex gap-6">
                <div>
                  <h3 className="mb-1 text-sm font-medium">Term</h3>
                  <p className="text-sm">{currentApplicant.term}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium">Term Type</h3>
                  <p className="text-sm">{currentApplicant.term_type}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium">On Campus</h3>
                  <p className="text-sm">
                    {currentApplicant.on_campus ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Applied On</h3>
                <p className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3" />
                  {new Date(currentApplicant.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Resume</h3>
                <a
                  href={currentApplicant.resume_link}
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
                      (t) =>
                        t.id ===
                        currentApplicant.first_choice_team.toLowerCase(),
                    )?.name
                  }
                  {currentApplicant.second_choice_team && (
                    <>
                      , 2nd Choice:{" "}
                      {
                        TEAMS.find(
                          (t) =>
                            t.id ===
                            currentApplicant.second_choice_team?.toLowerCase(),
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
                  {currentApplicant.why_interested}
                </p>
              </div>

              {Object.entries(teamResponses)
                .filter(([key]) => key !== "choice_num")
                .map(([key, value]) => (
                  <div key={key}>
                    <h3 className="mb-1 text-sm font-medium">
                      {questionToText[key] || key}
                    </h3>
                    <p className="whitespace-pre-line text-sm">
                      {value as string}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === filteredApplicants.length - 1}
              >
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <Button
              variant={currentApplicant.selected ? "destructive" : "default"}
              size="sm"
              onClick={handleToggleSelection}
            >
              {currentApplicant.selected
                ? "Remove Selection"
                : "Select Applicant"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
