"use client"

import { createContext, useContext, useState } from "react";
import { AdditionalConfigProps, ProjectConfigProps } from "../app/page";

interface ProjectContextType {
    additionalProjectConfig: AdditionalConfigProps;
    setAdditionalProjectConfig: (config: AdditionalConfigProps) => void;
}

const AdditionalProjectContext = createContext<ProjectContextType | null>(null);

export function AdditionalProjectConfigProvider({ children }: { children: React.ReactNode }) {
    const [additionalProjectConfig, setAdditionalProjectConfig] = useState<AdditionalConfigProps>({
        structureType: 'LAYER',
        database: 'MYSQL'
    });

    return (
        <AdditionalProjectContext.Provider value={{ additionalProjectConfig, setAdditionalProjectConfig }}>
            {children}
        </AdditionalProjectContext.Provider>
    );
}

export function useAdditionalProjectContext() {
    const context = useContext(AdditionalProjectContext);
    if (!context) {
        throw new Error("useAdditionalProjectContext deve ser usado dentro de um ProjectProvider");
    }
    return context;
}