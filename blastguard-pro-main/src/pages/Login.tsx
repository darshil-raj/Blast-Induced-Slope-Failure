import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertCircle, Accessibility, Activity, Cpu } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import loginHero from "@/assets/login-hero.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex gradient-auth overflow-hidden relative">
      {/* Animated grid background */}
      <AnimatedBackground variant="mesh" />
      
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <img src={loginHero} alt="Controlled rock blasting at railway construction site" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/20" />
        <div className="relative z-10 max-w-lg text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary shadow-glow-primary animate-float rounded-full shadow-md opacity-0">
            <Accessibility className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight drop-shadow-lg">
            LLM-Driven Slope<br />Failure Prediction
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed drop-shadow-md">
            Advanced AI-powered blast analysis for safe railway slope reconstruction. Predict, analyze, and optimize.
          </p>
          <div className="flex gap-4 justify-center opacity-0 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 bg-background/30 backdrop-blur-md rounded-lg px-4 py-2 text-primary-foreground text-sm border border-primary-foreground/10">
              <Activity className="w-4 h-4" /> Real-time Analysis
            </div>
            <div className="flex items-center gap-2 bg-background/30 backdrop-blur-md rounded-lg px-4 py-2 text-primary-foreground text-sm border border-primary-foreground/10">
              <Cpu className="w-4 h-4" /> ML Engine v2.4
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3 opacity-0 animate-fade-in">
            <div className="lg:hidden inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-primary shadow-glow-primary mb-2">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">Sign in to the BISF Prediction Platform</p>
          </div>

          <Card className="glass-card shadow-elevated opacity-0 animate-scale-in stagger-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Sign In</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-enhanced" />
                </div>
                <Button type="submit" className="w-full h-11 text-sm font-semibold gradient-primary hover:opacity-90 transition-opacity" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-5">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">Create one</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
