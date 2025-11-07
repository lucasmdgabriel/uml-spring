"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AdditionalConfigProps } from "../app/page";

interface ProjectContextType {
    additionalProjectConfig: AdditionalConfigProps;
    setAdditionalProjectConfig: (config: AdditionalConfigProps) => void;
}

const AdditionalProjectContext = createContext<ProjectContextType | null>(null);

const LOCAL_STORAGE_KEY = 'additionalProjectConfig';

const defaultConfig: AdditionalConfigProps = {
    structureType: 'LAYER',
    database: 'MYSQL',
    databaseUser: '',
    databasePassword: '',
    databaseName: '',
    auth: 'yes',
    secretKey: ''
};

export function AdditionalProjectConfigProvider({ children }: { children: ReactNode }) {
    const [additionalProjectConfig, setAdditionalProjectConfig] = useState<AdditionalConfigProps>(() => {
        if (typeof window === 'undefined') {
            return defaultConfig;
        }

        try {
            const savedConfig = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
        } catch (error) {
            console.error("Erro ao ler o localStorage (additionalProjectConfig):", error);
            return defaultConfig;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(additionalProjectConfig));
            } catch (error) {
                console.error("Erro ao salvar no localStorage (additionalProjectConfig):", error);
            }
        }
    }, [additionalProjectConfig]);

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