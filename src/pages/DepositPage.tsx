import { ArrowDownToLine, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const deposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setTxHash(`0x${Math.random().toString(16).slice(2, 66).padEnd(64, "0")}`);
      setLoading(false);
      toast.success(`Deposited ${amount} ETH to rollup!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-lg">
      <h1 className="text-2xl font-display font-bold">Deposit ETH to Rollup</h1>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-display flex items-center gap-2">
            <ArrowDownToLine className="h-4 w-4 text-primary" />
            L1 → L2 Deposit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Amount (ETH)</label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-xl bg-secondary border-0 text-lg font-display h-12"
            />
          </div>
          <Button
            onClick={deposit}
            disabled={loading}
            className="w-full rounded-xl h-12 text-base font-display"
          >
            {loading ? "Processing..." : "Deposit"}
          </Button>

          {txHash && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <div className="text-sm">
                <p className="font-medium text-success">Deposit successful!</p>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  {txHash.slice(0, 18)}...{txHash.slice(-8)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
