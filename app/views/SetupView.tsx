"use client"

import { useEffect, useState } from "react";
import Selector from "../components/Selector";
import Input from "../components/Input";

export default function SetupView() {
    const [form, setForm] = useState({
        project: 'MAVEN_PROJECT',
        language: 'JAVA',
        bootVersion: '4.0.0.BUILD-SNAPSHOT',
        packaging: 'JAR',
        javaVersion: '21',
        group: '',
        artifat: '',
        name: '',
        description: '',
        packageName: ''
    })

    useEffect(() => {
        setForm({
            ... form,
            packageName: form.group+"."+form.name
        });
    }, [form.group, form.name])

    return (
        <div className="w-screen h-screen flex justify-center m-4 mt-[40px]">
            <div className="max-w-[1000px] flex flex-col gap-[48px]">
                <header className="flex flex-col">
                    <a className="font-bold text-[30px]">Configuração Inicial</a>
                    <a onClick={() => {console.log(form);}} className="text-[16px]">Selecione as principais configurações do projeto</a>
                </header>
                <main className="flex flex-col gap-[40px]">
                    <Selector
                        name="Projeto"
                        items={[
                            ["Maven", "MAVEN_PROJECT"],
                            ["Gradle - Groovy", "GRADLE-PROJECT"],
                            ["Gradle - Kotlin", "GRADLE-PROJECT-KOTLIN"]
                        ]}
                        clickedItem={form.project}
                        setClickedItem={(newValue: string) => {
                            setForm({
                                ... form,
                                project: newValue
                            })
                        }}
                    />

                    <Selector
                        name="Linguagem"
                        items={[
                            ["Java", "JAVA"]
                        ]}
                        clickedItem={form.language}
                        setClickedItem={(newValue: string) => {
                            setForm({
                                ... form,
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
                        clickedItem={form.bootVersion}
                        setClickedItem={(newValue: string) => {
                            setForm({
                                ... form,
                                bootVersion: newValue
                            })
                        }}
                    />

                    <div className="w-[100%] flex flex-col gap-[16px]">
                        <a className="font-bold text-[20px]">Metadata do Projeto</a>
                        
                        <div className="flex flex-col gap-[24px]">
                            <Input name="Grupo" placeHolder="com.exemplo"
                                value={form.group}
                                changeValue={(newValue: string) => {
                                    setForm({... form, 
                                        group: newValue
                                    });
                                }}
                            />
                            <Input name="Nome do Artefato" placeHolder="demo"
                                value={form.artifat}
                                changeValue={(newValue: string) => {
                                    setForm({... form, 
                                        artifat: newValue
                                    });
                                }}
                            />
                            <Input
                                name="Nome" placeHolder="demo"
                                value={form.name}
                                changeValue={(newValue: string) => {
                                    setForm({... form, 
                                        name: newValue
                                    });
                                }}
                            />
                            <Input
                                name="Descrição" placeHolder="Descrição do projeto."
                                value={form.description}
                                changeValue={(newValue: string) => {
                                    setForm({... form, 
                                        description: newValue
                                    });
                                }}
                            />
                            <Input
                                name="Nome do Pacote" placeHolder="com.example.demo"
                                value={form.packageName}
                                changeValue={(newValue: string) => {
                                    setForm({... form, 
                                        packageName: newValue
                                    });
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-[150px] flex-wrap mb-[40px]">
                        <Selector
                            name="Empacotamento"
                            items={[
                                ["Jar", "JAR"],
                                ["War", "WAR"],
                            ]}
                            clickedItem={form.packaging}
                            setClickedItem={(newValue: string) => {
                                setForm({
                                    ... form,
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
                            clickedItem={form.javaVersion}
                            setClickedItem={(newValue: string) => {
                                setForm({
                                    ... form,
                                    javaVersion: newValue
                                })
                            }}
                        />

                    </div>
                </main>
            </div>
        </div>
    )
}