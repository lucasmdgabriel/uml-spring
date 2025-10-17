import Selector from "../components/Selector";
import Input from "../components/Input";
import { ProjectConfigProps } from "../app/page";
import Button from "../components/Button";
import { useProjectContext } from "../context/ProjectConfigContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetupView() {
    const { projectConfig, setProjectConfig } = useProjectContext();
    const router = useRouter();

    const [errorForm, setErrorForm] = useState({
        group: "",
        artifat: "",
        name: "",
        description: "",
        packageName: ""
    });

    useEffect(() => {
        if (!projectConfig.group || !projectConfig.name) return;

        setProjectConfig({
            ... projectConfig,
            packageName: projectConfig.group+"."+projectConfig.name
        });

    }, [projectConfig.group, projectConfig.name]);

    function nextPage() {
        let goToNextPage = true;

        let newErrorForm = { ... errorForm };

        if (!projectConfig.group) {
            newErrorForm.group = "Grupo não pode ser vazio."
            goToNextPage = false;
        }

        if (!projectConfig.artifat) {
            newErrorForm.artifat = "Nome do artefato não pode ser vazio."
            goToNextPage = false;
        }
        else {
            newErrorForm.artifat = "";
        }

        if (!projectConfig.name) {
            newErrorForm.name = "Nome do projeto não pode ser vazio."
            goToNextPage = false;
        }
        else {
            newErrorForm.name = "";
        }

        if (!projectConfig.description) {
            newErrorForm.description = "Descrição do projeto não pode ser vazia."
            goToNextPage = false;
        }
        else {
            newErrorForm.description = "";
        }

        if (!projectConfig.packageName) {
            newErrorForm.packageName = "Nome do pacote não pode ser vazio."
            goToNextPage = false;
        }
        else {
            newErrorForm.packageName = "";
        }

        if (!goToNextPage) {
            setErrorForm(newErrorForm);
            return;

        }

        router.push('/dependencies');
    }
    
    return (
        <div className="w-screen h-screen flex justify-center m-4 mt-[40px]">
            <div className="max-w-[1000px] flex flex-col gap-[48px]">
                <header className="flex flex-col">
                    <a className="font-bold text-[30px]">Configuração Inicial</a>
                    <a className="text-[16px]">Selecione as principais configurações do projeto</a>
                </header>
                <main className="flex flex-col gap-[40px]">
                    <Selector
                        name="Projeto"
                        items={[
                            ["Maven", "MAVEN_PROJECT"],
                            ["Gradle - Groovy", "GRADLE-PROJECT"],
                            ["Gradle - Kotlin", "GRADLE-PROJECT-KOTLIN"]
                        ]}
                        clickedItem={projectConfig.project}
                        setClickedItem={(newValue: string) => {
                            setProjectConfig({
                                ... projectConfig,
                                project: newValue
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
                            ["4.0.0 (SNAPSHOT)", "4.0.0.BUILD-SNAPSHOT"],
                            ["4.0.0 (M3)", "4.0.0.M3"],
                            ["3.5.7 (SNAPSHOT)", "3.5.7.BUILD-SNAPSHOT"],
                            ["3.5.6", "3.5.6.RELEASE"],
                            ["3.4.11 (SNAPSHOT)", "3.4.11.BUILD-SNAPSHOT"],
                            ["3.4.10", "3.4.10.RELEASE"],
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
                                value={projectConfig.group}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        group: newValue
                                    });
                                }}
                                error={errorForm.group}
                            />
                            <Input name="Nome do Artefato" placeHolder="demo"
                                value={projectConfig.artifat}
                                changeValue={(newValue: string) => {
                                    setProjectConfig({... projectConfig, 
                                        artifat: newValue
                                    });
                                }}
                                error={errorForm.artifat}
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
                            onClick={nextPage}                        
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}