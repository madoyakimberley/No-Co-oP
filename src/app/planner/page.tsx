"use client";
import { useEffect, useState } from "react";

type Block = { id: number; label: string; dayOfWeek: string; startTime: string; endTime: string; category: string };

const days = ["mon","tue","wed","thu","fri","sat","sun"];

export default function WeeklyPlanner() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    fetch("/api/routine-blocks", { headers: { "x-api-key": process.env.NEXT_PUBLIC_APP_SECRET || "" } })
      .then((r) => r.json()).then(setBlocks);
  }, []);

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Weekly Planner</h1>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <div key={d} className="card p-2">
            <p className="text-xs text-text-secondary uppercase mb-2">{d}</p>
            {blocks.filter((b) => b.dayOfWeek === d).map((b) => (
              <div key={b.id} className="text-xs bg-surface-lowest border border-border rounded p-1 mb-1">
                {b.label}<br />
                <span className="text-primary">{b.startTime}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
