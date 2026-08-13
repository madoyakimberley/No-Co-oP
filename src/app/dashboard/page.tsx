"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [exerciseCount, setExerciseCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

  useEffect(() => {
    fetch("/api/exercise-logs", { headers: { "x-api-key": key } }).then((r) => r.json()).then((d) => setExerciseCount(d.length));
    fetch("/api/skill-practice", { headers: { "x-api-key": key } }).then((r) => r.json()).then((d) => setSkillCount(d.length));
  }, []);

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">LVL 42 HERO</h1>
          <p className="text-text-secondary text-sm">{exerciseCount} workouts logged</p>
        </div>
        <div className="card px-4 py-2">
          <p className="text-xs text-text-secondary">COMMAND CENTER</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4">
          <p className="text-sm text-text-secondary mb-1">Skill Reps</p>
          <p className="text-3xl text-primary">{skillCount}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-text-secondary mb-1">Workouts</p>
          <p className="text-3xl text-tertiary">{exerciseCount}</p>
        </div>
      </div>
    </main>
  );
}
