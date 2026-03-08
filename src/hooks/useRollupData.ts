import { useState, useEffect, useCallback } from "react";

// Mock data for the rollup dashboard - replace with real API calls
export interface RollupStats {
  mempoolSize: number;
  lastBatchSize: number;
  batchGas: number;
  compressedBytes: number;
  uncompressedBytes: number;
  totalBatches: number;
  totalTx: number;
  avgGasPerTx: number;
}

export interface Batch {
  id: number;
  txRoot: string;
  stateRoot: string;
  blsSignature: string;
  timestamp: number;
  txCount: number;
  finalized: boolean;
  challengeDeadline: number;
}

export interface MempoolTx {
  from: string;
  to: string;
  amount: string;
  nonce: number;
  timestamp: number;
}

export interface TxHistory {
  hash: string;
  from: string;
  to: string;
  amount: string;
  nonce: number;
  status: "confirmed" | "pending" | "failed";
  batchId: number;
  timestamp: number;
}

const mockStats: RollupStats = {
  mempoolSize: 12,
  lastBatchSize: 8,
  batchGas: 94000,
  compressedBytes: 260,
  uncompressedBytes: 640,
  totalBatches: 47,
  totalTx: 312,
  avgGasPerTx: 2800,
};

const mockBatches: Batch[] = Array.from({ length: 12 }, (_, i) => ({
  id: 47 - i,
  txRoot: `0x${Math.random().toString(16).slice(2, 66).padEnd(64, "0")}`,
  stateRoot: `0x${Math.random().toString(16).slice(2, 66).padEnd(64, "0")}`,
  blsSignature: `0x${Math.random().toString(16).slice(2, 130).padEnd(128, "0")}`,
  timestamp: Date.now() - i * 300000,
  txCount: Math.floor(Math.random() * 15) + 1,
  finalized: i > 2,
  challengeDeadline: i <= 2 ? Date.now() + (3 - i) * 200000 : 0,
}));

const mockMempool: MempoolTx[] = Array.from({ length: 8 }, (_, i) => ({
  from: `0x${Math.random().toString(16).slice(2, 42).padEnd(40, "0")}`,
  to: `0x${Math.random().toString(16).slice(2, 42).padEnd(40, "0")}`,
  amount: (Math.random() * 2).toFixed(4),
  nonce: i + 1,
  timestamp: Date.now() - i * 15000,
}));

const mockHistory: TxHistory[] = Array.from({ length: 20 }, (_, i) => ({
  hash: `0x${Math.random().toString(16).slice(2, 66).padEnd(64, "0")}`,
  from: `0x${Math.random().toString(16).slice(2, 42).padEnd(40, "0")}`,
  to: `0x${Math.random().toString(16).slice(2, 42).padEnd(40, "0")}`,
  amount: (Math.random() * 5).toFixed(4),
  nonce: 20 - i,
  status: i === 0 ? "pending" : i === 7 ? "failed" : "confirmed",
  batchId: Math.max(1, 47 - Math.floor(i / 3)),
  timestamp: Date.now() - i * 180000,
}));

export function useRollupStats() {
  const [stats, setStats] = useState<RollupStats>(mockStats);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        ...mockStats,
        mempoolSize: Math.floor(Math.random() * 20) + 1,
        totalTx: mockStats.totalTx + Math.floor(Math.random() * 5),
      });
      setLoading(false);
    }, 600);
  }, []);

  return { stats, loading, refresh };
}

export function useBatches() {
  return { batches: mockBatches };
}

export function useMempool() {
  const [mempool] = useState(mockMempool);
  return { mempool };
}

export function useTxHistory() {
  return { history: mockHistory };
}
