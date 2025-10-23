"use client";

import { PlantUMLData } from "@/views/UMLFileView";
import { createContext, useContext, useState, ReactNode } from "react";

interface PlantUMLContextType {
  plantUmlData: PlantUMLData | null;
  setPlantUmlData: (data: PlantUMLData | null) => void;
}

const PlantUMLContext = createContext<PlantUMLContextType | null>(null);

export function PlantUMLProvider({ children }: { children: ReactNode }) {
  const [plantUmlData, setPlantUmlData] = useState<PlantUMLData | null>(null);

  return (
    <PlantUMLContext.Provider value={{ plantUmlData, setPlantUmlData }}>
      {children}
    </PlantUMLContext.Provider>
  );
}

export function usePlantUMLContext() {
  const context = useContext(PlantUMLContext);
  if (!context) {
    throw new Error(
      "usePlantUMLContext deve ser usado dentro de um PlantUMLProvider"
    );
  }
  return context;
}
