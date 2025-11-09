"use client"

import handleFileDownload from "@/app/hooks/DownloadFileHooks";
import { databaseUrl } from "@/app/utils/databaseUrl";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useAdditionalProjectContext } from "@/context/AdditionalConfigContext";
import { useDependenciesContext } from "@/context/DependenciesContext";
import { usePlantUMLContext } from "@/context/PlantUMLContext";
import { useProjectContext } from "@/context/ProjectConfigContext";
import { useSecurityContext } from "@/context/SecurityContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GenerationView() {
    const router = useRouter();

    const { projectConfig } = useProjectContext();
    const { dependencies } = useDependenciesContext();
    const { additionalProjectConfig } = useAdditionalProjectContext();
    const { plantUmlData } = usePlantUMLContext();
    const { securityConfig } = useSecurityContext();

    const [file, setFile] = useState<Uint8Array | null>(null);
    const [postmanFile, setPostmanFile] = useState<Uint8Array | null>(null);
    const [error, setError] = useState(false);
    const [errorPostman, setErrorPostman] = useState(false);

    useEffect(() => {
        let dependenciesList: string[] = [];

        for (let i = 0; i < dependencies.length; i++) {
            for (let j = 0; j < dependencies[i].dependencies.length; j++) {
                const dependency = dependencies[i].dependencies[j];

                if (dependency.clicked) {
                    dependenciesList.push(dependency.id)
                }
            }
        }

        const data = {
            "initialSettings": {
                ...projectConfig
            },
            "dependencies": dependenciesList,
            "additionalSettings": {
                "database": true,
                "databaseType": additionalProjectConfig.database,
                "databaseName": additionalProjectConfig.databaseName,
                "databaseUser": additionalProjectConfig.databaseUser,
                "databasePassword": additionalProjectConfig.databasePassword,
                "structureType": additionalProjectConfig.structureType,
                "auth": additionalProjectConfig.auth == "yes",
                "secretKey": additionalProjectConfig.secretKey,
            },
            "plantUml": {
                ...plantUmlData
            },
            "securityRequest": {
                ... securityConfig
            }
        }

        const url = databaseUrl+"/api/v1/projects";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
            }
            
            return res.arrayBuffer();

        })
        .then(buffer => {
            const uint8 = new Uint8Array(buffer);
            setFile(uint8);
        })
        .catch((error) => {
            setError(true);
            console.log(error);
        })
    }, [])

    useEffect(() => {
        const url = databaseUrl + "/api/v1/tests/postman";

        const data = {
            "name": projectConfig.artifactId,
            "entityModel": plantUmlData,
            "auth": additionalProjectConfig.auth == "yes"
        };

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
            }
            
            return res.json(); 

        })
        .then(jsonData => {
            
            const jsonString = JSON.stringify(jsonData, null, 2); 

            const encoder = new TextEncoder();

            const uint8 = encoder.encode(jsonString);

            setPostmanFile(uint8);
        })
        .catch((error) => {
            setErrorPostman(true);
            console.log(error);
        });

    }, []);

    return (
        <div className="w-full min-h-screen flex justify-center pt-[40px] px-4 pb-4 bg-[#F9FAFB]">
            <div className="bg-white border border-[#E5E7EB] max-w-[1000px] h-fit flex flex-col gap-[48px] p-4">
                <Header
                    title="Geração do Projeto"
                    description="Geração do seu projeto para ser usado em produção."
                />

                <main className="flex gap-32 flex-wrap">
                    {/* Resumo da Geração */}
                    <div className="flex flex-col gap-[18px]">
                        <div className="flex flex-col">
                            <a className="font-bold text-xl">Resumo da Geração</a>
                            <a className="text-[#6B7280]">Componentes do Projeto</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a className="text-[#111827]">✅ application.properties</a>
                            <a className="text-[#111827]">✅ Entities</a>
                            <a className="text-[#111827]">✅ DTOs</a>
                            <a className="text-[#111827]">✅ Mappers</a>
                            <a className="text-[#111827]">✅ Repositories</a>
                            <a className="text-[#111827]">✅ Services</a>
                            <a className="text-[#111827]">✅ Controllers</a>
                            <a className="text-[#111827]">{additionalProjectConfig.auth == "yes" ? "✅": "❌"} Autenticação</a>
                            <a className="text-[#111827]">{additionalProjectConfig.auth == "yes" ? "✅": "❌"} Security</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[18px]">
                        <div className="flex flex-col">
                            <a className="font-bold text-xl">Log de Geração</a>
                            <a className="text-[#6B7280]">Feedback da geração</a>
                        </div>

                        <div className="min-w-[450px] max-w-[40%] bg-[#1F2937] rounded-sm p-2 flex flex-col gap-1 flex-1">
                            { additionalProjectConfig.auth != "yes" &&
                                <div className="flex gap-1">
                                    <span className="text-[#4ADE80]">[INFO]</span>
                                    <span className="text-white">O usuário optou por não gerar arquivos de autenticação.</span>
                                </div>

                            }
                            

                            <div className="flex gap-1">
                                <span className="text-[#4ADE80]">[INFO]</span>
                                <span className="text-white">
                                    O projeto está sendo gerado.
                                </span>
                            </div>

                            { error &&
                                <div className="flex gap-1">
                                    <span className="text-[#c71408]">[ERRO]</span>
                                    <span className="text-white">
                                        Erro na geração do arquivo. Contacte o suporte.
                                    </span>
                                </div>
                            }

                            { file != null &&
                                <div className="flex gap-1">
                                    <span className="text-[#4ADE80]">[INFO]</span>
                                    <span className="text-white">
                                        Projeto gerado com sucesso.
                                    </span>
                                </div> 
                                
                            }

                            { file != null &&
                                <div className="flex gap-1">
                                    <span className="text-[#4ADE80]">[INFO]</span>
                                    <span className="text-white">
                                        Arquivos de teste estão sendo gerados.
                                    </span>
                                </div>
                            }

                            

                            { postmanFile != null &&
                                <div className="flex gap-1">
                                    <span className="text-[#4ADE80]">[INFO]</span>
                                    <span className="text-white">
                                        Arquivos de teste gerados com sucesso.
                                    </span>
                                </div>
                            }

                            { errorPostman &&
                                <div className="flex gap-1">
                                    <span className="text-[#c71408]">[ERRO]</span>
                                    <span className="text-white">
                                        Erro na geração do arquivo de teste. Contacte o suporte.
                                    </span>
                                </div>
                            }
                            
                        </div>
                    </div>

                    <footer className="flex flex-row justify-center gap-[12px] w-full bg-white flex-shrink-0">
                        <Button
                        name="Voltar"
                        color="#000"
                        bg="#FFFFFF"
                        borderColor="#D1D5DB"
                        px="px-[32px]"
                        py="py-[10px]"
                        onClick={() => {
                            router.back();
                        }}
                        />

                        { file != null &&
                            <Button
                            name="Baixar Projeto (.zip)"
                            color="#FFFF"
                            bg="#2563EB"
                            borderColor="#2563EB"
                            px="px-[32px]"
                            py="py-[10px]"
                            onClick={() => {
                                handleFileDownload(file, projectConfig.name+".zip")
                            }}
                            />
                        }

                        { postmanFile != null &&
                            <Button
                            name="Baixar Testes (.zip)"
                            color="#FFFF"
                            bg="#2563EB"
                            borderColor="#2563EB"
                            px="px-[32px]"
                            py="py-[10px]"
                            onClick={() => {
                                handleFileDownload(postmanFile, projectConfig.artifactId+" - Postman.json")
                            }}
                            />
                        }
                        
                    </footer>
                </main>
            </div>
        </div>
    );
}
