import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { IIC_EVENTS, IIC_TEAM_FALLBACK, IIC_INFO, IICEvent, IICTeamMember } from "@/lib/knowledgeBase";
import { processIICMessage, ChatMessage, ChatResponse } from "@/lib/chatEngine";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json(
        { error: "A valid message string is required." },
        { status: 400 }
      );
    }

    const message = body.message.trim();
    const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];

    // Length limit
    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message exceeds maximum allowed length of 1000 characters." },
        { status: 400 }
      );
    }

    // 1. Fetch live data from Supabase if configured
    let dynamicTeam: IICTeamMember[] = IIC_TEAM_FALLBACK;
    const hasRealSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
    
    if (hasRealSupabase) {
      try {
        const { data: teamData, error: teamError } = await supabase
          .from("iic_team")
          .select("*")
          .order("priority", { ascending: true });

        if (!teamError && teamData && teamData.length > 0) {
          dynamicTeam = teamData.map((m) => ({
            id: m.id || String(m.name),
            name: m.name,
            role: m.role,
            department: m.department || m.description || "IIC Core Committee",
            description: m.description,
            image_url: m.image_url,
            category: "student"
          }));
        }
      } catch {
        // Graceful fallback to static verified roster
      }
    }

    // 2. Check for LLM API Key (e.g. GEMINI_API_KEY, AI_API_KEY, OPENAI_API_KEY)
    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const llmResult = await callLLM(message, history, IIC_EVENTS, dynamicTeam, apiKey);
        if (llmResult) {
          return NextResponse.json(llmResult);
        }
      } catch (err) {
        console.error("LLM API call error, falling back to internal engine:", err);
      }
    }

    // 3. Built-in high-accuracy NLP Engine (instant zero-latency & zero external dependencies)
    const result: ChatResponse = processIICMessage(message, history, IIC_EVENTS, dynamicTeam);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        reply: "I encountered a brief connection issue. Please try again or contact the IIC team at iic@institution.edu.in.",
        actions: [{ label: "Contact IIC Team →", url: IIC_INFO.routes.contact }]
      },
      { status: 500 }
    );
  }
}

/**
 * Direct LLM Integration helper if API Key is configured in environment
 */
async function callLLM(
  message: string,
  history: ChatMessage[],
  events: IICEvent[],
  team: IICTeamMember[],
  apiKey: string
): Promise<ChatResponse | null> {
  const isGemini = apiKey.startsWith("AIza") || process.env.GEMINI_API_KEY;

  const systemContext = `
You are the "IIC Assistant", an official AI guide for the Institution's Innovation Council (IIC), established under the Ministry of Education (MoE) Innovation Cell, Govt. of India.

STRICT GROUND RULES:
1. ONLY provide facts present in the verified context below.
2. NEVER invent dates, event names, contact numbers, email addresses, registration links, or team members.
3. If information is not available in the context, respond: "I don't have that information yet. Please contact the IIC team for the latest details."
4. For questions unrelated to IIC, politely respond: "I’m the IIC Assistant, so I’m mainly here to help with IIC, innovation, entrepreneurship, events, and related activities. What would you like to know about IIC?"
5. Keep answers concise, student-friendly, formatting with bold text, bullet points, and numbered steps.

VERIFIED IIC CONTEXT:
- Organization: ${IIC_INFO.name} (${IIC_INFO.fullName})
- Motto: ${IIC_INFO.motto} | Rating: ${IIC_INFO.starRating}
- Office: ${IIC_INFO.location}
- Email: ${IIC_INFO.contactEmail} | Phone: ${IIC_INFO.contactPhone}
- Events:
${events.map(e => `* Event: ${e.title} | Date: ${e.date} (${e.time}) | Venue: ${e.venue} | Category: ${e.tag} | Eligibility: ${e.eligibility} | Reg Status: ${e.registrationStatus} | Prizes: ${e.prizePool || "None"} | Reg Steps: ${e.stepsToRegister.join("; ")}`).join("\n")}
- Team Leadership:
${team.map(t => `* ${t.name} - ${t.role} (${t.department || ""})`).join("\n")}
`;

  if (isGemini) {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const contents = [
      {
        role: "user",
        parts: [{ text: `${systemContext}\n\nUser Query: ${message}` }]
      }
    ];

    const res = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents, generationConfig: { temperature: 0.2, maxOutputTokens: 500 } })
    });

    if (!res.ok) return null;
    const json = await res.json();
    const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText) {
      // Determine if any event cards should be attached
      const relevantEvents = events.filter(e => candidateText.toLowerCase().includes(e.title.toLowerCase()));
      return {
        reply: candidateText,
        events: relevantEvents.length > 0 ? relevantEvents : undefined,
        actions: [{ label: "Explore Events →", url: IIC_INFO.routes.events }],
        suggestions: ["📅 Upcoming Events", "📝 How to Register?", "👥 IIC Team", "📞 Contact IIC"]
      };
    }
  }

  return null;
}
