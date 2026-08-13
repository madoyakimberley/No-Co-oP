import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { category } = await req.json(); // "coding" | "art" | "gaming"

  const creatorHints: Record<string, string> = {
    coding: "ThePrimeagen, Fireship, and similar high-energy coding YouTubers",
    art: "art YouTubers/artists similar in energy to a devoted art-focused creator she follows",
    gaming: "League of Legends or general gaming content creators",
  };

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Suggest one specific, real, currently active YouTube video or channel related to ${creatorHints[category]}, that would motivate a student to go practice ${category} right now. One or two sentences, casual tone, no fluff.` }] }],
    }),
  });
  const data = await res.json();
  const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't get a suggestion right now.";
  return NextResponse.json({ suggestion, category });
}
