"use client"

import { useEffect, useState } from "react";
import Selector from "../components/Selector";
import Input from "../components/Input";

export default function SetupView() {
    const [project, setProject] = useState('');
    const [language, setLanguage] = useState('');
    const [bootVersion, setBootVersion] = useState('');
    const [packaging, setPackaging] = useState('');
    const [javaVersion, setJavaVersion] = useState('');

    const [group, setGroup] = useState('');
    const [artifat, setArtifat] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [packageName, setPackageName] = useState('');

    useEffect(() => {
        setPackageName(group+"."+name);
    }, [group, name])

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
                        clickedItem={project}
                        setClickedItem={setProject}
                    />

                    <Selector
                        name="Linguagem"
                        items={[
                            ["Java", "JAVA"]
                        ]}
                        clickedItem={language}
                        setClickedItem={setLanguage}
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
                        clickedItem={bootVersion}
                        setClickedItem={setBootVersion}
                    />

                    <div className="w-[100%] flex flex-col gap-[16px]">
                        <a className="font-bold text-[20px]">Metadata do Projeto</a>
                        
                        <div className="flex flex-col gap-[24px]">
                            <Input name="Grupo" placeHolder="com.exemplo" value={group} changeValue={setGroup}/>
                            <Input name="Nome do Artefato" placeHolder="demo" value={artifat} changeValue={setArtifat}/>
                            <Input name="Nome" placeHolder="demo" value={name} changeValue={setName}/>
                            <Input name="Descrição" placeHolder="Descrição do projeto." value={description} changeValue={setDescription}/>
                            <Input name="Nome do Pacote" placeHolder="com.example.demo" value={packageName} changeValue={(setPackageName)}/>
                        </div>
                    </div>
                    
                    <div className="flex gap-[150px] flex-wrap mb-[40px]">
                        <Selector
                            name="Empacotamento"
                            items={[
                                ["Jar", "JAR"],
                                ["War", "WAR"],
                            ]}
                            clickedItem={packaging}
                            setClickedItem={setPackaging}
                        />

                        
                        <Selector
                            name="Java"
                            items={[
                                ["21", "21"],
                                ["17", "17"],
                                ["25", "25"],
                            ]}
                            clickedItem={javaVersion}
                            setClickedItem={setJavaVersion}
                        />

                    </div>
                </main>
            </div>
        </div>
    )
}