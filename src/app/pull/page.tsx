"use client";
import { useState } from "react";
import { fireAlarm, requestNotificationPermission } from "@/lib/notifications";

export default function PullMe() {
  const [suggestion, setSuggestion] = useState("");
  const [category, setCategory] = useState("coding");
  const [loading, setLoading] = useState(false);
  const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

  const getPull = async (cat: string) => {
    setLoading(true);
    setCategory(cat);
    const res = await fetch("/api/content-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ category: cat }),
    });
    const data = await res.json();
    setSuggestion(data.suggestion);
    setLoading(false);

    const granted = await requestNotificationPermission();
    if (granted) {
      fireAlarm(`Time for ${cat}`, data.suggestion);
    }
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Pull Me Back</h1>
      <p className="text-text-secondary text-sm mb-4">Get a nudge toward your hobbies — coding, art, or gaming.</p>

      <div className="flex gap-2 mb-6">
        {["coding","art","gaming"].map((c) => (
          <button key={c} onClick={() => getPull(c)} className="btn-secondary px-4 py-2 text-sm capitalize">{c}</button>
        ))}
      </div>

      {loading && <p className="text-text-secondary text-sm">Finding something for you...</p>}
      {suggestion && (
        <div className="card p-4 text-sm">
          <p className="text-primary text-xs uppercase mb-2">{category}</p>
          <p>{suggestion}</p>
        </div>
      )}
    </main>
  );
}
