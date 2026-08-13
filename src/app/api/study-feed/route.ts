import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  const { topic } = await req.json();

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Recommend 2 real, well-known learning resources (videos, docs, or courses) for a software engineering student studying "${topic}" — could be data structures, algorithms, robotics, or general CS growth. Name + one-line why, no links needed.` }] }],
    }),
  });
  const data = await res.json();
  const resources = data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't fetch resources.";
  return NextResponse.json({ resources });
}
