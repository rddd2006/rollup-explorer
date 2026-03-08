import { Wallet, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { useState } from "react";
import { toast } from "sonner";

export default function WalletPage() {
  const [connected, setConnected] = useState(false);
  const address = "0x1483...a347";
  const l1Balance = "2.4521";
  const l2Balance = "1.8734";
  const nonce = 14;

  const connectWallet = () => {
    setConnected(true);
    toast.success("Wallet connected!");
  };

  const copyAddress = () => {
    toast.success("Address copied!");
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-3xl">
      <h1 className="text-2xl font-display font-bold">Wallet</h1>

      {!connected ? (
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="p-4 rounded-2xl bg-accent">
              <Wallet className="h-10 w-10 text-accent-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Connect your wallet to interact with the rollup</p>
            <Button onClick={connectWallet} className="rounded-xl px-8">
              Connect MetaMask
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-display">Connected Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">0x</span>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-sm font-medium">{address}</p>
                  <p className="text-xs text-muted-foreground">Sepolia Testnet</p>
                </div>
                <Button variant="ghost" size="icon" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="L1 Balance" value={`${l1Balance} ETH`} icon={Wallet} />
            <StatCard title="L2 Balance" value={`${l2Balance} ETH`} icon={Wallet} trend={{ value: "0.12 ETH", positive: true }} />
            <StatCard title="L2 Nonce" value={nonce} icon={Wallet} />
          </div>
        </>
      )}
    </div>
  );
}
