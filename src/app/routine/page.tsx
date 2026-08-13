"use client";
import { useEffect, useState } from "react";

type RoutineBlock = {
  id: number;
  label: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  category: string;
};

const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

export default function Routine() {
  const [blocks, setBlocks] = useState<RoutineBlock[]>([]);
  const [label, setLabel] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("mon");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [category, setCategory] = useState("school");

  const load = async () => {
    const res = await fetch("/api/routine-blocks", { headers: { "x-api-key": key } });
    setBlocks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const addBlock = async () => {
    await fetch("/api/routine-blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ label, dayOfWeek, startTime, endTime, category, activeDuringSchool: true }),
    });
    setLabel("");
    load();
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Routine</h1>

      <div className="card p-4 mb-6 flex flex-wrap gap-2">
        <input
          className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm"
          placeholder="Block name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <select
          className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        >
          {["mon","tue","wed","thu","fri","sat","sun"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input type="time" className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <select
          className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {["school","coding","drawing","exercise","meal","sleep","freelance","other"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={addBlock} className="btn-primary px-4 py-2 text-sm">Add Block</button>
      </div>

      <div className="grid gap-2">
        {blocks.map((b) => (
          <div key={b.id} className="card p-3 flex justify-between text-sm">
            <span>{b.label}</span>
            <span className="text-text-secondary">{b.dayOfWeek} · {b.startTime}–{b.endTime} · {b.category}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
