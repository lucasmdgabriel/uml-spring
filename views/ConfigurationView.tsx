import Header from "@/components/Header";
import Selector from "@/components/Selector";
import { useAdditionalProjectContext } from "@/context/AdditionalConfigContext";

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
                </main>

            </div>
        </div>
    )
}