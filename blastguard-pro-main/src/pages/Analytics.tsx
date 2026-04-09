import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Area, AreaChart } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Brain, Target, Award } from "lucide-react";

const featureImportance = [
  { feature: "Specific Charge", importance: 0.182 },
  { feature: "Slope Angle", importance: 0.156 },
  { feature: "RMR", importance: 0.143 },
  { feature: "Total Charge", importance: 0.112 },
  { feature: "Slope Height", importance: 0.098 },
  { feature: "Max Charge/Delay", importance: 0.087 },
  { feature: "Hole Depth", importance: 0.065 },
  { feature: "Burden", importance: 0.052 },
  { feature: "Spacing", importance: 0.041 },
  { feature: "No. of Rows", importance: 0.028 },
  { feature: "Stemming", importance: 0.021 },
  { feature: "Hole Diameter", importance: 0.015 },
].sort((a, b) => b.importance - a.importance);

const lossData = Array.from({ length: 50 }, (_, i) => ({
  epoch: i + 1,
  training: +(0.7 * Math.exp(-0.06 * i) + 0.05 + Math.sin(i * 0.3) * 0.01).toFixed(4),
  validation: +(0.75 * Math.exp(-0.05 * i) + 0.08 + Math.sin(i * 0.2) * 0.015).toFixed(4),
}));

const metrics = [
  { model: "LLM Ensemble", accuracy: 0.956, precision: 0.952, recall: 0.961, f1: 0.956, rocAuc: 0.981, best: true },
  { model: "XGBoost", accuracy: 0.943, precision: 0.938, recall: 0.951, f1: 0.944, rocAuc: 0.972, best: false },
  { model: "ANN (MLP)", accuracy: 0.921, precision: 0.915, recall: 0.929, f1: 0.922, rocAuc: 0.958, best: false },
  { model: "Random Forest", accuracy: 0.912, precision: 0.908, recall: 0.918, f1: 0.913, rocAuc: 0.949, best: false },
];

const summaryStats = [
  { icon: Target, label: "Best Accuracy", value: "95.6%", sub: "LLM Ensemble" },
  { icon: TrendingUp, label: "Best ROC-AUC", value: "98.1%", sub: "LLM Ensemble" },
  { icon: Brain, label: "Models Trained", value: "4", sub: "Classification" },
  { icon: Award, label: "Top Feature", value: "Specific Charge", sub: "18.2% importance" },
];

const Analytics = () => (
  <div className="max-w-6xl mx-auto space-y-6">
    <div className="opacity-0 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Model Analytics</h1>
      <p className="text-muted-foreground mt-1">ML model evaluation metrics and feature analysis</p>
    </div>

    {/* Summary stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {summaryStats.map((s, i) => (
        <Card key={s.label} className={`shadow-card stat-card-hover opacity-0 animate-fade-in-up stagger-${i + 1}`}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold text-foreground truncate">{s.value}</p>
              <p className="text-xs text-muted-foreground truncate">{s.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-card opacity-0 animate-fade-in-up stagger-5">
        <CardHeader>
          <CardTitle className="text-base">XGBoost Feature Importance</CardTitle>
          <CardDescription>Relative contribution of each blast parameter</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis type="category" dataKey="feature" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={105} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }}
                formatter={(val: number) => [`${(val * 100).toFixed(1)}%`, "Importance"]}
              />
              <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card opacity-0 animate-fade-in-up stagger-6">
        <CardHeader>
          <CardTitle className="text-base">ANN Training vs Validation Loss</CardTitle>
          <CardDescription>Loss convergence over 50 epochs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={lossData}>
              <defs>
                <linearGradient id="trainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="epoch" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} label={{ value: "Epoch", position: "insideBottom", offset: -5, fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} label={{ value: "Loss", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Legend />
              <Area type="monotone" dataKey="training" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#trainGrad)" name="Training Loss" />
              <Area type="monotone" dataKey="validation" stroke="hsl(var(--warning))" strokeWidth={2} fill="url(#valGrad)" name="Validation Loss" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    <Card className="shadow-card opacity-0 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-base">Model Performance Comparison</CardTitle>
        <CardDescription>Classification metrics across all trained models</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead className="text-right">Precision</TableHead>
                <TableHead className="text-right">Recall</TableHead>
                <TableHead className="text-right">F1-Score</TableHead>
                <TableHead className="text-right">ROC-AUC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((m) => (
                <TableRow key={m.model} className={m.best ? "bg-primary/5" : ""}>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-2">
                      {m.model}
                      {m.best && <Badge className="bg-primary/10 text-primary border-0 text-[10px] px-1.5">Best</Badge>}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{(m.accuracy * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right font-mono text-sm">{(m.precision * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right font-mono text-sm">{(m.recall * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right font-mono text-sm">{(m.f1 * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right font-mono text-sm">{(m.rocAuc * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Analytics;
