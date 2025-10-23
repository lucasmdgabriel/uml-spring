"use client";

import { projectGenerate } from "@/app/services/projectsService";
import Button from "@/components/Button";
import { useDependenciesContext } from "@/context/DependenciesContext";
import { useProjectContext } from "@/context/ProjectConfigContext";
import { useRouter } from "next/navigation";

export default function DependenciesView() {
  const { dependencies, setDependencies } = useDependenciesContext();
  const { projectConfig, setProjectConfig } = useProjectContext();
  const router = useRouter();

  function changeDependencyClicked(i: number, j: number) {
    setDependencies((prev) =>
      prev.map((cat, ci) => {
        if (ci !== i) return cat;
        return {
          ...cat,
          dependencies: cat.dependencies.map((dep, di) => {
            if (di !== j) return dep;
            return { ...dep, clicked: !dep.clicked };
          }),
        };
      })
    );
  }

  return (
    // 1. DIV EXTERNO: Define a altura da tela, sem padding.
    <div className="w-full h-screen flex justify-center">
      
      {/* 2. DIV INTERNO: Ocupa 100% da altura, é flex-col e controla os paddings. */}
      <div className="w-[90%] max-w-[1000px] flex flex-col gap-[48px] h-full pt-[40px] pb-[40px] box-border">
        
        {/* 3. HEADER: Não deve encolher. */}
        <header className="flex flex-col flex-shrink-0">
          <a className="font-bold text-[30px]">Adicionar Dependências</a>
          <a className="text-[16px]">
            Selecione as dependências que você quer adicionar ao projeto.
          </a>
        </header>

        {/* 4. MAIN: Deve crescer e rolar internamente. */}
        <main className="flex flex-col gap-8 flex-grow overflow-y-auto">
          {dependencies.map((dependencyCategory, i) => {
            return (
              <div key={i} className="flex flex-col gap-4">
                <a className="text-[20px] font-bold">
                  {dependencyCategory.name}
                </a>

                <div className="flex flex-row gap-4 flex-wrap">
                  {dependencyCategory.dependencies.map((dependency, j) => {
                    return (
                      <div
                        key={j}
                        className="w-[90%] max-w-[440px] py-[12px] border border-[#E5E7EB] flex flex-row items-center cursor-pointer"
                        onClick={() => {
                          changeDependencyClicked(i, j);
                        }}
                      >
                        <div
                          className={`border border-[#E5E7EB] w-[20px] h-[20px] rounded-[12px] mx-[17px] flex-shrink-0 ${
                            dependency.clicked ? "bg-blue-300" : undefined
                          }`}
                        />
                        <div className="flex flex-col gap-1">
                          <a className="text-[#1D1D1F] font-bold text-[16px]">
                            {dependency.name}
                          </a>
                          <a className="text-[#6B7280] text-[14px]">
                            Java annotation library which helps to reduce
                            boilerplate code. Java annotation library which
                            helps to reduce boilerplate code. Java annotation
                            library which helps to reduce boilerplate code.
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </main>

        {/* 5. FOOTER: Não deve encolher e não precisa mais das divs extras. */}
        <footer className="flex flex-row justify-end gap-[12px] w-full bg-white flex-shrink-0">
          <Button
            name="Voltar"
            color="#000"
            bg="#FFFFFF"
            borderColor="#D1D5DB"
            onClick={() => {
              router.push('/');
            }}
          />

          <Button
            name="Prosseguir"
            color="#FFFF"
            bg="#2563EB"
            borderColor="#2563EB"
            onClick={() => {
              router.push("/diagram");
            }}
          />
        </footer>
      </div>
    </div>
  );
}