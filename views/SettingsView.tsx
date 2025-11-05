"use client"

import Header from "@/components/Header";
import Selector from "@/components/Selector";
import { useAdditionalProjectContext } from "@/context/AdditionalConfigContext";
import LabeledInput from "@/components/LabeledInput";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { AdditionalConfigProps } from "@/app/page";
import { useState } from "react";
import { validateLocalForm } from "@/app/hooks/SettingsHooks";

const dbDatabaseMap: Record<string, string> = {
    MYSQL: "MySQL",
    POSTGRESQL: "PostgreSQL"
}

const dbUserDefault: Record<string, string> = {
    MYSQL: 'O usuário padrão do MySQL é root.',
    POSTGRESQL: 'O usuário padrão do PostgreSQL é postgres.'
}

const dbPasswordDefault: Record<string, string> = {
    MYSQL: "A senha padrão do MySQL é vazia.",
    POSTGRESQL: "Você forneceu uma senha para o PostgreSQL no momento da instalação."
}

const nextPage: Record<string, string> = {
    yes: "/security",
    no: "/generation"
}

export default function SettingsView() {
    const { additionalProjectConfig, setAdditionalProjectConfig } = useAdditionalProjectContext();
    const router = useRouter();

    const [errorForm, setErrorForm] = useState<AdditionalConfigProps>({
        structureType: "",
        database: "",
        databaseName: "",
        databaseUser: "",
        databasePassword: "",
        auth: "",
        secretKey: ""
    });

    function handleClickProceed() {
        const result = validateLocalForm(additionalProjectConfig);

        if (result.isValid) {
            router.push(nextPage[additionalProjectConfig.auth]);
        }

        setErrorForm(result.errorForm);
    }

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-[90%] max-w-[1000px] flex flex-col gap-[48px] h-full pt-[40px] pb-[40px] box-border">
                <Header
                    title = "Configuração do Projeto"
                    description = "Configure as definições de banco de dados e autenticação para o seu projeto."
                />

                <main className="flex flex-col gap-12">
                    <Selector
                        name = "Tipo de Estrutura"
                        items = {[
                            ["Camadas", "LAYER"],
                            ["Componentes", "COMPONENT"]
                        ]}
                        clickedItem={additionalProjectConfig.structureType}
                        setClickedItem={(newValue: string) => {
                            setAdditionalProjectConfig({
                                ... additionalProjectConfig,
                                structureType: newValue
                            })
                        }}
                    />
                    
                    <div className="flex flex-col gap-6">
                        <Selector
                            name = "Banco de Dados"
                            items = {[
                                ["MySQL", "MYSQL"],
                                ["PostgreSQL", "POSTGRESQL"]
                            ]}
                            clickedItem={additionalProjectConfig.database}
                            setClickedItem={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    database: newValue
                                })
                            }}
                        />

                        <LabeledInput
                            name="Nome do Banco de Dados"
                            placeHolder="meu_projeto_db"
                            message={`No ${dbDatabaseMap[additionalProjectConfig.database]}, você deve criar um banco de dados com o nome indicado.`}
                            value={additionalProjectConfig.databaseName}
                            error={errorForm.databaseName}
                            changeValue={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    databaseName: newValue
                                })
                            }}
                        />

                        <LabeledInput
                            name={"Usuário do "+dbDatabaseMap[additionalProjectConfig.database]}
                            placeHolder="meu_usuario"
                            message={dbUserDefault[additionalProjectConfig.database]}
                            value={additionalProjectConfig.databaseUser}
                            error={errorForm.databaseUser}
                            changeValue={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    databaseUser: newValue
                                })
                            }}
                        />

                        <LabeledInput
                            name={"Senha do "+dbDatabaseMap[additionalProjectConfig.database]}
                            placeHolder="minha_senha"
                            message={dbPasswordDefault[additionalProjectConfig.database]}
                            value={additionalProjectConfig.databasePassword}
                            password={true}
                            error={errorForm.databasePassword}
                            changeValue={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    databasePassword: newValue
                                })
                            }}
                        />

                    </div>
                    
                    <div className="flex flex-col gap-6">
                        <Selector
                            name = "Autenticação"
                            items = {[
                                ["Sim", "yes"],
                                ["Não", "no"]
                            ]}
                            clickedItem={additionalProjectConfig.auth}
                            setClickedItem={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    auth: newValue
                                })
                            }}
                        />

                        { additionalProjectConfig.auth == "yes" &&
                            <LabeledInput
                                name="Chave Secreta"
                                placeHolder="minha_chave"
                                message="
                                    Você pode usar qualquer texto como senha, mas o ideal é que tenha no mínimo 16 caracteres.
                                    Além disso, é necessário protegê-la para tokens JWT não serem forjados.
                                "
                                value={additionalProjectConfig.secretKey}
                                error={errorForm.secretKey}
                                changeValue={(newValue: string) => {
                                    setAdditionalProjectConfig({
                                        ... additionalProjectConfig,
                                        secretKey: newValue
                                    })
                                }}
                            />

                        }
                    </div>
                </main>

                <footer className="flex flex-row justify-end gap-[12px] w-full bg-white flex-shrink-0">
                    <Button
                    name="Voltar"
                    color="#000"
                    bg="#FFFFFF"
                    borderColor="#D1D5DB"
                    onClick={() => {
                        router.push('/diagram');
                    }}
                    />
        
                    <Button
                    name="Prosseguir"
                    color="#FFFF"
                    bg="#2563EB"
                    borderColor="#2563EB"
                    onClick={handleClickProceed}
                    />
                </footer>

            </div>
        </div>
    )
}