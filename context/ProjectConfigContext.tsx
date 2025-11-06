"use client"

import { createContext, useContext, useState } from "react";
import { ProjectConfigProps } from "../app/page";

interface ProjectContextType {
    projectConfig: ProjectConfigProps;
    setProjectConfig: (config: ProjectConfigProps) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectConfigProvider({ children }: { children: React.ReactNode }) {
    const [projectConfig, setProjectConfig] = useState<ProjectConfigProps>({
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
    });

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