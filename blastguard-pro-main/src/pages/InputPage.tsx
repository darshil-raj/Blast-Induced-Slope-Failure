import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePrediction, BlastParameters, PredictionResult } from "@/contexts/PredictionContext";
import { AlertCircle, Play, Loader2, Info, RotateCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FieldConfig {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  group: string;
  tooltip: string;
}

const FIELDS: FieldConfig[] = [
  { key: "burden", label: "Burden", unit: "m", min: 1.0, max: 5.0, step: 0.1, group: "Blast Geometry", tooltip: "Distance between rows of blast holes" },
  { key: "spacing", label: "Spacing", unit: "m", min: 1.5, max: 6.0, step: 0.1, group: "Blast Geometry", tooltip: "Distance between adjacent blast holes" },
  { key: "holeDepth", label: "Hole Depth", unit: "m", min: 3.0, max: 15.0, step: 0.1, group: "Blast Geometry", tooltip: "Total depth of the blast hole" },
  { key: "holeDiameter", label: "Hole Diameter", unit: "mm", min: 76, max: 165, step: 1, group: "Blast Geometry", tooltip: "Diameter of the drilled blast hole" },
  { key: "stemmingLength", label: "Stemming Length", unit: "m", min: 0.5, max: 3.0, step: 0.1, group: "Charge Design", tooltip: "Length of inert material at top of hole" },
  { key: "totalCharge", label: "Total Charge/Hole", unit: "kg", min: 5, max: 200, step: 1, group: "Charge Design", tooltip: "Total explosive weight per blast hole" },
  { key: "maxChargeDelay", label: "Max Charge/Delay", unit: "kg", min: 5, max: 100, step: 1, group: "Charge Design", tooltip: "Maximum charge detonated per delay interval" },
  { key: "specificCharge", label: "Specific Charge", unit: "kg/m³", min: 0.1, max: 1.5, step: 0.01, group: "Charge Design", tooltip: "Explosive consumption per unit volume of rock" },
  { key: "slopeHeight", label: "Slope Height", unit: "m", min: 5, max: 50, step: 1, group: "Slope Parameters", tooltip: "Vertical height of the slope face" },
  { key: "slopeAngle", label: "Slope Angle", unit: "°", min: 30, max: 80, step: 1, group: "Slope Parameters", tooltip: "Inclination angle of the slope face" },
  { key: "numberOfRows", label: "No. of Rows", unit: "", min: 1, max: 8, step: 1, group: "Configuration", tooltip: "Number of blast hole rows" },
  { key: "rmr", label: "Rock Mass Rating", unit: "RMR", min: 0, max: 100, step: 1, group: "Configuration", tooltip: "Bieniawski's Rock Mass Rating (0-100)" },
];

const INITIAL: Record<string, string> = {};
FIELDS.forEach((f) => (INITIAL[f.key as string] = ""));

const GROUP_ICONS: Record<string, string> = {
  "Blast Geometry": "📐",
  "Charge Design": "💥",
  "Slope Parameters": "⛰️",
  "Configuration": "⚙️",
};

function simulatePrediction(params: BlastParameters): PredictionResult {
  const riskScore =
    (params.specificCharge / 1.5) * 0.25 +
    (params.slopeAngle / 80) * 0.2 +
    (params.totalCharge / 200) * 0.15 +
    (1 - params.rmr / 100) * 0.2 +
    (params.slopeHeight / 50) * 0.1 +
    (params.numberOfRows / 8) * 0.1;
  const probability = Math.min(Math.max(riskScore + (Math.random() - 0.5) * 0.1, 0.02), 0.98);
  const prediction = probability > 0.5 ? 1 : 0;
  const riskLevel: "Low" | "Medium" | "High" = probability < 0.3 ? "Low" : probability < 0.6 ? "Medium" : "High";
  const recs: string[] = [];
  if (params.specificCharge > 0.8) recs.push("Consider reducing the specific charge to minimize energy concentration near the slope face.");
  if (params.slopeAngle > 60) recs.push("The steep slope angle increases vulnerability. Evaluate flatter bench angles or pre-split blasting.");
  if (params.rmr < 40) recs.push("Low RMR indicates weak rock mass. Use controlled blasting with reduced charge weights.");
  if (params.totalCharge > 150) recs.push("High total charge per hole detected. Consider deck charging to distribute energy.");
  if (recs.length === 0) recs.push("Parameters are within acceptable ranges. Standard blast design procedures apply.");
  return { prediction: prediction as 0 | 1, probability: Math.round(probability * 1000) / 1000, riskLevel, recommendation: recs.join(" "), timestamp: new Date().toISOString(), parameters: params };
}

const InputPage = () => {
  const [values, setValues] = useState<Record<string, string>>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addResult, isLoading, setIsLoading } = usePrediction();
  const navigate = useNavigate();

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    FIELDS.forEach((f) => {
      const v = parseFloat(values[f.key]);
      if (values[f.key] === "" || isNaN(v)) newErrors[f.key] = "Required";
      else if (v < f.min || v > f.max) newErrors[f.key] = `${f.min} – ${f.max}`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const params: BlastParameters = {} as BlastParameters;
    FIELDS.forEach((f) => { (params as any)[f.key] = parseFloat(values[f.key]); });
    await new Promise((r) => setTimeout(r, 1800));
    const result = simulatePrediction(params);
    addResult(result);
    setIsLoading(false);
    navigate("/dashboard");
  };

  const handleReset = () => { setValues(INITIAL); setErrors({}); };

  const filledCount = FIELDS.filter(f => values[f.key] !== "").length;
  const progress = (filledCount / FIELDS.length) * 100;

  const groups = [...new Set(FIELDS.map((f) => f.group))];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Prediction</h1>
          <p className="text-muted-foreground mt-1">Configure 12 blast parameters for slope failure prediction</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
          <RotateCcw className="mr-2 w-4 h-4" /> Reset
        </Button>
      </div>

      {/* Progress bar */}
      <div className="opacity-0 animate-fade-in stagger-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>{filledCount} of {FIELDS.length} parameters</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full gradient-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {groups.map((group, gi) => (
          <Card key={group} className={`shadow-card stat-card-hover opacity-0 animate-fade-in-up stagger-${gi + 2}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span>{GROUP_ICONS[group]}</span>
                {group}
              </CardTitle>
              <CardDescription>Enter values within the specified ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
                {FIELDS.filter((f) => f.group === group).map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor={field.key} className="text-sm font-medium">
                        {field.label}
                      </Label>
                      {field.unit && <span className="text-xs text-muted-foreground">({field.unit})</span>}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs max-w-[200px]">
                          {field.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id={field.key}
                      type="number"
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      placeholder={`${field.min} – ${field.max}`}
                      value={values[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className={`input-enhanced ${errors[field.key] ? "border-destructive focus:ring-destructive/20" : ""}`}
                    />
                    {errors[field.key] && (
                      <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3 h-3" />
                        {errors[field.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-3 pt-2 opacity-0 animate-fade-in stagger-6">
          <Button type="submit" size="lg" className="gradient-primary hover:opacity-90 transition-opacity h-12 px-8 font-semibold" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Running Model...</> : <><Play className="mr-2 h-4 w-4" />Run Prediction Model</>}
          </Button>
          <Button type="button" variant="outline" size="lg" className="h-12" onClick={handleReset}>Clear All</Button>
        </div>
      </form>
    </div>
  );
};

export default InputPage;
