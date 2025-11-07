"use client"

import { createContext, useContext, useState } from "react";

export interface RouteType {
    url: string;
    get: string[];
    post: string[];
    getAll: string[];
    put: string[];
    delete: string[];
}

export interface SecurityType {
    roles: string[];
    securityRouters: RouteType[];
}

interface SecurityContextType {
    securityConfig: SecurityType;
    setSecurityConfig: (config: SecurityType) => void;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export function SecurityConfigProvider({ children }: { children: React.ReactNode }) {
    const [securityConfig, setSecurityConfig] = useState<SecurityType>({
        roles: [],
        securityRouters: []
    });

    return (
        <SecurityContext.Provider value={{ securityConfig, setSecurityConfig }}>
            {children}
        </SecurityContext.Provider>
    );
}

export function useSecurityContext() {
    const context = useContext(SecurityContext);
    if (!context) {
        throw new Error("useSecurityContext deve ser usado dentro de um SecurityConfigProvider");
    }
    return context;
}
