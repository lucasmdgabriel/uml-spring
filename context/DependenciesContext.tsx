"use client"

import { dependenciesData } from "@/app/utils/dependenciesData";
import { 
    createContext, 
    useContext, 
    useState, 
    useEffect,
    Dispatch, 
    SetStateAction, 
    ReactNode 
} from "react";

export interface DependencyProps {
    name: string,
    id: string,
    description: string,
    clicked?: boolean,
}

export interface DependencyCategoryProps {
    name: string,
    dependencies: DependencyProps[]
}

interface DependenciesContextType {
  dependencies: DependencyCategoryProps[];
  setDependencies: Dispatch<SetStateAction<DependencyCategoryProps[]>>;
}

const LOCAL_STORAGE_KEY = 'dependencies';

const DependenciesContext = createContext<DependenciesContextType | null>(null);

export function DependenciesProvider({ children }: { children: ReactNode }) { 
    
    const [dependencies, setDependencies] = useState<DependencyCategoryProps[]>(() => {
        if (typeof window === 'undefined') {
            return dependenciesData; 
        }

        try {
            const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedData ? JSON.parse(savedData) : dependenciesData; 
        } catch (error) {
            console.error("Erro ao ler o localStorage (dependencies):", error);
            return dependenciesData; 
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dependencies));
            } catch (error) {
                console.error("Erro ao salvar no localStorage (dependencies):", error);
            }
        }
    }, [dependencies]); 

    return (
        <DependenciesContext.Provider value={{ dependencies, setDependencies }}>
            {children}
        </DependenciesContext.Provider>
    );
}

export function useDependenciesContext() {
    const context = useContext(DependenciesContext);
    if (!context) {
        throw new Error("useDependenciesContext deve ser usado dentro de um DependenciesProvider");
    }
    return context;
}