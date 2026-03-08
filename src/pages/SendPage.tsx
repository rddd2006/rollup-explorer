import { Send, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function SendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendTx = () => {
    if (!to || !amount) {
      toast.error("Fill all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Gasless transaction signed & sent!");
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-lg">
      <h1 className="text-2xl font-display font-bold">Send Gasless Transaction</h1>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" />
            EIP-712 Signed Transaction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Recipient Address</label>
            <Input
              placeholder="0x..."
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-xl bg-secondary border-0 font-mono text-sm h-11"
            />
          </div>
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
          <div className="p-3 rounded-xl bg-accent text-xs text-accent-foreground">
            ✨ This transaction is gasless — signed via EIP-712 and relayed by the sequencer.
          </div>
          <Button
            onClick={sendTx}
            disabled={loading}
            className="w-full rounded-xl h-12 text-base font-display"
          >
            {loading ? "Signing..." : "Sign & Send"}
          </Button>

          {sent && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-sm font-medium text-success">Transaction submitted to relayer!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
