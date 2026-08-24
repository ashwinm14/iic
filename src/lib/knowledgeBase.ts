export interface IICEvent {
  id: number | string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  tag: string;
  color: string;
  category: "hackathon" | "pitch" | "workshop" | "talk" | "competition";
  eligibility: string;
  registrationStatus: "Open" | "Upcoming" | "Closed";
  registrationLink: string;
  organizer: string;
  prizePool?: string;
  stepsToRegister: string[];
}

export interface IICTeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
  image_url?: string;
  description?: string;
  category: "faculty" | "student" | "leadership";
}

export interface IICActivity {
  title: string;
  category: string;
  description: string;
  benefits: string[];
  howToJoin: string;
}

export interface IICFAQ {
  question: string;
  keywords: string[];
  answer: string;
  action?: { label: string; url: string };
}

export const IIC_INFO = {
  name: "Institution's Innovation Council (IIC)",
  fullName: "Institution's Innovation Council, Ministry of Education (MoE) Initiative",
  shortDescription: "A flagship initiative established under the aegis of the Ministry of Education (MoE) Innovation Cell, Government of India, to systematically foster the culture of innovation, student entrepreneurship, prototyping, and intellectual property rights (IPR).",
  motto: "Ideate • Innovate • Incubate",
  establishedYear: 2018,
  parentBody: "Ministry of Education Innovation Cell (MIC), Govt. of India",
  starRating: "5-Star Rated Innovation Council",
  location: "Centre for Innovation & Incubation (Room 204, Academic Block A)",
  contactEmail: "iic@institution.edu.in",
  contactPhone: "+91 98765 43210 / +91 (0) 44 2250 8900",
  workingHours: "Monday - Friday: 9:00 AM - 5:30 PM (Lab access open 24/7 for incubated projects)",
  officialPortal: "https://mic.gov.in",
  socials: {
    linkedin: "https://linkedin.com/company/iic-council",
    twitter: "https://twitter.com/iic_council",
    instagram: "https://instagram.com/iic_innovation",
    github: "https://github.com/iic-council"
  },
  routes: {
    home: "/",
    about: "#about",
    events: "#events",
    team: "#team",
    gallery: "#gallery",
    projects: "#about",
    contact: "#footer",
    registration: "#events",
    moe: "https://mic.gov.in"
  }
};

export const IIC_EVENTS: IICEvent[] = [
  {
    id: 1,
    title: "Innovators Hackathon 2026",
    date: "Oct 15 - Oct 17, 2026",
    time: "9:00 AM - 6:00 PM (48 Hours)",
    venue: "Campus Innovation Hub & Main Auditorium",
    description: "A 48-hour ideation and product sprint focusing on solving real-world challenges using AI, IoT, CleanTech, and Healthcare innovations.",
    tag: "Flagship Hackathon",
    color: "#3b82f6",
    category: "hackathon",
    eligibility: "Open to all undergraduate and postgraduate students from any stream.",
    registrationStatus: "Open",
    registrationLink: "#events",
    organizer: "IIC Hackathon Committee & Student Tech Club",
    prizePool: "₹1,50,000 + Incubation Fast-Track Grants",
    stepsToRegister: [
      "Navigate to the Events section on the website.",
      "Click 'Register Now' on the Innovators Hackathon card.",
      "Form a team of 2 to 4 members and submit your problem statement track.",
      "Upload your one-page idea summary and submit the confirmation."
    ]
  },
  {
    id: 2,
    title: "Startup Pitch & Demo Day",
    date: "Nov 5, 2026",
    time: "10:00 AM - 4:30 PM",
    venue: "Seminar Hall 1, Management Block",
    description: "Pitch your venture to seasoned angel investors, venture capitalists, and receive critical validation, mentorship, and seed grants.",
    tag: "Incubation & Funding",
    color: "#f59e0b",
    category: "pitch",
    eligibility: "Student & Alumni early-stage startups with minimum viable prototypes (MVPs).",
    registrationStatus: "Open",
    registrationLink: "#events",
    organizer: "IIC Incubation Cell & Angel Investor Network",
    prizePool: "Up to ₹5,00,000 Seed Grant + 1-Year Free Incubation Space",
    stepsToRegister: [
      "Prepare your 10-slide pitch deck (Problem, Solution, Market, Traction, Team).",
      "Click 'Register Now' under Startup Pitch & Demo Day.",
      "Submit your executive summary and product video link.",
      "Shortlisted teams will receive personal slot invitations via email."
    ]
  },
  {
    id: 3,
    title: "MoE Innovation Leadership Talk",
    date: "Nov 20, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Virtual & Audio-Visual Hall 2",
    description: "An interactive fireside session with prominent startup founders and policymakers from the Ministry of Education Innovation Cell (MIC).",
    tag: "Leadership & Policy",
    color: "#ef4444",
    category: "talk",
    eligibility: "Open to all students, faculty members, research scholars, and external guests.",
    registrationStatus: "Open",
    registrationLink: "#events",
    organizer: "IIC Leadership & MoE Innovation Cell",
    prizePool: "Certificate of Participation endorsed by MoE Innovation Cell",
    stepsToRegister: [
      "Click 'Register Now' on the Leadership Talk card.",
      "Enter your institutional email ID and roll number.",
      "Receive your QR pass and calendar invite immediately."
    ]
  },
  {
    id: 4,
    title: "National Innovation Contest (Yukti / SIH Internal Sprint)",
    date: "Dec 12 - Dec 14, 2026",
    time: "9:30 AM - 5:00 PM",
    venue: "Central Computing Facility & Makerspace",
    description: "Internal screening and prototype validation for the Ministry of Education Yukti Portal and Smart India Hackathon (SIH) national rounds.",
    tag: "National Competition",
    color: "#10b981",
    category: "competition",
    eligibility: "Teams of 6 students (with mandatory female member for SIH compliance).",
    registrationStatus: "Open",
    registrationLink: "#events",
    organizer: "IIC Smart India Hackathon Committee",
    prizePool: "Direct institutional nomination to SIH & National Prototype Grants",
    stepsToRegister: [
      "Review the problem statements published by Central Ministries.",
      "Register your team of 6 at the IIC portal.",
      "Submit technical design documents before the internal review cutoff."
    ]
  },
  {
    id: 5,
    title: "Workshop on Patent Filing & Intellectual Property Rights (IPR)",
    date: "Jan 10, 2027",
    time: "11:00 AM - 1:30 PM",
    venue: "Digital Conference Room 3",
    description: "Hands-on masterclass on converting final-year projects and research into registered Indian & International Patents with zero institutional filing fees.",
    tag: "IPR & Legal",
    color: "#8b5cf6",
    category: "workshop",
    eligibility: "Open to all students, final year project teams, and faculty.",
    registrationStatus: "Upcoming",
    registrationLink: "#events",
    organizer: "IIC IPR Cell & Patent Attorney Panel",
    prizePool: "100% Institutional Patent Filing Subsidies for approved projects",
    stepsToRegister: [
      "Click 'Register Now' in the events section.",
      "Fill out the provisional project title and abstract.",
      "Attend the interactive session with Patent attorneys."
    ]
  }
];

export const IIC_ACTIVITIES: IICActivity[] = [
  {
    title: "Workshops & Masterclasses",
    category: "Skill Development",
    description: "Hands-on sessions on Design Thinking, Rapid Prototyping, IoT, AI Integration, Lean Canvas Modeling, and Product-Market Fit.",
    benefits: ["Skill certifications", "Hands-on hardware lab access", "Expert direct interaction"],
    howToJoin: "Register via the Events section when announcements go live each semester."
  },
  {
    title: "Startup Incubation & Pre-Incubation",
    category: "Entrepreneurship",
    description: "End-to-end guidance from ideation to company incorporation, co-working desks, legal structuring, mentorship, and seed grants.",
    benefits: ["Free co-working desk space", "Access to cloud credits (AWS/Azure/GCP)", "Seed funding up to ₹5 Lakhs", "Legal & accounting assistance"],
    howToJoin: "Submit your business proposal during our quarterly Pitch & Demo Days or email iic@institution.edu.in."
  },
  {
    title: "Idea Pitching & Hackathons",
    category: "Competitions",
    description: "Intense 24-48 hour coding and hardware hackathons, ideathons, and innovation challenges tackling real industrial and social problems.",
    benefits: ["Cash prizes", "Direct industry mentorship", "SIH national level nomination"],
    howToJoin: "Form a multidisciplinary team and register on the Events section."
  },
  {
    title: "National Innovation and Startup Policy (NISP)",
    category: "Policy & Academic Support",
    description: "Academic flexibility allowing student entrepreneurs to earn academic credits for startup ventures, attendance concessions, and semester breaks for enterprise incubation.",
    benefits: ["Academic credits for registered startups", "On-campus prototype lab access 24/7", "Faculty co-founder guidelines"],
    howToJoin: "Apply through the IIC NISP Coordinator at the incubation center."
  },
  {
    title: "IEDC (Innovation & Entrepreneurship Development Centre)",
    category: "Prototyping Grants",
    description: "Support scheme providing student projects with financial aid up to ₹1,00,000 per project for developing physical proof-of-concept prototypes.",
    benefits: ["Direct hardware component funding", "FabLab & 3D printing access", "Technical mentorship"],
    howToJoin: "Submit your prototype project proposal during the annual IEDC grant cycle."
  },
  {
    title: "IPR & Patent Support Cell",
    category: "Intellectual Property",
    description: "Dedicated assistance for drafting, filing, and publishing patents, copyrights, and design registrations for student and faculty innovations with zero out-of-pocket costs.",
    benefits: ["100% financial reimbursement for filing", "Assistance from certified patent attorneys", "Prior art search support"],
    howToJoin: "Contact the IIC IPR Coordinator at Room 204 or submit your patent abstract online."
  },
  {
    title: "Project Showcase & Annual Innovation Expo",
    category: "Exhibitions",
    description: "Grand annual exhibition bringing together top 100 student prototypes, industry leaders, venture capitalists, and media.",
    benefits: ["Investor visibility", "Media coverage", "Best Innovation Awards"],
    howToJoin: "Nominate your final-year or semester innovation project through your department coordinator."
  }
];

export const IIC_TEAM_FALLBACK: IICTeamMember[] = [
  {
    id: "team-1",
    name: "Veena Prasad",
    role: "Startup Coordinator",
    category: "leadership"
  },
  {
    id: "team-2",
    name: "Jomin Binny",
    role: "Innovation Coordinator",
    category: "leadership"
  },
  {
    id: "team-3",
    name: "Mohammed Salman BK",
    role: "Social Media Coordinator",
    category: "student"
  },
  {
    id: "team-4",
    name: "Gaadha M",
    role: "IPR Coordinator",
    category: "student"
  },
  {
    id: "team-5",
    name: "Sahad Rafeeque P P",
    role: "Internship Coordinator",
    category: "student"
  }
];

export const IIC_FAQS: IICFAQ[] = [
  {
    question: "What is IIC and what does it do?",
    keywords: ["what is iic", "about iic", "meaning", "definition", "purpose", "mission"],
    answer: "**Institution's Innovation Council (IIC)** is an initiative established by the **Ministry of Education (MoE) Innovation Cell**, Govt. of India. Its mission is to systematically cultivate an innovation and entrepreneurial mindset among students, support startup ideas, facilitate patent filings, and host hackathons.",
    action: { label: "Learn More About IIC →", url: "#about" }
  },
  {
    question: "How can students participate in IIC activities?",
    keywords: ["participate", "join", "get involved", "how to attend", "member", "membership"],
    answer: "Students from any department and year can participate by:\n1. Registering for upcoming **hackathons, workshops, and pitch days** in the Events section.\n2. Joining the **Student Innovation Council** during annual volunteer recruitment.\n3. Applying for **Incubation or IEDC Prototype Grants** with a project idea.",
    action: { label: "Explore Events →", url: "#events" }
  },
  {
    question: "How do I register for an IIC event?",
    keywords: ["how to register", "registration steps", "signup", "apply", "register for event"],
    answer: "To register for any IIC event:\n1. Scroll to the **Events** section or view the cards below.\n2. Choose your preferred event (Hackathon, Pitch Day, Talk).\n3. Click the **'Register Now'** button.\n4. Complete the online form with your details and team members.\n5. You will receive an immediate confirmation email and entry pass!",
    action: { label: "Go to Events Section →", url: "#events" }
  },
  {
    question: "How can I get funding or incubation for my startup idea?",
    keywords: ["funding", "grant", "seed money", "startup", "incubation", "incubate", "investor"],
    answer: "IIC provides comprehensive startup support:\n• **Pre-incubation**: Free desk space, high-speed internet, and hardware lab access.\n• **IEDC Prototype Grants**: Up to ₹1,00,000 for hardware/software prototype building.\n• **Seed Funding**: Pitch during **Startup Pitch & Demo Day** for grants up to ₹5,00,000.\n• **Mentorship**: 1-on-1 sessions with angel investors and industry leaders.",
    action: { label: "View Incubation Details →", url: "#about" }
  },
  {
    question: "Does IIC help with Patent and IPR filing?",
    keywords: ["patent", "ipr", "copyright", "trademark", "intellectual property", "prior art"],
    answer: "Yes! The **IIC IPR & Patent Support Cell** provides **100% financial reimbursement** for student and faculty patent filings, along with free legal consultation from certified patent attorneys to conduct prior-art searches and draft claims.",
    action: { label: "Contact IPR Cell →", url: "#about" }
  },
  {
    question: "What is NISP (National Innovation & Startup Policy)?",
    keywords: ["nisp", "policy", "academic credits", "attendance concession"],
    answer: "Under the **National Innovation and Startup Policy (NISP)** implemented by IIC:\n• Students working on verified startups can earn academic credits.\n• Eligible founders receive attendance relaxation and exam scheduling accommodations.\n• Student entrepreneurs can take a semester break to focus full-time on scaling their enterprise.",
    action: { label: "NISP Guidelines →", url: "https://mic.gov.in" }
  },
  {
    question: "Who are the IIC Core Committee '26-'27 members and coordinators?",
    keywords: ["core committee", "coordinators", "committee members", "iic committee", "who is in committee", "team 26 27", "committee 26 27"],
    answer: "### 👥 **IIC Core Committee '26–'27**\n\n• **Veena Prasad** — Startup Coordinator\n• **Jomin Binny** — Innovation Coordinator\n• **Mohammed Salman BK** — Social Media Coordinator\n• **Gaadha M** — IPR Coordinator\n• **Sahad Rafeeque P P** — Internship Coordinator",
    action: { label: "View Core Committee Section →", url: "#team" }
  },
  {
    question: "Who is the Startup Coordinator?",
    keywords: ["startup coordinator", "who is startup coordinator", "veena", "veena prasad"],
    answer: "**Veena Prasad** is the **Startup Coordinator** for the IIC Committee '26–'27.",
    action: { label: "View Core Committee →", url: "#team" }
  },
  {
    question: "Who is the Innovation Coordinator?",
    keywords: ["innovation coordinator", "who is innovation coordinator", "jomin", "jomin binny"],
    answer: "**Jomin Binny** is the **Innovation Coordinator** for the IIC Committee '26–'27.",
    action: { label: "View Core Committee →", url: "#team" }
  },
  {
    question: "Who is the Social Media Coordinator?",
    keywords: ["social media coordinator", "media coordinator", "salman", "salman bk", "mohammed salman"],
    answer: "**Mohammed Salman BK** is the **Social Media Coordinator** for the IIC Committee '26–'27.",
    action: { label: "View Core Committee →", url: "#team" }
  },
  {
    question: "Who is the IPR Coordinator?",
    keywords: ["ipr coordinator", "patent coordinator", "gaadha", "gaadha m"],
    answer: "**Gaadha M** is the **IPR Coordinator** for the IIC Committee '26–'27.",
    action: { label: "View Core Committee →", url: "#team" }
  },
  {
    question: "Who is the Internship Coordinator?",
    keywords: ["internship coordinator", "who is internship coordinator", "sahad", "sahad rafeeque"],
    answer: "**Sahad Rafeeque P P** is the **Internship Coordinator** for the IIC Committee '26–'27.",
    action: { label: "View Core Committee →", url: "#team" }
  },
  {
    question: "How can I contact the IIC Team?",
    keywords: ["how to contact", "iic email", "iic phone", "iic office location", "reach out to iic", "contact iic team", "contact iic"],
    answer: "You can reach the IIC team through:\n• **Email**: `iic@institution.edu.in`\n• **Phone**: +91 98765 43210 / +91 (0) 44 2250 8900\n• **Office**: Room 204, Centre for Innovation & Incubation (Block A)\n• **Hours**: Monday to Friday, 9:00 AM - 5:30 PM",
    action: { label: "Go to Footer Links →", url: "#footer" }
  }
];
