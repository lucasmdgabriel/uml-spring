"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { ProjectConfigProps } from "../app/page";

interface ProjectContextType {
    projectConfig: ProjectConfigProps;
    setProjectConfig: (config: ProjectConfigProps) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

const LOCAL_STORAGE_KEY = 'projectConfig';

const defaultConfig: ProjectConfigProps = {
    type: 'MAVEN_PROJECT',
    language: 'JAVA',
    bootVersion: '3.5.7',
    packaging: 'JAR',
    javaVersion: '21',
    groupId: '',
    artifactId: '',
    name: '',
    description: '',
    packageName: '',
};

export function ProjectConfigProvider({ children }: { children: React.ReactNode }) {

    const [projectConfig, setProjectConfig] = useState<ProjectConfigProps>(() => {
        if (typeof window === 'undefined') {
            return defaultConfig;
        }
        
        try {
            const savedConfig = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
        } catch (error) {
            console.error("Erro ao ler o localStorage:", error);
            return defaultConfig;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projectConfig));
            } catch (error) {
                console.error("Erro ao salvar no localStorage:", error);
            }
        }
    }, [projectConfig]);

    return (
        <ProjectContext.Provider value={{ projectConfig, setProjectConfig }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjectContext() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext deve ser usado dentro de um ProjectProvider");
    }
    return context;
}