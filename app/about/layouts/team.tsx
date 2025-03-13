type TeamType =
  | "Internal"
  | "Engineering"
  | "Events"
  | "Outreach"
  | "Marketing"
  | "Podcast"
  | "Newsletter"
  | "Finance"
  | "Design";

type TeamMember = {
  name: string;
  position: string;
  image: string;
  team: TeamType;
};

const teams: Record<TeamType, TeamMember[]> = {
  Internal: [
    {
      name: "Mayank Sachdeva",
      position: "President",
      image: "",
      team: "Internal",
    },
    {
      name: "Leann Fernandes",
      position: "President",
      image: "",
      team: "Internal",
    },
    {
      name: "Ajay Gupta",
      position: "Secretary",
      image: "",
      team: "Internal",
    },
    {
      name: "Ahmed Ahmed",
      position: "Secretary",
      image: "",
      team: "Internal",
    },
  ],
  Engineering: [
    {
      name: "Sunnie Kapar",
      position: "Engineering Lead",
      image: "",
      team: "Engineering",
    },
    {
      name: "Gaurikaa Gupta",
      position: "Engineering Director",
      image: "",
      team: "Engineering",
    },
    {
      name: "Utkarsh  Gupta",
      position: "Engineering Director",
      image: "",
      team: "Engineering",
    },
  ],
  Events: [
    {
      name: "Dhruv Chopra",
      position: "Events Lead",
      image: "",
      team: "Events",
    },
    {
      name: "Amanda Yu",
      position: "Eventsp Director",
      image: "",
      team: "Events",
    },
    {
      name: "Amanda Yuan",
      position: "Events Director",
      image: "",
      team: "Events",
    },
    {
      name: "Winston Yu",
      position: "Events Director",
      image: "",
      team: "Events",
    },
  ],
  Outreach: [
    {
      name: "Fatimah Nadir",
      position: "Outreach Lead",
      image: "",
      team: "Outreach",
    },
    {
      name: "Rakshita Jain",
      position: "Outreach Director",
      image: "",
      team: "Outreach",
    },
    {
      name: "Petch Lomtakul",
      position: "Outreach Director",
      image: "",
      team: "Outreach",
    },
    {
      name: "Janessa Tang",
      position: "Outreach Director",
      image: "",
      team: "Outreach",
    },
  ],
  Marketing: [
    {
      name: "Amie Ahn",
      position: "Marketing Lead",
      image: "",
      team: "Marketing",
    },
    {
      name: "Aditi Suresh",
      position: "Marketing Director",
      image: "",
      team: "Marketing",
    },
    {
      name: "Cloris Zhang",
      position: "Marketing Director",
      image: "",
      team: "Marketing",
    },
    {
      name: "Michelle Kwon",
      position: "Marketing Director",
      image: "",
      team: "Marketing",
    },
  ],
  Podcast: [
    {
      name: "Ana Franco",
      position: "Podcast Lead",
      image: "",
      team: "Podcast",
    },
    {
      name: "Jadiha Aruleswaran",
      position: "Podcast Director",
      image: "",
      team: "Podcast",
    },
    {
      name: "Judy Yang",
      position: "Podcast Director",
      image: "",
      team: "Podcast",
    },
  ],
  Newsletter: [
    {
      name: "Shubhaangan Manoranjan",
      position: "Newsletter Lead",
      image: "",
      team: "Newsletter",
    },
    {
      name: "Muktha Kaja",
      position: "Newsletter Director",
      image: "",
      team: "Newsletter",
    },
  ],
  Finance: [
    {
      name: "Bhooma Chavadia",
      position: "Finance Lead",
      image: "",
      team: "Finance",
    },
    {
      name: "Natalie Lo",
      position: "Finance Director",
      image: "",
      team: "Finance",
    },
  ],
  Design: [
    {
      name: "Jane Chen",
      position: "Design Lead",
      image: "",
      team: "Design",
    },
    {
      name: "Adila Liu",
      position: "Design Director",
      image: "",
      team: "Design",
    },
    {
      name: "Wanyun Xue",
      position: "Design Director",
      image: "",
      team: "Design",
    },
  ],
};

export type { TeamType, TeamMember };
export { teams };

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Team() {
  return (
    <section className="p-24">
      <h2 className="pb-8">Our team.</h2>
      <div className="space-y-16">
        {Object.entries(teams).map(([teamName, members]) => (
          <div key={teamName} className="space-y-8">
            <h3 className="text-4xl font-semibold">{teamName}</h3>
            <div className="flex gap-16">
              {members.map((member) => (
                <div
                  key={member.name}
                  className="flex max-w-36 flex-col items-center gap-4 text-center"
                >
                  <div className="size-36 rounded-full bg-muted-foreground" />
                  <div>
                    <h4 className="text-lg font-medium">{member.name}</h4>
                    <p className="text-muted-foreground">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="ml-0 mt-24">Our Alumni.</h2>
      <div className="flex justify-center mt-12">
        <Link href="/alumni">
          <Button variant="default" size="default" className="px-6 py-3 text-white rounded-lg shadow-md">
            See Our Alumni
          </Button>
        </Link>
      </div>
    </section>
  );
}
