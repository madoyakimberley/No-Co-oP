import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { db } from "@/db";
import { meals } from "@/db/schema";

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { mealType } = await req.json();

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Suggest one affordable, student-budget ${mealType} idea using common Kenyan ingredients (eggs, omena, groundnuts, sukuma wiki, ugali, rice — NOT beans, she dislikes beans). One sentence, plus a one-line breakdown of carbs/protein/vitamins.` }] }],
    }),
  });
  const data = await res.json();
  const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate a suggestion.";

  await db.insert(meals).values({ mealType, description: suggestion, suggestedByAi: true });
  return NextResponse.json({ suggestion });
}
