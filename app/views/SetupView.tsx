"use client"

import { useState } from "react";
import Selector from "../components/Selector";

export default function SetupView() {
    const [project, setProject] = useState('');
    const [language, setLanguage] = useState('');
    const [bootVersion, setBootVersion] = useState('');
    const [packaging, setPackaging] = useState('');
    const [javaVersion, setJavaVersion] = useState('');

    return (
        <div className="w-screen h-screen flex justify-center m-4">
            <div className="max-w-[1000px] mt-[65px] flex flex-col gap-[48px]">
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
                    
                    <div className="flex gap-[150px]">
                        <Selector
                            name="Packaging"
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