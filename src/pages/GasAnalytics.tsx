import { BarChart3, Fuel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";

const gasComparison = [
  { name: "L1 Transfer", gas: 21000 },
  { name: "Rollup TX", gas: 2800 },
];

const batchData = [
  { size: 1, gas: 94000 },
  { size: 2, gas: 47000 },
  { size: 5, gas: 18800 },
  { size: 10, gas: 9400 },
  { size: 20, gas: 4700 },
  { size: 50, gas: 1880 },
];

const compressionData = [
  { name: "Uncompressed", value: 640 },
  { name: "Compressed", value: 260 },
];

const COLORS = ["hsl(38, 92%, 55%)", "hsl(152, 60%, 42%)"];

const networkGas = [
  { label: "Safe", gwei: 12 },
  { label: "Standard", gwei: 18 },
  { label: "Fast", gwei: 25 },
];

export default function GasAnalytics() {
  return (
    <div className="space-y-6 animate-slide-up">
      <h1 className="text-2xl font-display font-bold">Gas Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="L1 Gas (Transfer)" value="21,000" icon={Fuel} />
        <StatCard title="Rollup Gas (Avg)" value="2,800" icon={Fuel} trend={{ value: "86%", positive: true }} />
        <StatCard title="Network Gas" value="18 Gwei" subtitle="Standard" icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Gas per Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gasComparison} barCategoryGap="40%">
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 16% 90%)", fontSize: "13px" }} />
                <Bar dataKey="gas" radius={[8, 8, 0, 0]}>
                  <Cell fill="hsl(0, 72%, 55%)" />
                  <Cell fill="hsl(152, 60%, 42%)" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Batch Size vs Gas/TX</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={batchData}>
                <defs>
                  <linearGradient id="batchGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="size" tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 16% 90%)", fontSize: "13px" }} />
                <Area type="monotone" dataKey="gas" stroke="hsl(210, 80%, 55%)" strokeWidth={2} fill="url(#batchGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Calldata Compression</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={compressionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}B`}
                >
                  {compressionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 16% 90%)", fontSize: "13px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Network Gas Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 py-4">
              {networkGas.map((g) => (
                <div key={g.label} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-20">{g.label}</span>
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(g.gwei / 30) * 100}%`,
                        background: "var(--gradient-primary)",
                      }}
                    />
                  </div>
                  <span className="text-sm font-display font-bold w-16 text-right">{g.gwei} Gwei</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-accent text-sm">
              <p className="text-accent-foreground">
                Estimated L1 tx cost: <strong>~$0.42</strong> | Rollup tx cost: <strong>~$0.06</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
