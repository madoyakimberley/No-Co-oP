import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { topic, notes } = await req.json();

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Based on this student's notes about "${topic}", write 3 short quiz questions to test if they actually understood it (not just memorized), and don't give the answers yet:\n\n${notes}` }] }],
    }),
  });
  const data = await res.json();
  const questions = data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate questions.";
  return NextResponse.json({ questions });
}
