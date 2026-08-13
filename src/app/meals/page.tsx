"use client";
import { useState } from "react";

export default function Meals() {
  const [mealType, setMealType] = useState("breakfast");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

  const getSuggestion = async () => {
    setLoading(true);
    const res = await fetch("/api/suggest-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ mealType }),
    });
    const data = await res.json();
    setSuggestion(data.suggestion);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Ideas</h1>
      <div className="card p-4">
        <select className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm mb-3" value={mealType} onChange={(e) => setMealType(e.target.value)}>
          {["breakfast","lunch","dinner","snack"].map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <button onClick={getSuggestion} disabled={loading} className="btn-primary px-4 py-2 text-sm block mb-3">
          {loading ? "Thinking..." : "Suggest a Meal"}
        </button>
        {suggestion && <div className="card p-3 text-sm whitespace-pre-wrap">{suggestion}</div>}
      </div>
    </main>
  );
}
