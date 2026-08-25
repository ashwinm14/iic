import {
  IIC_INFO,
  IIC_EVENTS,
  IIC_ACTIVITIES,
  IIC_TEAM_FALLBACK,
  IIC_FAQS,
  IICEvent,
  IICTeamMember
} from "./knowledgeBase";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  events?: IICEvent[];
  actions?: Array<{ label: string; url: string; external?: boolean }>;
  suggestions?: string[];
  sources?: string[];
}

export interface ChatResponse {
  reply: string;
  events?: IICEvent[];
  actions?: Array<{ label: string; url: string; external?: boolean }>;
  suggestions?: string[];
  sources?: string[];
}

// Clean and normalize text
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Typo-tolerant keyword search
function containsAny(text: string, keywords: string[]): boolean {
  const norm = normalize(text);
  return keywords.some((kw) => {
    const kwNorm = normalize(kw);
    return norm.includes(kwNorm) || norm.split(" ").includes(kwNorm);
  });
}

// Check if query is completely off-topic
function isOffTopic(text: string): boolean {
  const norm = normalize(text);
  const offTopicKeywords = [
    "weather", "recipe", "cook", "movie", "song", "lyrics", "cricket score", "football score",
    "prime minister of", "capital of", "president of france", "president of usa",
    "write python code for", "write java code for", "solve equation", "horoscope", "astrology"
  ];
  
  const iicContextWords = [
    "iic", "innovation", "startup", "event", "hackathon", "workshop", "team", "coordinator",
    "register", "participate", "project", "funding", "grant", "patent", "ipr", "iedc", "nisp",
    "mic", "moe", "institution", "council", "pitch", "competition", "expo", "gallery",
    "veena", "jomin", "salman", "gaadha", "sahad", "committee"
  ];

  const hasOffTopic = offTopicKeywords.some(kw => norm.includes(kw));
  const hasIICContext = iicContextWords.some(kw => norm.includes(kw));

  return hasOffTopic && !hasIICContext;
}

// Parse ordinal reference (first, second, 1st, 2nd, etc.)
function parseOrdinal(text: string, maxItems: number = 5): number | null {
  const norm = normalize(text);
  const patterns: [RegExp, number][] = [
    [/\b(fifth|5th|fifth one|number 5)\b/, 5],
    [/\b(fourth|4th|fourth one|number 4)\b/, 4],
    [/\b(third|3rd|third one|number 3)\b/, 3],
    [/\b(second|2nd|second one|number 2)\b/, 2],
    [/\b(first|1st|first one|number 1)\b/, 1]
  ];

  for (const [regex, index] of patterns) {
    if (regex.test(norm) && index <= maxItems) {
      return index;
    }
  }
  return null;
}

// Extract conversation context from message history
interface ConversationContext {
  lastTopic?: "events" | "team" | "registration" | "activities" | "ipr" | "incubation" | "general";
  lastEventId?: number | string;
  lastEventsList?: IICEvent[];
}

function analyzeHistory(history: ChatMessage[] = []): ConversationContext {
  const context: ConversationContext = {};

  // Scan last 6 messages from most recent backwards
  const recentMessages = [...history].reverse().slice(0, 6);

  for (const msg of recentMessages) {
    if (msg.events && msg.events.length > 0) {
      context.lastEventsList = msg.events;
      if (!context.lastEventId) {
        context.lastEventId = msg.events[0].id;
      }
      context.lastTopic = "events";
      break;
    }
  }

  return context;
}

/**
 * Intelligent NLP dialogue engine that processes messages, resolves context,
 * prevents hallucinations, and generates rich structured responses.
 */
export function processIICMessage(
  userQuery: string,
  history: ChatMessage[] = [],
  dynamicEvents: IICEvent[] = IIC_EVENTS,
  dynamicTeam: IICTeamMember[] = IIC_TEAM_FALLBACK
): ChatResponse {
  const rawQuery = userQuery.trim();
  const normQuery = normalize(rawQuery);
  const context = analyzeHistory(history);

  // 1. Off-topic detection
  if (isOffTopic(rawQuery)) {
    return {
      reply: "I’m the **IIC Assistant**, so I’m mainly here to help with IIC, innovation, entrepreneurship, events, competitions, and startup activities. What would you like to know about IIC?",
      suggestions: ["📅 Upcoming Events", "🚀 IIC Activities", "💡 How to Register?", "👥 IIC Team"]
    };
  }

  // 2. Greetings & Salutations
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|vanakkam)\b/i.test(normQuery) && normQuery.split(" ").length <= 3) {
    return {
      reply: `Hi! 👋 I'm the **IIC Assistant**.\n\nI can help you discover upcoming **hackathons**, explore **startup incubation & grants**, guide you through **event registration**, or connect you with the **IIC Team**.\n\nHow can I help you today?`,
      suggestions: [
        "📅 Upcoming Events",
        "🚀 IIC Activities",
        "💡 Innovation Programs",
        "🏆 Competitions",
        "📝 How to Register?",
        "👥 IIC Team",
        "📞 Contact IIC",
        "❓ FAQs"
      ],
      actions: [
        { label: "Explore Events →", url: IIC_INFO.routes.events },
        { label: "About IIC →", url: IIC_INFO.routes.about }
      ]
    };
  }

  // 3. Contextual ordinal inquiry (e.g., "tell me more about the second one", "details of 1st event")
  const ordinal = parseOrdinal(normQuery, dynamicEvents.length);
  if (ordinal !== null && (context.lastTopic === "events" || context.lastEventsList || containsAny(normQuery, ["event", "one", "more", "detail", "about", "tell"]))) {
    const eventsList = context.lastEventsList && context.lastEventsList.length > 0 ? context.lastEventsList : dynamicEvents;
    const stubEvent = eventsList[ordinal - 1];
    const selectedEvent = (stubEvent && dynamicEvents.find(e => e.id === stubEvent.id || e.title.toLowerCase() === stubEvent.title.toLowerCase())) || stubEvent;

    if (selectedEvent) {
      return {
        reply: `### 📌 ${selectedEvent.title}\n\n**Tag:** ${selectedEvent.tag || "Innovation Event"}\n📅 **Date:** ${selectedEvent.date}\n⏰ **Time:** ${selectedEvent.time || "Full Day"}\n📍 **Venue:** ${selectedEvent.venue || "Campus Innovation Hub"}\n🏢 **Organizer:** ${selectedEvent.organizer || "IIC Council"}\n👥 **Eligibility:** ${selectedEvent.eligibility || "Open to all students"}\n${selectedEvent.prizePool ? `🏆 **Prizes/Grants:** ${selectedEvent.prizePool}\n` : ""}\n📝 **Description:**\n${selectedEvent.description || "Exciting innovation initiative."}\n\n**Registration Status:** ${selectedEvent.registrationStatus || "Open"}\n\nWould you like the steps to register for this event?`,
        events: [selectedEvent],
        actions: [
          { label: `Register for ${selectedEvent.title} →`, url: selectedEvent.registrationLink || "#events" }
        ],
        suggestions: [
          `How do I register for ${selectedEvent.title}?`,
          "Show all upcoming events",
          "Contact IIC Coordinator"
        ],
        sources: ["IIC Official Event Repository"]
      };
    }
  }

  // 4. Registration questions (contextual or general)
  if (containsAny(normQuery, [
    "register", "registration", "how to register", "signup", "sign up", "how do i join", "can i register",
    "registration link", "apply", "how to apply", "registration steps", "where to register"
  ])) {
    // Specific event mentioned or context available
    let targetEvent: IICEvent | undefined;

    // Check if a specific event is in query
    for (const ev of dynamicEvents) {
      if (normQuery.includes(normalize(ev.title)) || (ev.category && normQuery.includes(ev.category))) {
        targetEvent = ev;
        break;
      }
    }

    if (!targetEvent && context.lastEventId) {
      targetEvent = dynamicEvents.find(e => e.id === context.lastEventId);
    }

    if (targetEvent) {
      return {
        reply: `### 📝 Registration Guide for **${targetEvent.title}**\n\nTo register, follow these simple steps:\n\n${targetEvent.stepsToRegister.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n**Venue:** ${targetEvent.venue}\n**Date:** ${targetEvent.date} (${targetEvent.time})\n**Eligibility:** ${targetEvent.eligibility}\n\nClick the button below to register directly!`,
        events: [targetEvent],
        actions: [
          { label: "Register Now →", url: targetEvent.registrationLink }
        ],
        suggestions: [
          "Who can participate?",
          "Are there registration fees?",
          "Show other events"
        ],
        sources: ["IIC Event Registration Guidelines"]
      };
    }

    // General registration response
    return {
      reply: `### 📝 How to Register for IIC Events & Initiatives\n\n1. **Browse Events:** Scroll to the **Events** section or ask me to show upcoming events.\n2. **Choose Event:** Select the workshop, hackathon, or pitch competition you wish to attend.\n3. **Click 'Register Now':** Fill out the quick Google Form or registration portal with your details.\n4. **Confirmation:** You'll receive an instant confirmation email with your digital badge and calendar invite.\n\n*All institutional IIC events are 100% free for students and faculty.*`,
      actions: [
        { label: "Go to Events Section →", url: IIC_INFO.routes.events }
      ],
      suggestions: [
        "Show me upcoming events",
        "Innovators Hackathon 2026",
        "Startup Pitch & Demo Day"
      ]
    };
  }

  // 5. Upcoming Events / Hackathons / Competitions / Typo Handling ("iic event undo?", "any events dis week", "what's happening")
  if (
    containsAny(normQuery, [
      "event", "events", "upcoming", "schedule", "calendar", "what happening", "whats happening",
      "hackathon", "competition", "contest", "pitch day", "workshop", "seminar", "undo", "undha", "hai kya",
      "any event", "next event", "latest event"
    ]) ||
    /^(events|hackathons|competitions|activities|whats next|any events)\??$/i.test(normQuery)
  ) {
    if (dynamicEvents.length === 0) {
      return {
        reply: "There are currently no upcoming IIC events scheduled in the database. Please check back soon or visit the Events section for upcoming announcements.",
        actions: [{ label: "View Events Section →", url: IIC_INFO.routes.events }]
      };
    }

    // If query asks specifically for the "next" event
    if (containsAny(normQuery, ["next event", "when is next", "upcoming next"])) {
      const nextEvent = dynamicEvents[0];
      return {
        reply: `The next IIC event is **${nextEvent.title}** on **${nextEvent.date}** at **${nextEvent.time}**.\n\n📍 **Venue:** ${nextEvent.venue}\n🏷️ **Category:** ${nextEvent.tag}\n\n${nextEvent.description}\n\nWould you like the registration link or details?`,
        events: [nextEvent],
        actions: [
          { label: "Register Now →", url: nextEvent.registrationLink },
          { label: "View All Events →", url: IIC_INFO.routes.events }
        ],
        suggestions: [
          `How do I register for ${nextEvent.title}?`,
          "Show all upcoming events",
          "Who is organizing this?"
        ],
        sources: ["IIC Dynamic Event Schedule"]
      };
    }

    // Return list of available events
    return {
      reply: `Here are the currently available **IIC Events & Competitions**:\n\n${dynamicEvents.map((e, idx) => `**${idx + 1}. ${e.title}**\n📅 ${e.date} | ⏰ ${e.time}\n📍 ${e.venue}\n`).join("\n")}\nTap any event card below to view details or register!`,
      events: dynamicEvents,
      actions: [
        { label: "Explore Full Events Calendar →", url: IIC_INFO.routes.events }
      ],
      suggestions: [
        "Tell me more about the first one",
        "Tell me more about the second one",
        "How do I register for the hackathon?",
        "Who can participate?"
      ],
      sources: ["IIC Dynamic Event Database"]
    };
  }

  // 6. About IIC / Introduction / Objectives / Ministry of Education
  if (containsAny(normQuery, [
    "what is iic", "about iic", "who are you", "what do you do", "objective", "mission", "vision",
    "why iic", "moe", "ministry of education", "innovation cell", "mic", "rating", "star rating"
  ])) {
    return {
      reply: `### 🏛️ About Institution's Innovation Council (IIC)\n\n**${IIC_INFO.name}** is a premier initiative established under the aegis of the **Ministry of Education (MoE) Innovation Cell (MIC)**, Government of India.\n\n**🎯 Core Objectives:**\n• **Systemic Innovation:** Promote creativity, ideation, and problem-solving among students.\n• **Startup Incubation:** Provide pre-incubation, prototyping lab facilities, and seed funding support.\n• **IPR & Patenting:** Assist student innovators in filing patents with 100% financial support.\n• **Hackathons & Competitions:** Nominate winning teams to national platforms like **Smart India Hackathon (SIH)** and **Yukti**.\n\n**⭐ Recognition:** Proudly rated a **${IIC_INFO.starRating}** by the Ministry of Education!`,
      actions: [
        { label: "Discover Our Mission →", url: IIC_INFO.routes.about },
        { label: "MoE Innovation Cell (MIC) ↗", url: IIC_INFO.routes.moe, external: true }
      ],
      suggestions: [
        "Show upcoming events",
        "How can students join?",
        "Tell me about startup programs",
        "Who runs IIC?"
      ],
      sources: ["Ministry of Education Innovation Cell Guidelines", "IIC Charter"]
    };
  }

  // 7. Specific Coordinator inquiries (Prioritized)
  if (containsAny(normQuery, [
    "veena", "veena prasad", "startup coordinator", "who is startup coordinator", "who heads startup",
    "who manages startup", "startup lead", "startup head"
  ])) {
    return {
      reply: `### 👩‍💼 **Veena Prasad**\n\n**Role:** Startup Coordinator (IIC Core Committee '26–'27)`,
      actions: [{ label: "View in Committee →", url: "#team" }],
      suggestions: ["Who is the Innovation Coordinator?", "Show full Core Committee", "Startup Pitch & Demo Day"]
    };
  }

  if (containsAny(normQuery, [
    "jomin", "jomin binny", "innovation coordinator", "who is innovation coordinator", "who heads innovation",
    "innovation lead", "innovation head"
  ])) {
    return {
      reply: `### 👨‍💼 **Jomin Binny**\n\n**Role:** Innovation Coordinator (IIC Core Committee '26–'27)`,
      actions: [{ label: "View in Committee →", url: "#team" }],
      suggestions: ["Upcoming hackathons", "Who is the Startup Coordinator?", "Show full Core Committee"]
    };
  }

  if (containsAny(normQuery, [
    "salman", "mohammed salman", "salman bk", "social media coordinator", "media coordinator",
    "who handles social media", "who handles media", "social media lead", "public relations coordinator", "who manages instagram"
  ])) {
    return {
      reply: `### 👨‍💼 **Mohammed Salman BK**\n\n**Role:** Social Media Coordinator (IIC Core Committee '26–'27)`,
      actions: [{ label: "View in Committee →", url: "#team" }],
      suggestions: ["Campus photo gallery", "Show full Core Committee", "Upcoming events"]
    };
  }

  if (containsAny(normQuery, [
    "gaadha", "gaadha m", "ipr coordinator", "patent coordinator", "who is ipr coordinator",
    "ipr lead", "patent lead", "who handles patents", "who handles ipr", "intellectual property coordinator"
  ])) {
    return {
      reply: `### 👩‍💼 **Gaadha M**\n\n**Role:** IPR Coordinator (IIC Core Committee '26–'27)`,
      actions: [{ label: "View in Committee →", url: "#team" }],
      suggestions: ["Patent filing support", "Who is the Internship Coordinator?", "Show full Core Committee"]
    };
  }

  if (containsAny(normQuery, [
    "sahad", "sahad rafeeque", "internship coordinator", "who is internship coordinator",
    "internship lead", "who handles internships", "who arranges internships", "internships coordinator"
  ])) {
    return {
      reply: `### 👨‍💼 **Sahad Rafeeque P P**\n\n**Role:** Internship Coordinator (IIC Core Committee '26–'27)`,
      actions: [{ label: "View in Committee →", url: "#team" }],
      suggestions: ["How to apply for internship?", "Who is the Startup Coordinator?", "Show full Core Committee"]
    };
  }

  // 8. Full IIC Team, Leadership, Coordinators, Core Committee
  if (containsAny(normQuery, [
    "team", "coordinator", "coordinators", "president", "chairman", "convener", "who runs", "who is the coordinator",
    "faculty", "student coordinator", "leadership", "who is in charge", "members", "committee", "core team",
    "core committee", "iic committee", "committee 26 27", "committee 26-27", "team members", "who are the coordinators"
  ])) {
    const leaders = dynamicTeam.length > 0 ? dynamicTeam : IIC_TEAM_FALLBACK;
    return {
      reply: `### 👥 **IIC Core Committee '26–'27**\n\n${leaders.map(m => `• **${m.name}** — *${m.role}*`).join("\n")}`,
      actions: [
        { label: "View Core Committee Section →", url: IIC_INFO.routes.team }
      ],
      suggestions: [
        "Who is the Startup Coordinator?",
        "Who is the Innovation Coordinator?",
        "How can I contact the IIC team?",
        "Show upcoming events"
      ],
      sources: ["IIC Core Committee '26-'27 Roster"]
    };
  }

  // 9. Startup, Incubation, Funding & Grants
  if (containsAny(normQuery, [
    "startup", "incubation", "incubate", "funding", "seed grant", "grant", "seed money", "investor",
    "pre incubation", "prototype fund", "iedc", "venture", "pitch"
  ])) {
    return {
      reply: `### 🚀 Startup & Incubation Support at IIC\n\nIIC offers a complete pathway to turn ideas into thriving enterprises:\n\n1. **💡 Pre-Incubation:** Access to 24/7 high-tech Makerspace, 3D printers, IoT kits, and co-working desks.\n2. **💰 IEDC Prototype Grants:** Financial grants up to **₹1,00,000 per project** for building hardware/software prototypes.\n3. **📈 Seed Funding & Demo Day:** Pitch to angel investors and venture funds for seed grants up to **₹5,00,000**.\n4. **🤝 Mentorship:** 1-on-1 guidance on Lean Canvas, legal incorporation, IP protection, and market entry.\n5. **📜 NISP Policy:** Earn academic credits for your registered startup venture!`,
      actions: [
        { label: "Startup Pitch & Demo Day →", url: "#events" },
        { label: "Learn About Incubation →", url: IIC_INFO.routes.about }
      ],
      suggestions: [
        "When is the next Demo Day?",
        "What is NISP policy?",
        "How to apply for IEDC grants?",
        "Who is the Startup Coordinator?"
      ],
      sources: ["IIC Incubation & Seed Grant Framework"]
    };
  }

  // 10. IEDC & NISP Policies
  if (containsAny(normQuery, ["nisp", "iedc", "policy", "academic credit", "attendance"])) {
    return {
      reply: `### 📜 NISP & IEDC Initiatives at IIC\n\n• **NISP (National Innovation and Startup Policy):**\n  - Allows student innovators to earn **academic course credits** for startup activities.\n  - Provides attendance exemptions for attending investor pitch meetings and hackathons.\n  - Allows student founders to take a **semester gap** to scale their validated startup.\n\n• **IEDC (Innovation & Entrepreneurship Development Centre):**\n  - Provides up to **₹1 Lakh prototype funding** per approved student project.\n  - Technical mentorship from university faculty and alumni founders.`,
      actions: [
        { label: "Read NISP Framework ↗", url: "https://mic.gov.in", external: true }
      ],
      suggestions: [
        "How to apply for IEDC grant?",
        "Upcoming events",
        "Who is the coordinator?"
      ]
    };
  }

  // 11. IPR & Patent Support
  if (containsAny(normQuery, ["patent", "ipr", "intellectual property", "copyright", "trademark", "prior art"])) {
    return {
      reply: `### ⚖️ IPR & Patent Support Cell\n\nHave you developed a unique invention, algorithm, or hardware product?\n\n• **100% Institutional Reimbursement:** Zero out-of-pocket patent filing costs for students and faculty.\n• **Attorney Consultation:** Free assistance from certified patent attorneys for prior art search and patent claim drafting.\n• **Fast-Track Processing:** Direct assistance through the MoE Innovation Cell IPR facilitation window.`,
      actions: [
        { label: "Explore IPR Workshop →", url: "#events" },
        { label: "Contact IPR Cell →", url: "#footer" }
      ],
      suggestions: [
        "Who is the IPR Coordinator?",
        "Upcoming IPR Workshop",
        "How to submit patent abstract?"
      ],
      sources: ["IIC Intellectual Property Guidelines"]
    };
  }

  // 11. Eligibility / Who can participate
  if (containsAny(normQuery, ["eligibility", "who can participate", "who can join", "am i eligible", "eligibility criteria", "any branch"])) {
    return {
      reply: `### 🎓 Eligibility for IIC Programs\n\n• **Most IIC Activities (Hackathons, Workshops, Guest Lectures):** Open to **all students** (UG, PG, PhD) from any engineering, management, or science department.\n• **Startup Incubation & Pitch Days:** Open to current students and alumni teams with a prototype or business plan.\n• **Smart India Hackathon / SIH:** Requires a 6-member student team from our institution (with at least 1 female team member as per MoE guidelines).\n\nThere are **no prerequisite fees** to join IIC events!`,
      suggestions: [
        "Show upcoming hackathons",
        "How to register for events?",
        "Startup Incubation details"
      ]
    };
  }

  // 12. Contact Information / Office Location / Email
  if (
    !containsAny(normQuery, ["personal", "home phone", "private phone", "personal number"]) &&
    containsAny(normQuery, ["contact", "email", "phone", "location", "address", "where is iic", "office", "reach", "call", "helpdesk"])
  ) {
    return {
      reply: `### 📞 Contact Institution's Innovation Council\n\n• 🏢 **Office:** ${IIC_INFO.location}\n• 📧 **Email:** \`${IIC_INFO.contactEmail}\`\n• 📱 **Phone:** \`${IIC_INFO.contactPhone}\`\n• ⏰ **Working Hours:** ${IIC_INFO.workingHours}\n• 🌐 **National Portal:** [mic.gov.in](https://mic.gov.in)`,
      actions: [
        { label: "Email IIC Team ✉️", url: `mailto:${IIC_INFO.contactEmail}` },
        { label: "Go to Footer →", url: "#footer" }
      ],
      suggestions: [
        "Who is the IIC Coordinator?",
        "Show upcoming events",
        "How do I join IIC?"
      ],
      sources: ["Official IIC Contact Directory"]
    };
  }

  // 13. Website Navigation & Sections (Gallery, Projects, About, Events, Team)
  if (containsAny(normQuery, ["gallery", "photos", "campus life", "pictures"])) {
    return {
      reply: `You can view our campus innovation activities, hackathon snapshots, and prototype exhibitions in the **Campus Photo Gallery**!`,
      actions: [
        { label: "View Campus Gallery →", url: IIC_INFO.routes.gallery }
      ],
      suggestions: ["Show upcoming events", "Who is in the IIC Team?"]
    };
  }

  if (containsAny(normQuery, ["project", "projects", "showcase", "exhibition", "prototype"])) {
    return {
      reply: `You can explore student innovations, winning hackathon prototypes, and incubated ventures in our **Initiatives & Projects** showcase!`,
      actions: [
        { label: "View Initiatives & Projects →", url: IIC_INFO.routes.about }
      ],
      suggestions: ["How to submit a project?", "Startup Pitch Day"]
    };
  }

  // 14. Membership / How to become a student coordinator
  if (containsAny(normQuery, ["member", "membership", "volunteer", "join team", "join council", "how to become coordinator"])) {
    return {
      reply: `### 🌟 How to Join the IIC Student Council\n\n1. **Annual Recruitment Drive:** IIC recruits student innovation ambassadors at the beginning of each academic year.\n2. **Tracks Available:** Technical Development, Event Management, IPR & Documentation, Social Media & PR, Startup Outreach.\n3. **Selection Process:** Fill the online volunteer application, followed by an interactive interview with faculty coordinators.\n4. **Perks:** Official Certificate from Ministry of Education Innovation Cell, leadership credentials, and priority lab access!`,
      actions: [
        { label: "View Core Committee →", url: IIC_INFO.routes.team },
        { label: "Contact Coordinators →", url: "#footer" }
      ],
      suggestions: ["Who is the student coordinator?", "Upcoming events"]
    };
  }

  // 15. FAQ Matcher
  for (const faq of IIC_FAQS) {
    if (containsAny(normQuery, faq.keywords)) {
      return {
        reply: faq.answer,
        actions: faq.action ? [faq.action] : undefined,
        suggestions: ["Show upcoming events", "How to Register?", "Contact IIC Team"]
      };
    }
  }

  // 16. Fallback / Safe unknown question handler (ZERO Hallucination)
  return {
    reply: `I don't have that specific information in the verified IIC records yet.\n\nTo ensure you get 100% accurate details, please reach out to the **IIC Team** directly at **\`${IIC_INFO.contactEmail}\`** or visit the **Centre for Innovation (Room 204)**.\n\nWould you like to explore upcoming events or council activities in the meantime?`,
    actions: [
      { label: "Explore Events →", url: IIC_INFO.routes.events },
      { label: "Contact IIC Team →", url: "#footer" }
    ],
    suggestions: [
      "📅 Upcoming Events",
      "🚀 IIC Activities",
      "💡 Innovation Programs",
      "📝 How to Register?",
      "👥 IIC Team",
      "📞 Contact IIC"
    ]
  };
}
