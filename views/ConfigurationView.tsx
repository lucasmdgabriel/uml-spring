import CommentedInput from "@/components/LabeledInput";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Selector from "@/components/Selector";
import { useAdditionalProjectContext } from "@/context/AdditionalConfigContext";
import LabeledInput from "@/components/LabeledInput";

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

export default function ConfigurationView() {
    const { additionalProjectConfig, setAdditionalProjectConfig } = useAdditionalProjectContext();

    return (
        <div className="w-full h-screen flex justify-center">
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
                            error={""}
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
                            value={additionalProjectConfig.databaseName}
                            error={""}
                            changeValue={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    databaseName: newValue
                                })
                            }}
                        />

                        <LabeledInput
                            name={"Senha do "+dbDatabaseMap[additionalProjectConfig.database]}
                            placeHolder="minha_senha"
                            message={dbPasswordDefault[additionalProjectConfig.database]}
                            value={additionalProjectConfig.databaseName}
                            error={""}
                            changeValue={(newValue: string) => {
                                setAdditionalProjectConfig({
                                    ... additionalProjectConfig,
                                    databaseName: newValue
                                })
                            }}
                        />

                    </div>
                    
                    <div className="flex flex-col gap-6 mb-8">
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
                                message="Use uma chave complexa e a proteja. Com uma chave fraca ou desprotegida, seu projeto publicado fica exposto."
                                value={additionalProjectConfig.databaseName}
                                error={""}
                                changeValue={(newValue: string) => {
                                    setAdditionalProjectConfig({
                                        ... additionalProjectConfig,
                                        databaseName: newValue
                                    })
                                }}
                            />

                        }
                    </div>
                </main>

            </div>
        </div>
    )
}