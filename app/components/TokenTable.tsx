import { Button } from '@/components/ui/button';

interface TokenTableProps {
  address: string | undefined;
  onWithdraw: (tokenName: string, tokenBalance: number) => void;
}

const positions = [
    {
        id: 1,
        token: 'AI16Z',
        balance: 10,
        earned: 0,
    }
]

export default function TokenTable({ onWithdraw, address }: TokenTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="bg-card rounded-xl border border-border">
        <div className="grid grid-cols-5 gap-4 p-4 text-sm text-muted-foreground border-b border-border">
          <div>Asset</div>
          <div className="text-right">Balance</div>
          <div className="text-right">Earned</div>
          <div className="text-right">APY</div>
          <div></div>
        </div>
        {address == '0x2C687B3a0693f9Aa203abc1FBCc59B096f7fd722' ? positions.map((position) => (
          <div
            key={position.id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-secondary/40 transition-colors"
          >
            <div className="text-left">{position.token}</div>
            <div className="text-right">${position.balance}</div>
            <div className="text-right">${position.earned}</div>
            <div className="text-right text-primary">{position.earned / position.balance * 100}%</div>
            <div className="flex justify-end">
              <Button
                onClick={() => onWithdraw(position.token, position.balance)}
                variant="secondary"
                size="sm"
              >
                Withdraw
              </Button>
            </div>
          </div>
        )) :  <div></div>}
      </div>
    </div>
  );
}