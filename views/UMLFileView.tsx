"use client";

import Button from "@/components/Button";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePlantUMLContext } from "@/context/PlantUMLContext";
import { databaseUrl } from "@/app/utils/databaseUrl";

interface Variable {
  visibility: string;
  name: string;
  type: string;
}

interface Entity {
  name: string;
  variables: Variable[];
}

interface Relationship {
  sourceClass: string;
  targetClass: string;
  sourceMultiplicity: string;
  targetMultiplicity: string;
}

export interface PlantUMLData {
  entities: Entity[];
  relationships: Relationship[];
}

export default function UMLFileView() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { plantUmlData, setPlantUmlData } = usePlantUMLContext();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const sendRequest = async (fileToSend: File) => {
    setIsLoading(true);
    setPlantUmlData(null);
    setError(null);
    

    try {
      const fileContent = await fileToSend.text();

      const payload = {
        plantUml: fileContent,
      };

      const url = `${databaseUrl}/api/v1/projects/entities-model`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.entities && data.entities.length > 0) {
          setPlantUmlData(data as PlantUMLData);
          setError(null);
          console.log("Diagrama processado e armazenado:", data);
        } else {
          setPlantUmlData(null);
          setError("Nenhuma entidade foi detectada no arquivo enviado.");
        }
      } else {
        throw new Error(data.message || response.statusText);
      }
    } catch (error: any) {
      console.error("Erro ao enviar arquivo:", error);
      setPlantUmlData(null);
      setError(`Erro na requisição: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile) {
      const isValid =
        selectedFile.name.endsWith(".puml") ||
        selectedFile.name.endsWith(".plantuml") ||
        selectedFile.name.endsWith(".txt");

      if (isValid) {
        setFile(selectedFile);
        console.log("Arquivo selecionado, iniciando envio:", selectedFile.name);
        sendRequest(selectedFile);
      } else {
        setError("Arquivo inválido. Por favor, envie um arquivo .puml, .plantuml ou .txt");
        setFile(null);
      }
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleProceed = () => {
    if (plantUmlData && !error) {
      console.log("Prosseguindo para /project-config");
      router.push("/project-config");
    } else {
      if (!error) {
        setError("Por favor, envie um arquivo válido primeiro.");
      }
      console.error("Não é possível prosseguir. Erro:", error || "Dados não carregados.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center pt-[40px] pb-[80px]">
      <div className="w-[90%] max-w-[1000px] flex flex-col gap-[48px]">
        <header className="flex flex-col">
          <a className="font-bold text-[30px]">Enviar Diagrama UML</a>
          <a className="text-[16px]">
            Envie o documento PlantUML para converter.
          </a>
        </header>

        <div className="flex flex-col gap-[32px]">
          <div
            className="flex flex-col items-center justify-center bg-[#F5F7F8] border-[#E5E7EB] gap-[12px] py-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              accept=".puml,.plantuml,.txt"
              style={{ display: "none" }}
            />

            <img src="./cloud.png" alt="Cloud" width={48} height={58} />

            <a className="font-bold">
              {file ? file.name : "Arraste e solte seu arquivo aqui."}
            </a>

            <a>ou</a>

            <Button
              name={"Escolher arquivo"}
              color={"#359EFF"}
              bg={"#359EFF1A"}
              borderColor={"#359EFF1A"}
              borderRadius={8}
              onClick={openFileDialog}
            />
          </div>

          <>
            {plantUmlData && plantUmlData.entities.length > 0 && (
              <div className="w-full">
                <a className="font-bold text-[24px]">Entidades Detectadas</a>
                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                        >
                          Nome da Entidade
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                        >
                          Atributos
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plantUmlData.entities.map((entity) => (
                        <tr key={entity.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {entity.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {entity.variables
                              .map((v) => `${v.name}: ${v.type}`)
                              .join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>

          <>
            {plantUmlData && plantUmlData.relationships.length > 0 && (
              <div className="w-full">
                <a className="font-bold text-[24px]">Relacionamentos Detectados</a>
                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                        >
                          Entidade Origem
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-sm font-semibold text-gray-700"
                        >
                          Multiplicidade
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                        >
                          Entidade Destino
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plantUmlData.relationships.map((rel, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {rel.sourceClass}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                            {rel.sourceMultiplicity} -- {rel.targetMultiplicity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {rel.targetClass}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>

          <div className="flex flex-col items-center gap-4 pb-4">
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <div className="flex justify-center">
              <Button
                name={isLoading ? "Processando..." : "Prosseguir"}
                color={"#FFFFFF"}
                bg={"#359EFF"}
                borderColor={"#359EFF"}
                borderRadius={0}
                onClick={handleProceed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}