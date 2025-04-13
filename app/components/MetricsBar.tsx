export default function MetricsBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Value Locked</h3>
        <p className="text-3xl font-bold text-white">$10</p>
        <p className="text-sm text-muted-foreground mt-1">+0% from last 24h</p>
      </div>
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Earned</h3>
        <p className="text-3xl font-bold text-white">$0</p>
        <p className="text-sm text-muted-foreground mt-1">+0% from last 24h</p>
      </div>
    </div>
  );
}