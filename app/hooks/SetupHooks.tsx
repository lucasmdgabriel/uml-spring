import { ProjectConfigProps } from "../page";
import { databaseUrl } from "../utils/databaseUrl";

interface MetadataError {
    field: "groupId" | "artifactId" | "name" | "description" | "packageName" | "global";
    message: string;
}


export async function metadataRequest(projConfig: ProjectConfigProps): Promise<MetadataError[] | null> {
    const url = `${databaseUrl}/api/v1/projects/check/metadata`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projConfig)
        });

        if (res.ok) return null;

        const data: { messages: MetadataError[] } = await res.json();
        return data.messages || [];
    } catch (error) {
        return [{ field: "global", message: "Erro de rede. Tente novamente." }];
    }
}
