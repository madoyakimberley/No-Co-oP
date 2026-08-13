"use client";
import { useEffect, useState } from "react";

type Skill = {
  id: number;
  skillType: string;
  topic: string;
  stage: string;
  passed: boolean | null;
  notes: string | null;
};

export default function SkillTracker() {
  const [rows, setRows] = useState<Skill[]>([]);
  const [skillType, setSkillType] = useState("coding");
  const [topic, setTopic] = useState("");
  const [stage, setStage] = useState("learn");

  const load = async () => {
    const res = await fetch("/api/skill-practice", { headers: { "x-api-key": process.env.NEXT_PUBLIC_APP_SECRET || "" } });
    setRows(await res.json());
  };

  useEffect(() => { load(); }, []);

  const addEntry = async () => {
    await fetch("/api/skill-practice", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_APP_SECRET || "" },
      body: JSON.stringify({ skillType, topic, stage }),
    });
    setTopic("");
    load();
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Skill Tree</h1>

      <div className="card p-4 mb-6 flex flex-wrap gap-2">
        <select className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm" value={skillType} onChange={(e) => setSkillType(e.target.value)}>
          <option value="coding">Coding</option>
          <option value="drawing">Drawing</option>
        </select>
        <input className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <select className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm" value={stage} onChange={(e) => setStage(e.target.value)}>
          {["learn","apply","test","drill"].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={addEntry} className="btn-primary px-4 py-2 text-sm">Log</button>
      </div>

      <div className="grid gap-2">
        {rows.map((r) => (
          <div key={r.id} className="card p-3 flex justify-between text-sm">
            <span>{r.topic} <span className="text-text-secondary">({r.skillType})</span></span>
            <span className="text-tertiary">{r.stage}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
