"use client";
import { useEffect, useState } from "react";

type Entry = { id: number; topic: string; stage: string; notes: string | null; loggedAt: string };

export default function DrawingProgress() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

  const load = async () => {
    const res = await fetch("/api/drawing-progress", { headers: { "x-api-key": key } });
    setEntries(await res.json());
  };
  useEffect(() => { load(); }, []);

  const addEntry = async () => {
    await fetch("/api/skill-practice", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ skillType: "drawing", topic, stage: "apply", notes }),
    });
    setTopic(""); setNotes("");
    load();
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Drawing Progress</h1>

      <div className="card p-4 mb-6">
        <input className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm w-full mb-2" placeholder="What did you draw? (e.g. hands, perspective study)" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <textarea className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm w-full mb-2" rows={2} placeholder="Notes on what worked / what didn't" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button onClick={addEntry} className="btn-primary px-4 py-2 text-sm">Log Practice</button>
      </div>

      <div className="grid gap-2">
        {entries.map((e) => (
          <div key={e.id} className="card p-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">{e.topic}</span>
              <span className="text-text-secondary text-xs">{new Date(e.loggedAt).toLocaleDateString()}</span>
            </div>
            {e.notes && <p className="text-text-secondary text-xs mt-1">{e.notes}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
