import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextType {
  connected: boolean;
  connectWallet: () => void;
  address: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const address = "0x1483...a347";

  const connectWallet = () => setConnected(true);

  return (
    <WalletContext.Provider value={{ connected, connectWallet, address }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
