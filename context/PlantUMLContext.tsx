"use client";

import { PlantUMLData } from "@/views/UMLFileView";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PlantUMLContextType {
  plantUmlData: PlantUMLData | null;
  setPlantUmlData: (data: PlantUMLData | null) => void;
}

const PlantUMLContext = createContext<PlantUMLContextType | null>(null);

const LOCAL_STORAGE_KEY = 'plantUmlData';
const defaultValue = null;

export function PlantUMLProvider({ children }: { children: ReactNode }) {
  const [plantUmlData, setPlantUmlData] = useState<PlantUMLData | null>(() => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    
    try {
        const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : defaultValue;
    } catch (error) {
        console.error("Erro ao ler o localStorage (plantUmlData):", error);
        return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plantUmlData));
        } catch (error) {
            console.error("Erro ao salvar no localStorage (plantUmlData):", error);
        }
    }
  }, [plantUmlData]);

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