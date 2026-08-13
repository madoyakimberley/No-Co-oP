export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-text-primary p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">LVL 42 HERO</h1>
          <p className="text-text-secondary text-sm">Streak: 15 Days</p>
        </div>
        <div className="card px-4 py-2">
          <p className="text-xs text-text-secondary">COMMAND CENTER</p>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-text-secondary">STAKES METER</p>
          <span className="text-error text-xs">HIGH</span>
        </div>
        <div className="h-2 bg-surface-lowest rounded-full overflow-hidden">
          <div className="h-full bg-error w-3/4" />
        </div>
      </div>

      <div className="card p-4">
        <p className="text-sm text-text-secondary mb-3">TODAY'S GAUNTLET</p>
        <div className="border border-border rounded-card p-4">
          <p className="font-medium mb-1">Deep Work Sprint</p>
          <p className="text-xs text-text-secondary mb-3">Motivational text</p>
          <button className="btn-primary px-4 py-2 text-sm">
            COMMIT / TRY NOW
          </button>
        </div>
      </div>
    </main>
  );
}
