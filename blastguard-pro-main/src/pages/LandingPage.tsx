import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mountain, ArrowRight, Shield, Brain, BarChart3, Users, Zap, ChevronRight,
  Target, Layers, BookOpen, FlaskConical, Train, AlertTriangle
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import heroSlope from "@/assets/hero-slope.jpg";
import blastAction from "@/assets/blast-action.jpg";
import researchTeam from "@/assets/research-team.jpg";
import heroVideoAsset from "@/assets/hero-bg-video.mp4.asset.json";

const FEATURES = [
  { icon: Brain, title: "LLM-Driven Prediction", desc: "GPT-4 enhanced ensemble models combining XGBoost, ANN, and Random Forest for superior accuracy." },
  { icon: BarChart3, title: "12-Parameter Analysis", desc: "Comprehensive blast design evaluation covering geometry, charge design, slope parameters, and rock mass." },
  { icon: Shield, title: "Risk Assessment", desc: "Real-time binary classification with probability scoring and multi-level risk categorization." },
  { icon: Zap, title: "Instant Results", desc: "Sub-second predictions with engineering recommendations for blast design optimization." },
  { icon: Users, title: "Role-Based Access", desc: "Secure RBAC with 4 specialized roles: Engineers, Safety Managers, Reviewers, and Developers." },
  { icon: Target, title: "95.6% Accuracy", desc: "State-of-the-art LLM Ensemble model achieving top-tier classification performance on BISF datasets." },
];

const RESEARCH_HIGHLIGHTS = [
  { title: "XGBoost Feature Importance Analysis", desc: "Identified specific charge and slope angle as the two most critical parameters influencing blast-induced slope failure.", tag: "ML Research", date: "2026" },
  { title: "ANN Architecture Optimization", desc: "Multi-layer perceptron with optimized hyperparameters achieving 92.1% standalone accuracy on the validation set.", tag: "Deep Learning", date: "2026" },
  { title: "LLM Ensemble Integration", desc: "Novel approach combining traditional ML models with large language model reasoning for 95.6% ensemble accuracy.", tag: "Innovation", date: "2026" },
  { title: "Railway Safety Standards Compliance", desc: "Prediction framework aligned with international railway geotechnical safety standards and blast damage control protocols.", tag: "Safety", date: "2025" },
];

const STATS = [
  { value: "95.6%", label: "Model Accuracy" },
  { value: "98.1%", label: "ROC-AUC Score" },
  { value: "12", label: "Input Parameters" },
  { value: "4", label: "ML Models" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={heroSlope}
          >
            <source src={heroVideoAsset.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/20 to-background/20" />
        </div>

        <AnimatedBackground variant="mesh" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 px-4 py-1.5 text-sm opacity-0 animate-fade-in">
            <FlaskConical className="w-3.5 h-3.5 mr-1.5" /> Engineering Research Platform
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in-up stagger-1">
            LLM-Driven Prediction of
            <span className="block text-gradient mt-2">Blast-Induced Slope Failure</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-3xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-in-up stagger-2">
            An advanced AI-powered research platform for predicting and analyzing blast-induced slope failures 
            in railway corridor reconstruction. Combining XGBoost, ANN, and Large Language Models for 
            unprecedented prediction accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up stagger-3">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary hover:opacity-90 h-12 px-8 text-base font-semibold gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto opacity-0 animate-fade-in-up stagger-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs text-primary-foreground/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-fade-in stagger-5">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-float" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 relative">
        <AnimatedBackground variant="grid" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary/30">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" /> About the Research
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Safe Railway Slope Reconstruction Through AI
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Blast-Induced Slope Failure (BISF) is a critical geotechnical hazard during railway corridor 
                construction in mountainous terrain. Traditional empirical methods often fail to predict failures 
                accurately due to the complex interplay of blast design parameters, rock mass properties, and 
                slope geometry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This research introduces a novel <span className="text-foreground font-semibold">LLM-driven ensemble approach</span> that 
                combines XGBoost gradient boosting, Artificial Neural Networks, and Large Language Model reasoning 
                to achieve a <span className="text-foreground font-semibold">95.6% prediction accuracy</span> — 
                significantly outperforming any standalone ML model.
              </p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-lg text-sm font-medium">
                  <Train className="w-4 h-4" /> Railway Safety
                </div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                  <Brain className="w-4 h-4" /> AI/ML Powered
                </div>
                <div className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-1.5 rounded-lg text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" /> Risk Prediction
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={blastAction} alt="Controlled rock blasting near railway" className="rounded-xl shadow-elevated w-full h-48 object-cover" loading="lazy" />
              <img src={researchTeam} alt="Engineering team reviewing data" className="rounded-xl shadow-elevated w-full h-48 object-cover mt-8" loading="lazy" />
              <img src={heroSlope} alt="Railway slope reconstruction site" className="rounded-xl shadow-elevated w-full h-48 object-cover col-span-2" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <Layers className="w-3.5 h-3.5 mr-1.5" /> Platform Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need for BISF Analysis
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              A comprehensive research platform designed for geotechnical engineers, safety managers, and reviewers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Card key={f.title} className="shadow-card stat-card-hover bg-card/80 border-border/50 group">
                <CardContent className="p-6 space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-20 px-6 relative">
        <AnimatedBackground variant="particles" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <FlaskConical className="w-3.5 h-3.5 mr-1.5" /> Research Updates
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Latest Research Highlights
            </h2>
            <p className="text-muted-foreground mt-3">Key findings and breakthroughs from our ongoing research.</p>
          </div>
          <div className="space-y-4">
            {RESEARCH_HIGHLIGHTS.map((r, i) => (
              <Card key={i} className="shadow-card stat-card-hover bg-card/80 border-border/50 group cursor-pointer">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <FlaskConical className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-[10px] px-2">{r.tag}</Badge>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-1 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, hsl(213 94% 56%) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(213 94% 44%) 0%, transparent 40%)`
        }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Predicting?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            Join the platform and start analyzing blast-induced slope failure risks with cutting-edge AI models.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 h-12 px-8 font-semibold gap-2">
                Create Account <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t bg-card/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <Mountain className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">BISF Prediction Platform</span>
          </div>
          <p>© 2026 Railway Slope Safety Research. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
