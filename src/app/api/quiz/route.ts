import { db } from "@/db";
import { topics, quizAttempts } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  // pick the weakest topic — lowest mastery surfaces first
  const [weakest] = await db.select().from(topics).orderBy(asc(topics.masteryLevel)).limit(1);
  if (!weakest) return NextResponse.json({ error: "No topics logged yet" }, { status: 404 });

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Ask one exam-style question testing real understanding of "${weakest.name}". Just the question, no answer.` }] }],
    }),
  });
  const data = await res.json();
  const question = data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate a question.";

  return NextResponse.json({ topicId: weakest.id, topicName: weakest.name, question });
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  const { topicId, question, correct } = await req.json();

  await db.insert(quizAttempts).values({ topicId, question, correct });

  const [topic] = await db.select().from(topics).where(eq(topics.id, topicId));
  const delta = correct ? 15 : -10;
  const newMastery = Math.max(0, Math.min(100, (topic?.masteryLevel || 0) + delta));
  await db.update(topics).set({ masteryLevel: newMastery }).where(eq(topics.id, topicId));

  return NextResponse.json({ success: true, newMastery });
}
