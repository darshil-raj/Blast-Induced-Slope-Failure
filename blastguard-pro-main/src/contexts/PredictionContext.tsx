import React, { createContext, useContext, useState } from "react";

export interface BlastParameters {
  burden: number;
  spacing: number;
  holeDepth: number;
  holeDiameter: number;
  stemmingLength: number;
  totalCharge: number;
  maxChargeDelay: number;
  specificCharge: number;
  slopeHeight: number;
  slopeAngle: number;
  numberOfRows: number;
  rmr: number;
}

export interface PredictionResult {
  prediction: 0 | 1;
  probability: number;
  riskLevel: "Low" | "Medium" | "High";
  recommendation: string;
  timestamp: string;
  parameters: BlastParameters;
}

interface PredictionContextType {
  results: PredictionResult[];
  latestResult: PredictionResult | null;
  addResult: (result: PredictionResult) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const PredictionContext = createContext<PredictionContextType | null>(null);

export const usePrediction = () => {
  const ctx = useContext(PredictionContext);
  if (!ctx) throw new Error("usePrediction must be used within PredictionProvider");
  return ctx;
};

export const PredictionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (result: PredictionResult) => {
    setResults((prev) => [result, ...prev]);
  };

  const latestResult = results[0] || null;

  return (
    <PredictionContext.Provider value={{ results, latestResult, addResult, isLoading, setIsLoading }}>
      {children}
    </PredictionContext.Provider>
  );
};
