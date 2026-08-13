"use client";
import { useState } from "react";

export default function Exam() {
  const [q, setQ] = useState<{ topicId: number; topicName: string; question: string } | null>(null);
  const [resources, setResources] = useState("");
  const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

  const getQuestion = async () => {
    const res = await fetch("/api/quiz", { headers: { "x-api-key": key } });
    const data = await res.json();
    if (data.error) { setQ(null); return; }
    setQ(data);
    setResources("");
  };

  const answer = async (correct: boolean) => {
    if (!q) return;
    await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ topicId: q.topicId, question: q.question, correct }),
    });
    if (!correct) {
      const res = await fetch("/api/study-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key },
        body: JSON.stringify({ topic: q.topicName }),
      });
      const data = await res.json();
      setResources(data.resources);
    } else {
      getQuestion();
    }
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Exam Drill</h1>
      <button onClick={getQuestion} className="btn-primary px-4 py-2 text-sm mb-4">Start Question</button>

      {q && (
        <div className="card p-4">
          <p className="text-primary text-xs uppercase mb-2">{q.topicName}</p>
          <p className="mb-4">{q.question}</p>
          <div className="flex gap-2">
            <button onClick={() => answer(true)} className="btn-secondary px-4 py-2 text-sm">Got it right</button>
            <button onClick={() => answer(false)} className="btn-secondary px-4 py-2 text-sm border-error text-error">Got it wrong</button>
          </div>
        </div>
      )}

      {resources && (
        <div className="card p-4 mt-4 text-sm whitespace-pre-wrap">
          <p className="text-tertiary text-xs uppercase mb-2">Go review this</p>
          {resources}
        </div>
      )}
    </main>
  );
}
