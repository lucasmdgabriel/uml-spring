import Selector from "../components/Selector";
import Input from "../components/Input";
import { ProjectConfigProps } from "../page";

interface SetupProps {
    projConfig: ProjectConfigProps,
    updateProjConfig: (newProjConfig: ProjectConfigProps) => void
}

export default function SetupView(props: SetupProps) {
    return (
        <div className="w-screen h-screen flex justify-center m-4 mt-[40px]">
            <div className="max-w-[1000px] flex flex-col gap-[48px]">
                <header className="flex flex-col">
                    <a className="font-bold text-[30px]">Configuração Inicial</a>
                    <a onClick={() => {console.log(props.projConfig);}} className="text-[16px]">Selecione as principais configurações do projeto</a>
                </header>
                <main className="flex flex-col gap-[40px]">
                    <Selector
                        name="Projeto"
                        items={[
                            ["Maven", "MAVEN_PROJECT"],
                            ["Gradle - Groovy", "GRADLE-PROJECT"],
                            ["Gradle - Kotlin", "GRADLE-PROJECT-KOTLIN"]
                        ]}
                        clickedItem={props.projConfig.project}
                        setClickedItem={(newValue: string) => {
                            props.updateProjConfig({
                                ... props.projConfig,
                                project: newValue
                            })
                        }}
                    />

                    <Selector
                        name="Linguagem"
                        items={[
                            ["Java", "JAVA"]
                        ]}
                        clickedItem={props.projConfig.language}
                        setClickedItem={(newValue: string) => {
                            props.updateProjConfig({
                                ... props.projConfig,
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
                        clickedItem={props.projConfig.bootVersion}
                        setClickedItem={(newValue: string) => {
                            props.updateProjConfig({
                                ... props.projConfig,
                                bootVersion: newValue
                            })
                        }}
                    />

                    <div className="w-[100%] flex flex-col gap-[16px]">
                        <a className="font-bold text-[20px]">Metadata do Projeto</a>
                        
                        <div className="flex flex-col gap-[24px]">
                            <Input name="Grupo" placeHolder="com.exemplo"
                                value={props.projConfig.group}
                                changeValue={(newValue: string) => {
                                    props.updateProjConfig({... props.projConfig, 
                                        group: newValue
                                    });
                                }}
                            />
                            <Input name="Nome do Artefato" placeHolder="demo"
                                value={props.projConfig.artifat}
                                changeValue={(newValue: string) => {
                                    props.updateProjConfig({... props.projConfig, 
                                        artifat: newValue
                                    });
                                }}
                            />
                            <Input
                                name="Nome" placeHolder="demo"
                                value={props.projConfig.name}
                                changeValue={(newValue: string) => {
                                    props.updateProjConfig({... props.projConfig, 
                                        name: newValue
                                    });
                                }}
                            />
                            <Input
                                name="Descrição" placeHolder="Descrição do projeto."
                                value={props.projConfig.description}
                                changeValue={(newValue: string) => {
                                    props.updateProjConfig({... props.projConfig, 
                                        description: newValue
                                    });
                                }}
                            />
                            <Input
                                name="Nome do Pacote" placeHolder="com.example.demo"
                                value={props.projConfig.packageName}
                                changeValue={(newValue: string) => {
                                    props.updateProjConfig({... props.projConfig, 
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
                            clickedItem={props.projConfig.packaging}
                            setClickedItem={(newValue: string) => {
                                props.updateProjConfig({
                                    ... props.projConfig,
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
                            clickedItem={props.projConfig.javaVersion}
                            setClickedItem={(newValue: string) => {
                                props.updateProjConfig({
                                    ... props.projConfig,
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