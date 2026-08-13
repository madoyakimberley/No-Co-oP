"use client";
import { useEffect, useState } from "react";

type Subject = { id: number; name: string; currentGrade: string | null };

export default function StudyHub() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const key = process.env.NEXT_PUBLIC_APP_SECRET || "";

  const load = async () => {
    const res = await fetch("/api/subjects", { headers: { "x-api-key": key } });
    setSubjects(await res.json());
  };
  useEffect(() => { load(); }, []);

  const addSubject = async () => {
    await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ name, currentGrade: grade }),
    });
    setName(""); setGrade("");
    load();
  };

  const runSelfCheck = async () => {
    setLoading(true);
    const res = await fetch("/api/self-check", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ topic, notes }),
    });
    const data = await res.json();
    setQuestions(data.questions);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <h1 className="text-2xl font-semibold mb-4">Study Hub</h1>

      <div className="card p-4 mb-6">
        <p className="text-sm text-text-secondary mb-3">SUBJECT RANKS</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {subjects.map((s) => (
            <div key={s.id} className="card px-3 py-2 text-sm">
              {s.name}: <span className="text-primary">{s.currentGrade || "—"}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm" placeholder="Subject" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm w-20" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
          <button onClick={addSubject} className="btn-secondary px-4 py-2 text-sm">Add</button>
        </div>
      </div>

      <div className="card p-4">
        <p className="text-sm text-text-secondary mb-3">UNDERSTAND CHECK</p>
        <input className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm w-full mb-2" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <textarea className="bg-surface-lowest border border-border rounded-card px-3 py-2 text-sm w-full mb-2" rows={4} placeholder="Paste your notes/summary here" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button onClick={runSelfCheck} disabled={loading} className="btn-primary px-4 py-2 text-sm">
          {loading ? "Generating..." : "Test My Understanding"}
        </button>
        {questions && <div className="card mt-3 p-3 text-sm whitespace-pre-wrap">{questions}</div>}
      </div>
    </main>
  );
}
