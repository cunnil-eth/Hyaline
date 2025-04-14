interface MetricsBarProps {
  main: boolean;
  address?: string | undefined;
}

export default function MetricsBar({main, address}: MetricsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Value Locked</h3>
        <p className="text-3xl font-bold text-white">{main ? '$10' : address == '0x2C687B3a0693f9Aa203abc1FBCc59B096f7fd722' ? '$10' : '$0'}</p>
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