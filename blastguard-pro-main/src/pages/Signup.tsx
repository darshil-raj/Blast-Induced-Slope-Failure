import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole, ROLE_LABELS } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertCircle, Users, Lock } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import bisfLogo from "@/assets/bisf-logo.png";

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  geotechnical_engineer: "Input access — configure blast parameters",
  railway_safety_manager: "Output access — view predictions & reports",
  project_guide: "Read-only — review all sections",
  developer: "Full access — all features & settings",
};

const ROLE_ICONS: Record<UserRole, string> = {
  geotechnical_engineer: "⛏️",
  railway_safety_manager: "🛤️",
  project_guide: "📋",
  developer: "💻",
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { setError("Please select a role"); return; }
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password, role as UserRole);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex gradient-auth overflow-hidden relative">
      <AnimatedBackground variant="mesh" />

      {/* Left branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, hsl(213 94% 56%) 0%, transparent 50%), radial-gradient(circle at 70% 70%, hsl(213 94% 44%) 0%, transparent 40%)`
        }} />
        <div className="relative z-10 max-w-lg text-center space-y-8 animate-fade-in">
          <img src={bisfLogo} alt="BISF Logo" className="w-40 h-40 object-contain animate-float drop-shadow-lg" />
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">Join the Research<br />Platform</h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Collaborate on blast-induced slope failure analysis with role-based access control.
          </p>
          <div className="grid grid-cols-2 gap-3 opacity-0 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 text-primary-foreground/80 text-sm">
              <Users className="w-4 h-4" /> 4 Access Roles
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 text-primary-foreground/80 text-sm">
              <Lock className="w-4 h-4" /> Secure RBAC
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-3 opacity-0 animate-fade-in">
            <div className="lg:hidden inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-primary shadow-glow-primary mb-2">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground text-sm">Select your role to get started</p>
          </div>

          <Card className="glass-card shadow-elevated opacity-0 animate-scale-in stagger-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Sign Up</CardTitle>
              <CardDescription>Choose your role based on the authorization matrix</CardDescription>
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Dr. Jane Smith" value={name} onChange={(e) => setName(e.target.value)} required className="input-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="input-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                    <SelectTrigger className="input-enhanced">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                        <SelectItem key={r} value={r}>
                          <span className="flex items-center gap-2">
                            <span>{ROLE_ICONS[r]}</span>
                            <span>
                              <span className="font-medium">{ROLE_LABELS[r]}</span>
                              <span className="text-xs text-muted-foreground ml-2">— {ROLE_DESCRIPTIONS[r]}</span>
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full h-11 text-sm font-semibold gradient-primary hover:opacity-90 transition-opacity" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-5">
                Already registered?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
