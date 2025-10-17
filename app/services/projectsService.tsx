import { DependencyCategoryProps, useDependenciesContext } from "@/context/DependenciesContext";
import { ProjectConfigProps } from "../page";

export function projectGenerate(projectConfig: ProjectConfigProps, dependencies: DependencyCategoryProps[]) {
    const url = "http://localhost:8080/api/v1/projects"
    let dependenciesList: string[] = [];

    for (let i = 0; i < dependencies.length; i++) {
        for (let j = 0 ; j < dependencies[i].dependencies.length; j++) {
            const dependency = dependencies[i].dependencies[j];

            if (dependency.clicked) {
                dependenciesList.push(dependency.id);
            }
        }
    }

    console.log({
            type: projectConfig.project,
            language: projectConfig.language,
            bootVersion: projectConfig.bootVersion,
            javaVersion: projectConfig.javaVersion,
            description: projectConfig.description,
            name: projectConfig.name,
            groupId: projectConfig.group,
            dependencies: dependenciesList,
        });

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: projectConfig.project,
            language: projectConfig.language,
            bootVersion: projectConfig.bootVersion,
            javaVersion: projectConfig.javaVersion,
            description: projectConfig.description,
            name: projectConfig.name,
            groupId: projectConfig.group,
            dependencies: dependenciesList,
        })
        
    })
    .then(async (response) => {
        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro no servidor");
        }
        
        // 🧩 converte resposta binária em blob
        const blob = await response.blob();

        // 💾 cria um link temporário para download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // tenta extrair nome do arquivo do header, senão usa um padrão
        const contentDisposition = response.headers.get("content-disposition");
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
        a.download = filenameMatch ? filenameMatch[1] : projectConfig.artifat+".zip";

        document.body.appendChild(a);
        a.click();

        // 🧹 limpa o link depois
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(() => {
        alert("Erro na criação do projeto.");
    });
}