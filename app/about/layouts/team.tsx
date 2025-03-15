type TeamType =
  | "Internal"
  | "Engineering"
  | "Events"
  | "Outreach"
  | "Marketing"
  | "Podcast"
  | "Content"
  | "Finance"
  | "Design";

type TeamMember = {
  position: string;
  name: string;
  linkedin: string;
  image: string;
};

const teams: Record<TeamType, TeamMember[]> = {
  Internal: [
    {
      position: "President",
      name: "Amie Ahn",
      linkedin: "https://www.linkedin.com/in/amieahnn/",
      image: "/images/exec-profiles/Amie.jpeg",
    },
    {
      position: "President",
      name: "Aadhyaaa Mashru",
      linkedin: "https://www.linkedin.com/in/aadhyaaamashru/",
      image: "/images/exec-profiles/Aadhyaaa.jpeg",
    },
    {
      position: "Secretary",
      name: "Kevin Cui",
      linkedin: "http://linkedin.com/in/kevincui1",
      image: "/images/exec-profiles/Kevin.jpg",
    },
    {
      position: "Advisor",
      name: "Leann Fernandes",
      linkedin: "https://www.linkedin.com/in/leann-fernandes/",
      image: "/images/exec-profiles/Leann.jpeg",
    },
  ],
  Engineering: [
    {
      position: "VP Engineering",
      name: "Sunnie Kapar",
      linkedin: "https://www.linkedin.com/in/sunniekapar/",
      image: "/images/exec-profiles/Sunnie.jpeg",
    },
    {
      position: "Engineering Director",
      name: "Gaurika Gupta",
      linkedin: "https://www.linkedin.com/in/gaurikagupta1/",
      image: "/images/exec-profiles/Gaurika.jpeg",
    },
    {
      position: "Engineering Director",
      name: "Wanyun Xue",
      linkedin: "https://www.linkedin.com/in/wanyun-xue/",
      image: "/images/exec-profiles/Wanyun.jpeg",
    },
    {
      position: "Engineering Director",
      name: "Adon Ojha",
      linkedin: "https://www.linkedin.com/in/adonojha/",
      image: "/images/exec-profiles/Adon.jpeg",
    },
    {
      position: "Engineering Director",
      name: "Danny Liang",
      linkedin: "https://www.linkedin.com/in/danny-liang-dl/",
      image: "/images/exec-profiles/Danny.jpg",
    },
  ],
  Events: [
    {
      position: "VP Events",
      name: "Dhruv Chopra",
      linkedin: "https://www.linkedin.com/in/d3chopra/",
      image: "/images/exec-profiles/Dhruv.jpeg",
    },
    {
      position: "Events Director",
      name: "Marcus Nguyen",
      linkedin: "https://www.linkedin.com/in/marcusnguyen04/",
      image: "/images/exec-profiles/UWPMHeadshot.png",
    },
    {
      position: "Events Director",
      name: "Curtis Sinopoli",
      linkedin: "https://www.linkedin.com/in/curtis-sinopoli/",
      image: "/images/exec-profiles/UWPMHeadshot.png",
    },
    {
      position: "Events Director",
      name: "Mae-Lyn Nguyen",
      linkedin: "",
      image: "/images/exec-profiles/UWPMHeadshot.png",
    },
  ],
  Outreach: [
    {
      position: "VP Outreach",
      name: "Yimming Ding",
      linkedin: "https://www.linkedin.com/in/yiminng-ding/",
      image: "/images/exec-profiles/Yimming.JPG",
    },
    {
      position: "Outreach Director",
      name: "Janessa Tang",
      linkedin: "https://www.linkedin.com/in/janessatang/",
      image: "/images/exec-profiles/Janessa.jpg",
    },
    {
      position: "Outreach Director",
      name: "Saruthi Thirunavukkarasu",
      linkedin: "www.linkedin.com/in/saruthit",
      image: "/images/exec-profiles/Saruthi.jpg",
    },
    {
      position: "Outreach Director",
      name: "Rakshita Jain",
      linkedin: "https://www.linkedin.com/in/rakshita-jain-/",
      image: "/images/exec-profiles/Rakshita.jpg",
    },
  ],
  Marketing: [
    {
      position: "VP Marketing",
      name: "Aditi Suresh",
      linkedin: "https://www.linkedin.com/in/aditi-suresh-0b4673239/",
      image: "/images/exec-profiles/Aditi.jpeg",
    },
    {
      position: "Marketing Director",
      name: "Michelle Kwon",
      linkedin: "https://www.linkedin.com/in/michellekwonnn/",
      image: "/images/exec-profiles/Amie.jpeg",
    },
    {
      position: "Marketing Director",
      name: "Cloris Zhang",
      linkedin: "https://www.linkedin.com/in/cloriszhang/",
      image: "/images/exec-profiles/Cloris.jpeg",
    },
    {
      position: "Marketing Director",
      name: "Jewel Reese",
      linkedin: "https://www.linkedin.com/in/jewelreese/",
      image: "/images/exec-profiles/Jewel.jpeg",
    },
  ],
  Podcast: [
    {
      position: "VP Podcast",
      name: "Ana Franco",
      linkedin: "https://www.linkedin.com/in/anafranco1/",
      image: "/images/exec-profiles/Ana.jpeg",
    },
    {
      position: "Podcast Director",
      name: "Judy Yang",
      linkedin: "https://www.linkedin.com/in/jjudyyang",
      image: "/images/exec-profiles/Judy.png",
    },
    {
      position: "Podcast Director",
      name: "Ahmed Ahmed",
      linkedin: "https://www.linkedin.com/in/ahmed-ahmed24/",
      image: "/images/exec-profiles/Ahmed.jpeg",
    },
    {
      position: "Podcast Director",
      name: "Omar Anwar",
      linkedin: "https://www.linkedin.com/in/omar-anwar19/",
      image: "/images/exec-profiles/Omar.png",
    },
  ],
  Content: [
    {
      position: "VP Content ",
      name: "Shubhaangan Manoranjan",
      linkedin: "https://www.linkedin.com/in/shubmano/",
      image: "/images/exec-profiles/Shub.jpeg",
    },
    {
      position: "Content Director",
      name: "Muktha Kaja",
      linkedin: "https://www.linkedin.com/in/muktha-kaja-9a2803248/",
      image: "/images/exec-profiles/Muktha.jpg",
    },
    {
      position: "Content Director",
      name: "Mayank Sachdeva",
      linkedin: "https://www.linkedin.com/in/mayanksachdeva/",
      image: "/images/exec-profiles/UWPMHeadshot.png",
    },
  ],
  Finance: [
    {
      position: "VP Finance",
      name: "Bhooma Chavadia",
      linkedin: "https://www.linkedin.com/in/bhoomachavadia-30a912252/",
      image: "/images/exec-profiles/Bhooma.jpeg",
    },
    {
      position: "Finance Director",
      name: "Natalie Lo",
      linkedin: "https://ca.linkedin.com/in/natalie-lo-13bb56261",
      image: "/images/exec-profiles/Natalie.jpeg",
    },
  ],
  Design: [
    {
      position: "VP Design",
      name: "Jane Chen",
      linkedin: "https://www.linkedin.com/in/janechen333/",
      image: "/images/exec-profiles/Jane.jpeg",
    },
    {
      position: "Design Director",
      name: "Adila Liu",
      linkedin: "https://www.linkedin.com/in/adilaliu/",
      image: "/images/exec-profiles/Adila.jpeg",
    },
    {
      position: "Design Director",
      name: "Wanyun Xue",
      linkedin: "https://www.linkedin.com/in/wanyun-xue/",
      image: "/images/exec-profiles/Wanyun.jpeg",
    },
  ],
};

export type { TeamType, TeamMember };
export { teams };

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
                  <div className="size-36 overflow-hidden rounded-full bg-muted-foreground">
                    <Avatar className="h-full w-full object-cover" >
                      <AvatarImage src={member.image} />
                      <AvatarFallback>/images/exec/UWPMHeadshot.png</AvatarFallback>
                    </Avatar>
                  </div>
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
