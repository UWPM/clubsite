import { FormSubmission, type TeamResponses } from "../apply/layouts/formSchema"

type TeamId = keyof TeamResponses;

export const TEAMS: { id: TeamId; name: string }[] = [
    { id: "engineering", name: "Engineering" },
    { id: "events", name: "Events" },
    { id: "marketing", name: "Marketing" },
    { id: "outreach", name: "Outreach" },
    { id: "podcast", name: "Podcast" },
    { id: "secretary", name: "Secretary" },
    { id: "finance", name: "Finance" },
  ]
  
  // Mock data for applicants
  export const MOCK_APPLICANTS: { [key in TeamId]?: FormSubmission[] } = {
    engineering: [
      {
        id: "1",
        created_at: "2023-10-15T12:00:00Z",
        uw_email_address: "alex@uwaterloo.ca",
        full_name: "Alex Johnson",
        program: "Computer Science",
        term: "2A",
        term_type: "study",
        on_campus: true,
        why_interested: "I'm passionate about building software that helps people.",
        first_choice_team: "engineering",
        second_choice_team: "marketing",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          engineering: {
            choice_num: 1,
            engineering_skills:
              "I have experience with React, Node.js, and Python. I've built several web applications and contributed to open source projects.",
            engineering_project_link: "https://github.com/alexj/awesome-project",
            engineering_technical_challenge:
              "During a hackathon, our database kept crashing under load. I implemented a caching layer that reduced database queries by 80% and fixed the issue.",
          },
          marketing: {
            choice_num: 2,
            marketing_skills: "I have experience creating social media content and analyzing engagement metrics.",
            marketing_example_instagram_post:
              "🚀 Exciting news! Our club just launched a new project that's going to change how you think about technology. Check out the link in bio to learn more! #TechInnovation #StudentProjects",
          },
        },
        tags: ["experienced", "backend"],
        selected: false,
      },
      {
        id: "2",
        created_at: "2023-10-16T14:30:00Z",
        uw_email_address: "sam@uwaterloo.ca",
        full_name: "Sam Wilson",
        program: "Software Engineering",
        term: "3B",
        term_type: "study",
        on_campus: true,
        why_interested:
          "I want to apply my skills to real-world projects and collaborate with other passionate students.",
        first_choice_team: "engineering",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          engineering: {
            choice_num: 1,
            engineering_skills:
              "I specialize in frontend development with React, Vue, and Angular. I've also worked with UI/UX design tools like Figma.",
            engineering_project_link: "https://devpost.com/samw/projects",
            engineering_technical_challenge:
              "I had to optimize a React application that was rendering too slowly. I implemented memo and useCallback to prevent unnecessary re-renders, improving performance by 40%.",
          },
        },
        tags: ["frontend", "ui-ux"],
        selected: false,
      },
    ],
    marketing: [
      {
        id: "3",
        created_at: "2023-10-14T09:15:00Z",
        uw_email_address: "a4ojha@uwaterloo.ca",
        full_name: "Jordan Lee",
        program: "Business Administration",
        term: "4A",
        term_type: "study",
        on_campus: false,
        why_interested: "I'm passionate about digital marketing and want to help the club grow its online presence.",
        first_choice_team: "marketing",
        second_choice_team: "events",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          marketing: {
            choice_num: 1,
            marketing_skills:
              "I have experience managing social media accounts for student organizations and small businesses. I'm proficient in content creation, analytics, and campaign planning.",
            marketing_example_instagram_post:
              "✨ Join us this Friday for an exclusive workshop on digital marketing strategies! Learn from industry experts and network with fellow students. Limited spots available - register now through the link in our bio! #MarketingWorkshop #NetworkingEvent",
          },
          events: {
            choice_num: 2,
            events_skills:
              "I've organized several campus events and workshops, handling everything from venue booking to promotion.",
            events_past_experience:
              "I led a team that organized a networking event with local tech companies. We secured sponsorships, managed logistics, and attracted over 200 attendees.",
          },
        },
        tags: ["content", "social-media"],
        selected: true,
      },
    ],
    events: [
      {
        id: "4",
        created_at: "2023-10-13T16:45:00Z",
        uw_email_address: "taylor@uwaterloo.ca",
        full_name: "Taylor Reed",
        program: "Recreation and Leisure Studies",
        term: "2B",
        term_type: "study",
        on_campus: true,
        why_interested: "I love planning and executing events that bring people together.",
        first_choice_team: "events",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          events: {
            choice_num: 1,
            events_skills:
              "I have experience in event planning, venue coordination, and budget management. I've worked with student clubs to organize workshops, socials, and conferences.",
            events_past_experience:
              "I coordinated a three-day student conference with workshops, keynote speakers, and networking sessions. We had over 300 attendees and received excellent feedback.",
          },
        },
        tags: ["organized", "creative"],
        selected: false,
      },
    ],
    outreach: [
      {
        id: "5",
        created_at: "2023-10-12T11:20:00Z",
        uw_email_address: "morgan@uwaterloo.ca",
        full_name: "Morgan Smith",
        program: "Communication Studies",
        term: "3A",
        term_type: "study",
        on_campus: true,
        why_interested: "I'm passionate about building partnerships and connecting with the community.",
        first_choice_team: "outreach",
        second_choice_team: "marketing",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          outreach: {
            choice_num: 1,
            director_applicant: false,
            lead_applicant: true,
            outreach_skills:
              "I have experience in partnership development, email outreach, and relationship management. I've worked with local businesses and campus organizations to secure sponsorships and collaborations.",
            outreach_experience:
              "I established a partnership between my previous club and a local tech startup, resulting in workshop opportunities and mentorship for our members.",
            outreach_lead_experience:
              "I led a team of 5 students in an outreach campaign to local businesses. We secured 10 new partnerships and $5,000 in sponsorships.",
          },
          marketing: {
            choice_num: 2,
            marketing_skills: "I have experience creating content for social media and email newsletters.",
            marketing_example_instagram_post:
              "🤝 Excited to announce our new partnership with @TechStartup! Stay tuned for exclusive workshops and mentorship opportunities coming your way. #Partnership #StudentOpportunities",
          },
        },
        tags: ["communication", "networking"],
        selected: true,
      },
    ],
    podcast: [
      {
        id: "6",
        created_at: "2023-10-11T13:10:00Z",
        uw_email_address: "casey@uwaterloo.ca",
        full_name: "Casey Morgan",
        program: "Digital Arts Communication",
        term: "4B",
        term_type: "study",
        on_campus: false,
        why_interested: "I love storytelling and want to help share interesting stories through the podcast.",
        first_choice_team: "podcast",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          podcast: {
            choice_num: 1,
            podcast_skills:
              "I have experience in audio recording, editing, and production. I've worked on several podcast projects and am familiar with industry-standard tools like Adobe Audition and Audacity.",
            podcast_example:
              "I created a mini-documentary about student entrepreneurs on campus, breaking down complex business concepts into engaging stories that resonated with listeners.",
          },
        },
        tags: ["creative", "technical"],
        selected: false,
      },
    ],
    secretary: [
      {
        id: "7",
        created_at: "2023-10-10T10:05:00Z",
        uw_email_address: "riley@uwaterloo.ca",
        full_name: "Riley Kim",
        program: "Legal Studies",
        term: "3B",
        term_type: "study",
        on_campus: true,
        why_interested: "I'm detail-oriented and want to help the club stay organized and efficient.",
        first_choice_team: "secretary",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          secretary: {
            choice_num: 1,
            secretary_skills:
              "I have experience in administrative roles, including minute-taking, document management, and scheduling. I'm highly organized and detail-oriented.",
            secretary_idea:
              "I propose creating a comprehensive digital handbook for the club that outlines processes, roles, and expectations. This would improve consistency and help new members integrate more quickly.",
            secretary_team_conflict:
              "In a previous group project, two team members had different visions for our approach. I facilitated a structured discussion where each person could express their ideas, and we collaboratively created a solution that incorporated elements from both approaches.",
          },
        },
        tags: ["organized", "detail-oriented"],
        selected: true,
      },
    ],
    finance: [
      {
        id: "8",
        created_at: "2023-10-09T15:30:00Z",
        uw_email_address: "jamie@uwaterloo.ca",
        full_name: "Jamie Davis",
        program: "Accounting and Financial Management",
        term: "3A",
        term_type: "study",
        on_campus: true,
        why_interested: "I want to apply my financial knowledge to help the club manage its resources effectively.",
        first_choice_team: "finance",
        resume_link: "https://example.com/resume.pdf",
        team_responses: {
          finance: {
            choice_num: 1,
            finance_project:
              "I developed and managed a budget for a student conference with $10,000 in funding. I created detailed spreadsheets to track expenses, implemented cost-saving measures, and ensured we stayed within budget while delivering a high-quality event.",
            finance_time_management:
              "During tax season, I had to prepare financial reports for three student organizations within a week. I prioritized tasks, created a detailed schedule, and stayed focused to meet all deadlines successfully.",
          },
        },
        tags: ["analytical", "detail-oriented"],
        selected: false,
      },
    ],
  }
  
  