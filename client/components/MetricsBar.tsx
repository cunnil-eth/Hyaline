export default function MetricsBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Value Locked</h3>
        <p className="text-3xl font-bold text-white">$1,234,567,890</p>
        <p className="text-sm text-muted-foreground mt-1">+2.5% from last 24h</p>
      </div>
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Available</h3>
        <p className="text-3xl font-bold text-white">$890,123,456</p>
        <p className="text-sm text-muted-foreground mt-1">+1.8% from last 24h</p>
      </div>
    </div>
  );
}