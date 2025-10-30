import type { AppTool } from '../types';
import { API_TOOLS_ENDPOINT } from '../config/config'; 


export const fetchApps = async (): Promise<AppTool[]> => {
    try {
        const response = await fetch(API_TOOLS_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json(); 
        
        if (!Array.isArray(data)) {
            console.error("Dados recebidos não são um array:", data);
            throw new Error("A API não retornou o formato de lista esperado.");
        }

        const tools = data as AppTool[];

        if (tools.length === 0) {
             console.warn("A API retornou uma lista vazia de ferramentas.");
        }

        return tools;

    } catch (error) {
        console.error("Erro na comunicação com a API:", error);
        throw error;
    }
};