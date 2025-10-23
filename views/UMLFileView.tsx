"use client";

import Button from "@/components/Button";
import { useState, useRef } from "react";

interface Variable {
  visibility: string; // por exemplo: "-", "+", "#"
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
  sourceMultiplicity: string; // ex: "1", "0..*"
  targetMultiplicity: string;
}

export interface PlantUMLData {
  entities: Entity[];
  relationships: Relationship[];
}

export default function UMLFileView() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Novo estado para armazenar o resultado da API
  const [plantUmlData, setPlantUmlData] = useState<PlantUMLData | null>(null);
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Envia o CONTEÚDO do arquivo para a API em formato JSON.
   */
  const sendRequest = async (fileToSend: File) => {
    setIsLoading(true);
    setPlantUmlData(null); // Limpa dados anteriores ao iniciar

    try {
      // 1. Ler o conteúdo do arquivo como texto
      const fileContent = await fileToSend.text();

      // 2. Preparar o payload JSON
      const payload = {
        plantUml: fileContent,
      };

      const url = `http://localhost:8080/api/v1/projects/entities-model`;

      // 3. Enviar a requisição com o JSON
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // 4. Sucesso: Armazena o resultado no estado
        setPlantUmlData(data as PlantUMLData);
        console.log("Diagrama processado e armazenado:", data);
        // O alert foi removido.
      } else {
        // 5. Erro: Lança o erro
        throw new Error(data.message || response.statusText);
      }
    } catch (error: any) {
      console.error("Erro ao enviar arquivo:", error);
      alert(`Erro na requisição: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Valida o arquivo e inicia o envio.
   */
  const handleFile = (selectedFile: File) => {
    if (selectedFile) {
      const isValid =
        selectedFile.name.endsWith(".puml") ||
        selectedFile.name.endsWith(".plantuml") ||
        selectedFile.name.endsWith(".txt");

      if (isValid) {
        setFile(selectedFile); // Atualiza o nome na UI
        console.log("Arquivo selecionado, iniciando envio:", selectedFile.name);
        sendRequest(selectedFile); // Inicia o envio automaticamente
      } else {
        alert("Arquivo inválido. Por favor, envie um arquivo .puml, .plantuml ou .txt");
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

  /**
   * O botão "Prosseguir" não faz nada por enquanto.
   */
  const handleProceed = () => {
    console.log("Botão 'Prosseguir' clicado, mas está desativado.");
    // Você poderia usar este botão para fazer algo com o 'plantUmlData', por exemplo:
    // if (plantUmlData) {
    //   console.log("Dados prontos:", plantUmlData);
    // } else {
    //   alert("Nenhum dado processado ainda.");
    // }
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
    <div className="w-full h-screen flex justify-center pt-[40px]">
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
              name={isLoading ? "Processando..." : "Escolher arquivo"}
              color={"#359EFF"}
              bg={"#359EFF1A"}
              borderColor={"#359EFF1A"}
              borderRadius={8}
              onClick={openFileDialog}
            />
          </div>

          <div className="flex justify-center">
            <Button
              name={"Prosseguir"}
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
  );
}