import { Shield, CheckCircle2, AlertTriangle, XOctagon } from "lucide-react";
import type { PredictionResult } from "@/contexts/PredictionContext";

type SafetyStatus = "cleared" | "caution" | "danger";

interface SafetyClearanceConfig {
  status: SafetyStatus;
  label: string;
  description: string;
  icon: typeof Shield;
  bgClass: string;
  borderClass: string;
  textClass: string;
  glowClass: string;
  iconBgClass: string;
  pulseColor: string;
}

const SAFETY_CONFIG: Record<SafetyStatus, SafetyClearanceConfig> = {
  cleared: {
    status: "cleared",
    label: "Cleared for Blasting",
    description: "All parameters within safe operational limits. Proceed with standard blast protocol.",
    icon: CheckCircle2,
    bgClass: "bg-safety-cleared/5",
    borderClass: "border-safety-cleared/40",
    textClass: "text-safety-cleared",
    glowClass: "shadow-[0_0_40px_-8px_hsl(142_71%_40%/0.4)]",
    iconBgClass: "bg-safety-cleared/15",
    pulseColor: "bg-safety-cleared",
  },
  caution: {
    status: "caution",
    label: "Proceed with Caution",
    description: "Marginal parameters detected. Additional safety measures and on-site review recommended before blasting.",
    icon: AlertTriangle,
    bgClass: "bg-safety-caution/5",
    borderClass: "border-safety-caution/40",
    textClass: "text-safety-caution",
    glowClass: "shadow-[0_0_40px_-8px_hsl(38_92%_50%/0.4)]",
    iconBgClass: "bg-safety-caution/15",
    pulseColor: "bg-safety-caution",
  },
  danger: {
    status: "danger",
    label: "Do Not Blast — Reconfigure Parameters",
    description: "High failure probability detected. Blast design must be revised before any operation. Contact supervising engineer.",
    icon: XOctagon,
    bgClass: "bg-safety-danger/5",
    borderClass: "border-safety-danger/40",
    textClass: "text-safety-danger",
    glowClass: "shadow-[0_0_40px_-8px_hsl(0_72%_51%/0.4)]",
    iconBgClass: "bg-safety-danger/15",
    pulseColor: "bg-safety-danger",
  },
};

function determineSafetyStatus(result: PredictionResult): SafetyStatus {
  if (result.prediction === 0 && result.probability < 0.3) return "cleared";
  if (result.prediction === 0 && result.probability < 0.6) return "caution";
  if (result.prediction === 1 && result.probability < 0.6) return "caution";
  return "danger";
}

interface SafetyClearanceBadgeProps {
  result: PredictionResult;
}

const SafetyClearanceBadge = ({ result }: SafetyClearanceBadgeProps) => {
  const status = determineSafetyStatus(result);
  const config = SAFETY_CONFIG[status];
  const Icon = config.icon;

  return (
    <div
      className={`relative rounded-2xl border-2 ${config.borderClass} ${config.bgClass} ${config.glowClass} p-6 md:p-8 opacity-0 animate-scale-in overflow-hidden`}
    >
      {/* Pulse indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={`relative flex h-3 w-3`}>
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${config.pulseColor}`} />
        </span>
        <span className={`text-xs font-medium ${config.textClass} uppercase tracking-wider`}>DGMS Status</span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
        {/* Icon */}
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${config.iconBgClass} flex items-center justify-center shrink-0`}>
          <Icon className={`w-10 h-10 md:w-12 md:h-12 ${config.textClass}`} />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">Safety Clearance Decision</p>
          <h2 className={`text-2xl md:text-3xl font-extrabold ${config.textClass} leading-tight mb-2`}>
            {config.label}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {config.description}
          </p>
        </div>

        {/* Shield emblem */}
        <div className="hidden lg:flex flex-col items-center gap-1 shrink-0 opacity-60">
          <Shield className={`w-14 h-14 ${config.textClass}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${config.textClass}`}>DGMS</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyClearanceBadge;
