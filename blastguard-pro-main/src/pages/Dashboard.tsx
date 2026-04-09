import { usePrediction } from "@/contexts/PredictionContext";
import { useAuth, ROLE_LABELS } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Activity, FileText, TrendingUp, BarChart3, Zap, Clock, Mountain, Brain, Shield, Layers, Play } from "lucide-react";
import SafetyClearanceBadge from "@/components/SafetyClearanceBadge";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import BlastVisualizer from "@/components/BlastVisualizer";
import heroVideoAsset from "@/assets/hero-bg-video.mp4.asset.json";
import heroSlope from "@/assets/hero-slope.jpg";

const RISK_STYLES = {
  Low: { color: "text-success", bg: "bg-success/10", border: "border-success/20", glow: "shadow-[0_0_20px_-5px_hsl(142_71%_40%/0.3)]" },
  Medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", glow: "shadow-[0_0_20px_-5px_hsl(38_92%_50%/0.3)]" },
  High: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", glow: "shadow-[0_0_20px_-5px_hsl(0_72%_51%/0.3)]" },
};

const GaugeChart = ({ probability }: { probability: number }) => {
  const pct = Math.round(probability * 100);
  const data = [{ value: pct }, { value: 100 - pct }];
  const color = pct < 30 ? "hsl(142 71% 40%)" : pct < 60 ? "hsl(38 92% 50%)" : "hsl(0 72% 51%)";
  return (
    <div className="relative w-44 h-44 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={72} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
            <Cell fill={color} />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{pct}%</span>
        <span className="text-xs text-muted-foreground">Failure Prob.</span>
      </div>
    </div>
  );
};

const QuickStatCard = ({ icon: Icon, label, value, sub, delay }: { icon: any; label: string; value: string; sub?: string; delay: string }) => (
  <Card className={`shadow-card stat-card-hover opacity-0 animate-fade-in-up ${delay}`}>
    <CardContent className="flex items-center gap-3 p-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
        {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
      </div>
    </CardContent>
  </Card>
);

const QUICK_ACTIONS = [
  { icon: Play, label: "New Prediction", desc: "Run blast analysis", path: "/input", color: "bg-primary/10 text-primary" },
  { icon: BarChart3, label: "Analytics", desc: "View model metrics", path: "/analytics", color: "bg-success/10 text-success" },
  { icon: Brain, label: "LLM Insights", desc: "AI recommendations", path: "/dashboard", color: "bg-warning/10 text-warning" },
];

const MODEL_INFO = [
  { model: "XGBoost", accuracy: "94.3%", status: "Active", icon: TrendingUp },
  { model: "ANN (MLP)", accuracy: "92.1%", status: "Active", icon: Brain },
  { model: "Random Forest", accuracy: "91.2%", status: "Active", icon: Layers },
  { model: "LLM Ensemble", accuracy: "95.6%", status: "Primary", icon: Shield },
];

const Dashboard = () => {
  const { latestResult, results } = usePrediction();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Empty state with rich dashboard
  if (!latestResult) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 relative">
        {/* Video Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl h-64 md:h-72 opacity-0 animate-fade-in">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster={heroSlope}>
            <source src={heroVideoAsset.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/35 to-foreground/15" />
          <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-center">
            <Badge className="mb-3 bg-primary/30 text-primary-foreground border-0 w-fit">Dashboard</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Welcome, {user?.name?.split(' ')[0] || 'Engineer'} 👋
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-xl mb-5">
              Your BISF prediction workspace is ready. Start by configuring blast parameters.
            </p>
            <Button onClick={() => navigate("/input")} className="gradient-primary hover:opacity-90 h-11 px-6 w-fit font-semibold">
              <Zap className="mr-2 w-4 h-4" /> New Prediction
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard icon={BarChart3} label="Total Predictions" value="0" sub="No runs yet" delay="stagger-1" />
          <QuickStatCard icon={TrendingUp} label="Best Model Accuracy" value="95.6%" sub="LLM Ensemble" delay="stagger-2" />
          <QuickStatCard icon={Activity} label="System Status" value="Online" sub="All models ready" delay="stagger-3" />
          <QuickStatCard icon={Clock} label="Last Run" value="—" sub="No history" delay="stagger-4" />
        </div>

        {/* Quick Actions + Model Status */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="shadow-card opacity-0 animate-fade-in-up stagger-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {QUICK_ACTIONS.map((a) => (
                <button key={a.label} onClick={() => navigate(a.path)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors text-left group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                    <a.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Model Status */}
          <Card className="shadow-card md:col-span-2 opacity-0 animate-fade-in-up stagger-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" /> Model Status
              </CardTitle>
              <CardDescription>All prediction models and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {MODEL_INFO.map((m) => (
                  <div key={m.model} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <m.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{m.model}</p>
                        <p className="text-xs text-muted-foreground">Accuracy: {m.accuracy}</p>
                      </div>
                    </div>
                    <Badge variant={m.status === "Primary" ? "default" : "secondary"} className={`text-[10px] ${m.status === "Primary" ? "gradient-primary text-primary-foreground border-0" : ""}`}>
                      {m.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Info Card */}
        <Card className="shadow-card opacity-0 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mountain className="w-4 h-4 text-primary" /> About This Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-xl p-5 text-sm leading-relaxed text-muted-foreground border border-border/50">
              <p className="mb-3">
                The <span className="font-semibold text-foreground">BISF Prediction System</span> is an engineering research 
                platform for predicting blast-induced slope failures during railway corridor reconstruction in mountainous terrain.
              </p>
              <p className="mb-3">
                Using a novel <span className="font-semibold text-foreground">LLM-driven ensemble approach</span>, it combines 
                XGBoost, ANN, and Random Forest models with GPT-4 reasoning to analyze 12 critical blast design and slope parameters.
              </p>
              <p>
                The system provides binary failure/no-failure predictions, probability scores, risk level assessments, and 
                actionable engineering recommendations for blast design optimization.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const r = latestResult;
  const styles = RISK_STYLES[r.riskLevel];

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Results header with video */}
      <div className="relative overflow-hidden rounded-2xl h-40 opacity-0 animate-fade-in">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster={heroSlope}>
          <source src={heroVideoAsset.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
        <div className="relative z-10 p-8 h-full flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Prediction Results</h1>
            <p className="text-primary-foreground/60 mt-1">Analysis from {new Date(r.timestamp).toLocaleString()}</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/input")} className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
            <Zap className="mr-2 w-4 h-4" /> New Run
          </Button>
        </div>
      </div>

      {/* SAFETY CLEARANCE — Most prominent element */}
      <SafetyClearanceBadge result={r} />

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard icon={BarChart3} label="Total Predictions" value={String(results.length)} delay="stagger-1" />
        <QuickStatCard icon={TrendingUp} label="Failure Rate" value={`${Math.round((results.filter(r => r.prediction === 1).length / results.length) * 100)}%`} delay="stagger-2" />
        <QuickStatCard icon={Activity} label="Avg Probability" value={`${Math.round((results.reduce((a, r) => a + r.probability, 0) / results.length) * 100)}%`} delay="stagger-3" />
        <QuickStatCard icon={Clock} label="Last Run" value={new Date(r.timestamp).toLocaleTimeString()} delay="stagger-4" />
      </div>

      {/* Main result cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`shadow-card stat-card-hover border ${r.prediction === 1 ? "border-destructive/20" : "border-success/20"} ${r.prediction === 1 ? RISK_STYLES.High.glow : RISK_STYLES.Low.glow} opacity-0 animate-scale-in stagger-1`}>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider">Unified Prediction</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${r.prediction === 1 ? "bg-destructive/10" : "bg-success/10"}`}>
              {r.prediction === 1 ? <XCircle className="w-7 h-7 text-destructive" /> : <CheckCircle2 className="w-7 h-7 text-success" />}
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{r.prediction === 1 ? "Failure (1)" : "No Failure (0)"}</p>
              <p className="text-xs text-muted-foreground">Binary classification</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card stat-card-hover opacity-0 animate-scale-in stagger-2">
          <CardHeader className="pb-0">
            <CardDescription className="text-xs uppercase tracking-wider">Failure Probability</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <GaugeChart probability={r.probability} />
          </CardContent>
        </Card>

        <Card className={`shadow-card stat-card-hover border ${styles.border} ${styles.glow} opacity-0 animate-scale-in stagger-3`}>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider">Risk Assessment</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-3 pt-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${styles.bg}`}>
              <AlertTriangle className={`w-7 h-7 ${styles.color}`} />
            </div>
            <Badge className={`${styles.bg} ${styles.color} border-0 text-sm px-4 py-1.5 font-semibold`}>
              {r.riskLevel} Risk
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* LLM Recommendations */}
      <Card className="shadow-card opacity-0 animate-fade-in-up stagger-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Engineering Recommendations</CardTitle>
              <CardDescription>LLM-generated blast design optimization advice</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-xl p-5 text-sm leading-relaxed text-foreground border border-border/50">
            {r.recommendation}
          </div>
        </CardContent>
      </Card>

      {/* 3D Blast Visualizer */}
      <BlastVisualizer parameters={r.parameters} />

      {/* Parameter Summary + History */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Parameters used */}
        <Card className="shadow-card opacity-0 animate-fade-in-up stagger-5">
          <CardHeader>
            <CardTitle className="text-base">Input Parameters Used</CardTitle>
            <CardDescription>Blast configuration for this prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(r.parameters).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1.5 px-3 rounded-lg bg-muted/30 text-sm">
                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium text-foreground">{val as number}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="shadow-card opacity-0 animate-fade-in-up stagger-6">
          <CardHeader>
            <CardTitle className="text-base">Prediction History</CardTitle>
            <CardDescription>Last {Math.min(results.length, 8)} runs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.slice(0, 8).map((res, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors text-sm border border-transparent hover:border-border/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${res.prediction === 1 ? "bg-destructive" : "bg-success"}`} />
                    <span className="text-muted-foreground text-xs">{new Date(res.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={res.prediction === 1 ? "destructive" : "secondary"} className="text-[10px]">
                      {res.prediction === 1 ? "Fail" : "Safe"}
                    </Badge>
                    <span className="font-semibold text-foreground text-xs w-8 text-right">{Math.round(res.probability * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
