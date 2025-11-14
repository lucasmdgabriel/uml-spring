"use client"

import Selector from "../components/Selector";
import Input from "../components/Input";
import { ProjectConfigProps } from "../app/page";
import Button from "../components/Button";
import { useProjectContext } from "../context/ProjectConfigContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { metadataRequest } from "@/app/hooks/SetupHooks";
import Header from "@/components/Header";

type ErrorFormType = {
    groupId: string;
    artifactId: string;
    name: string;
    description: string;
    packageName: string;
};

export default function SetupView() {
    const { projectConfig, setProjectConfig } = useProjectContext();
    const router = useRouter();

    const [errorForm, setErrorForm] = useState<ErrorFormType>({
        groupId: "",
        artifactId: "",
        name: "",
        description: "",
        packageName: ""
    });

    useEffect(() => {
        if (!projectConfig.groupId || !projectConfig.name) return;

        setProjectConfig({
            ... projectConfig,
            packageName: projectConfig.groupId+"."+projectConfig.name
        });

    }, [projectConfig.groupId, projectConfig.name]);

    function validateFront(
        projectConfig: ProjectConfigProps,
        setErrorForm: React.Dispatch<React.SetStateAction<ErrorFormType>>
    ): boolean {
        let isValid = true;

        const newErrorForm: ErrorFormType = {
            groupId: "",
            artifactId: "",
            name: "",
            description: "",
            packageName: ""
        };

        if (!projectConfig.groupId) {
            newErrorForm.groupId = "Grupo não pode ser vazio.";
            isValid = false;
        }
        if (!projectConfig.artifactId) {
            newErrorForm.artifactId = "Nome do artefato não pode ser vazio.";
            isValid = false;
        }
        if (!projectConfig.name) {
            newErrorForm.name = "Nome do projeto não pode ser vazio.";
            isValid = false;
        }
        if (!projectConfig.description) {
            newErrorForm.description = "Descrição do projeto não pode ser vazia.";
            isValid = false;
        }
        if (!projectConfig.packageName) {
            newErrorForm.packageName = "Nome do pacote não pode ser vazio.";
            isValid = false;
        }

        setErrorForm(newErrorForm);
        return isValid;
    }

    async function validateBackend(
        projectConfig: ProjectConfigProps,
        setErrorForm: React.Dispatch<React.SetStateAction<ErrorFormType>>
    ): Promise<boolean> {
        const errors = await metadataRequest(projectConfig);

        if (!errors || errors.length === 0) return true;

        const newErrorForm: ErrorFormType = {
            groupId: "",
            artifactId: "",
            name: "",
            description: "",
            packageName: ""
        };

        errors.forEach(err => {
            switch (err.field) {
                case "groupId":
                    newErrorForm.groupId = err.message;
                    break;
                case "artifactId":
                    newErrorForm.artifactId = err.message;
                    break;
                case "name":
                    newErrorForm.name = err.message;
                    break;
                case "description":
                    newErrorForm.description = err.message;
                    break;
                case "packageName":
                    newErrorForm.packageName = err.message;
                    break;
                case "global":
                    console.log(err.message);
                    break;
            }
        });

        setErrorForm(newErrorForm);
        return false;
    }

    const handleClickProcess = async () => {
        // 1️⃣ Valida front
        const frontValid = validateFront(projectConfig, setErrorForm);
        if (!frontValid) return;

        // 2️⃣ Valida backend
        const backendValid = await validateBackend(projectConfig, setErrorForm);
        if (!backendValid) return;

        router.push("/dependencies");
    };

    return (
        <div className="w-full min-h-screen flex justify-center pt-[40px] px-4 pb-4">
            <div className="max-w-[1000px] flex flex-col gap-[48px]">
                <Header title="Configuração Inicial" description="Selecione as principais configurações do projeto."/>

                <main className="flex flex-col gap-[40px]">
                    <Selector
                        name="Projeto"
                        items={[
                            ["Maven", "MAVEN_PROJECT"],
                            ["Gradle - Groovy", "GRADLE-PROJECT"],
                            ["Gradle - Kotlin", "GRADLE-PROJECT-KOTLIN"]
                        ]}
                        clickedItem={projectConfig.type}
                        setClickedItem={(newValue: string) => {
                            setProjectConfig({
                                ... projectConfig,
                                type: newValue
                            })
                        }}
                    />

                    <Selector
                        name="Linguagem"
                        items={[
                            ["Java", "JAVA"]
                        ]}
                        clickedItem={projectConfig.language}
                        setClickedItem={(newValue: string) => {
                            setProjectConfig({
                                ... projectConfig,
                                language: newValue
                            })
                        }}
                    />

                    <Selector
                        name="Versão Spring Boot"
                        items={[
                            ["3.5.7", "3.5.7"],
                            ["3.5.6", "3.5.6"],
                        ]}
                        clickedItem={projectConfig.bootVersion}
                        setClickedItem={(newValue: string) => {
                            setProjectConfig({
                                ... projectConfig,
                                bootVersion: newValue
                            })
                        }}
                    />

                    <div className="w-[100%] flex flex-col gap-[16px]">
                        <a className="font-bold text-[20px]">Metadata do Projeto</a>
                        
                        <div className="flex flex-col gap-[24px]">
                            <Input name="Grupo" placeHolder="com.exemplo"
                                value={projectConfig.groupId}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        groupId: newValue
                                    });
                                }}
                                error={errorForm.groupId}
                            />
                            <Input name="Nome do Artefato" placeHolder="demo"
                                value={projectConfig.artifactId}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        artifactId: newValue
                                    });
                                }}
                                error={errorForm.artifactId}
                            />
                            <Input
                                name="Nome" placeHolder="demo"
                                value={projectConfig.name}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        name: newValue
                                    });
                                }}
                                error={errorForm.name}
                            />
                            <Input
                                name="Descrição" placeHolder="Descrição do projeto."
                                value={projectConfig.description}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        description: newValue
                                    });
                                }}
                                error={errorForm.description}
                            />
                            <Input
                                name="Nome do Pacote" placeHolder="com.example.demo"
                                value={projectConfig.packageName}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        packageName: newValue
                                    });
                                }}
                                error={errorForm.packageName}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-[150px] flex-wrap">
                        <Selector
                            name="Empacotamento"
                            items={[
                                ["Jar", "JAR"],
                                ["War", "WAR"],
                            ]}
                            clickedItem={projectConfig.packaging}
                            setClickedItem={(newValue: string) => {
                                setProjectConfig({
                                    ... projectConfig,
                                    packaging: newValue
                                })
                            }}
                        />

                        
                        <Selector
                            name="Java"
                            items={[
                                ["21", "21"],
                                ["17", "17"],
                                ["25", "25"],
                            ]}
                            clickedItem={projectConfig.javaVersion}
                            setClickedItem={(newValue: string) => {
                                setProjectConfig({
                                    ... projectConfig,
                                    javaVersion: newValue
                                })
                            }}
                        />

                    </div>

                    <div className="mb-[40px] flex justify-end">
                        <Button
                            name="Prosseguir"
                            color="#FFFF"
                            bg="#2563EB"
                            borderColor="#2563EB"
                            onClick={() => handleClickProcess()}                        
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}