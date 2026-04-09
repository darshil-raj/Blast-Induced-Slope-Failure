import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { BlastParameters } from "@/contexts/PredictionContext";

interface ZoneProps {
  innerRadius: number;
  outerRadius: number;
  height: number;
  color: string;
  opacity: number;
  yOffset: number;
  label: string;
  pulse?: boolean;
}

const BlastZone = ({ innerRadius, outerRadius, height, color, opacity, yOffset, pulse }: ZoneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && pulse) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
      meshRef.current.scale.set(s, 1, s);
    }
  });

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
  }, [innerRadius, outerRadius, height]);

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, yOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
};

const DrillHole = ({ depth, diameter }: { depth: number; diameter: number }) => {
  const radius = (diameter / 1000) * 2;
  return (
    <mesh position={[0, -depth / 2, 0]}>
      <cylinderGeometry args={[radius, radius, depth, 32]} />
      <meshStandardMaterial color="hsl(220, 15%, 25%)" metalness={0.6} roughness={0.4} />
    </mesh>
  );
};

const StemmingColumn = ({ length, diameter }: { length: number; diameter: number }) => {
  const radius = (diameter / 1000) * 2.2;
  return (
    <mesh position={[0, -length / 2 + 0.1, 0]}>
      <cylinderGeometry args={[radius, radius, length, 32]} />
      <meshStandardMaterial color="hsl(210, 60%, 55%)" transparent opacity={0.7} />
    </mesh>
  );
};

const GroundPlane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
    <planeGeometry args={[20, 20]} />
    <meshStandardMaterial color="hsl(220, 15%, 18%)" roughness={0.9} />
  </mesh>
);

const GridLines = () => {
  return (
    <gridHelper args={[20, 20, "hsl(220, 20%, 25%)", "hsl(220, 20%, 15%)"]} position={[0, 0.02, 0]} />
  );
};

interface SceneProps {
  burden: number;
  spacing: number;
  holeDepth: number;
  holeDiameter: number;
  stemmingLength: number;
  specificCharge: number;
}

const BlastScene = ({ burden, spacing, holeDepth, holeDiameter, stemmingLength, specificCharge }: SceneProps) => {
  const coreRadius = burden * 0.3 * specificCharge;
  const primaryRadius = burden * 0.6;
  const secondaryRadius = spacing * 0.7;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[0, -holeDepth / 2, 0]} intensity={0.5} color="hsl(15, 90%, 55%)" distance={8} />

      <GroundPlane />
      <GridLines />

      {/* Drill hole */}
      <DrillHole depth={holeDepth} diameter={holeDiameter} />

      {/* Stemming */}
      <StemmingColumn length={stemmingLength} diameter={holeDiameter} />

      {/* High Energy Core - Red */}
      <BlastZone
        innerRadius={0}
        outerRadius={coreRadius}
        height={holeDepth * 0.6}
        color="hsl(0, 80%, 50%)"
        opacity={0.35}
        yOffset={-holeDepth * 0.5}
        label="High Energy Core"
        pulse
      />

      {/* Primary Fragmentation - Orange */}
      <BlastZone
        innerRadius={coreRadius}
        outerRadius={primaryRadius}
        height={holeDepth * 0.5}
        color="hsl(25, 90%, 55%)"
        opacity={0.25}
        yOffset={-holeDepth * 0.45}
        label="Primary Frag"
      />

      {/* Secondary Scatter - Green */}
      <BlastZone
        innerRadius={primaryRadius}
        outerRadius={secondaryRadius}
        height={holeDepth * 0.4}
        color="hsl(142, 60%, 45%)"
        opacity={0.15}
        yOffset={-holeDepth * 0.4}
        label="Secondary Scatter"
      />

      {/* Labels */}
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="hsl(0, 0%, 85%)" anchorX="center">
        Blast Hole Cross-Section
      </Text>
      <Text position={[coreRadius + 0.3, -holeDepth * 0.3, 0]} fontSize={0.18} color="hsl(0, 80%, 65%)" anchorX="left">
        Core
      </Text>
      <Text position={[primaryRadius + 0.3, -holeDepth * 0.25, 0]} fontSize={0.18} color="hsl(25, 90%, 65%)" anchorX="left">
        Primary
      </Text>
      <Text position={[secondaryRadius + 0.3, -holeDepth * 0.2, 0]} fontSize={0.18} color="hsl(142, 60%, 60%)" anchorX="left">
        Secondary
      </Text>

      <OrbitControls enableDamping dampingFactor={0.05} minDistance={3} maxDistance={20} />
    </>
  );
};

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  color: string;
}

const SliderControl = ({ label, value, min, max, step, unit, onChange, color }: SliderControlProps) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
        {value.toFixed(step < 1 ? (step < 0.1 ? 2 : 1) : 0)} {unit}
      </Badge>
    </div>
    <Slider
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      className={color}
    />
  </div>
);

const ZONE_LEGEND = [
  { label: "High Energy Core", color: "bg-[hsl(0,80%,50%)]", desc: "Maximum energy transfer zone" },
  { label: "Primary Fragmentation", color: "bg-[hsl(25,90%,55%)]", desc: "Main rock breakage region" },
  { label: "Secondary Scatter", color: "bg-[hsl(142,60%,45%)]", desc: "Outer displacement zone" },
  { label: "Stemming Column", color: "bg-[hsl(210,60%,55%)]", desc: "Inert confinement material" },
];

interface BlastVisualizerProps {
  parameters?: BlastParameters;
}

const BlastVisualizer = ({ parameters }: BlastVisualizerProps) => {
  const [burden, setBurden] = useState(parameters?.burden ?? 3.0);
  const [spacing, setSpacing] = useState(parameters?.spacing ?? 3.5);
  const [holeDepth, setHoleDepth] = useState(parameters?.holeDepth ?? 8.0);
  const [holeDiameter, setHoleDiameter] = useState(parameters?.holeDiameter ?? 115);
  const [stemmingLength, setStemmingLength] = useState(parameters?.stemmingLength ?? 2.0);
  const [specificCharge, setSpecificCharge] = useState(parameters?.specificCharge ?? 0.5);

  return (
    <Card className="shadow-card overflow-hidden opacity-0 animate-fade-in-up stagger-3">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-lg">🧨</span> 3D Blast Visualizer
            </CardTitle>
            <CardDescription>Interactive blast hole cross-section with energy zones</CardDescription>
          </div>
          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 3D Canvas */}
          <div className="lg:col-span-2 h-[380px] rounded-xl overflow-hidden border border-border/50 bg-[hsl(220,20%,8%)]">
            <Canvas camera={{ position: [6, 4, 6], fov: 50 }} shadows>
              <BlastScene
                burden={burden}
                spacing={spacing}
                holeDepth={holeDepth}
                holeDiameter={holeDiameter}
                stemmingLength={stemmingLength}
                specificCharge={specificCharge}
              />
            </Canvas>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-3 p-3 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Adjust Parameters</p>
              <SliderControl label="Burden" value={burden} min={1} max={5} step={0.1} unit="m" onChange={setBurden} color="" />
              <SliderControl label="Spacing" value={spacing} min={1.5} max={6} step={0.1} unit="m" onChange={setSpacing} color="" />
              <SliderControl label="Hole Depth" value={holeDepth} min={3} max={15} step={0.5} unit="m" onChange={setHoleDepth} color="" />
              <SliderControl label="Diameter" value={holeDiameter} min={76} max={165} step={1} unit="mm" onChange={setHoleDiameter} color="" />
              <SliderControl label="Stemming" value={stemmingLength} min={0.5} max={3} step={0.1} unit="m" onChange={setStemmingLength} color="" />
              <SliderControl label="Specific Charge" value={specificCharge} min={0.1} max={1.5} step={0.01} unit="kg/m³" onChange={setSpecificCharge} color="" />
            </div>

            {/* Legend */}
            <div className="space-y-2 p-3 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Zone Legend</p>
              {ZONE_LEGEND.map((z) => (
                <div key={z.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${z.color} shrink-0`} />
                  <div>
                    <p className="text-xs font-medium text-foreground">{z.label}</p>
                    <p className="text-[10px] text-muted-foreground">{z.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlastVisualizer;
