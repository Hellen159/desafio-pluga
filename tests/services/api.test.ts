import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchApps } from '../../src/services/api'; 
import type { AppTool } from '../../src/types/index'; 
import { API_TOOLS_ENDPOINT } from '../../src/config/config'; 

const mockAppData: AppTool[] = [
    { app_id: 'app-a', name: 'App Teste A', color: '#ff0000', icon: 'icon-a.png', link: 'https://pluga.co/a' },
    { app_id: 'app-b', name: 'App Teste B', color: '#00ff00', icon: 'icon-b.png', link: 'https://pluga.co/b' }
];

const createMockResponse = (status: number, data: any) => ({
    ok: status >= 200 && status < 300,
    status: status,
    json: vi.fn().mockResolvedValue(data),
    text: vi.fn().mockResolvedValue(JSON.stringify(data)),
    headers: new Headers(),
    statusText: String(status),
    type: 'default' as const, 
    url: API_TOOLS_ENDPOINT,
    redirected: false, 
    clone: vi.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
    formData: vi.fn(),
});

declare const fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
const mockedFetch = vi.fn(); 

describe('fetchApps Service', () => {
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal('fetch', mockedFetch);
    });

    it('deve retornar a lista de aplicativos em caso de sucesso (status 200)', async () => {
        
        // 1. Configura a simulação
        mockedFetch.mockResolvedValue(
            createMockResponse(200, mockAppData) as unknown as Response
        ); 

        // 2. Executa a função
        const result = await fetchApps();

        // 3. Asserções
        expect(mockedFetch).toHaveBeenCalledWith(API_TOOLS_ENDPOINT); 
        expect(result).toEqual(mockAppData);
        expect(result).toHaveLength(2);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
    
    it('deve lançar um erro quando a resposta HTTP não for ok (ex: status 404)', async () => {
        
        mockedFetch.mockResolvedValue(
            createMockResponse(404, { message: 'Não encontrado' }) as unknown as Response
        );

        await expect(fetchApps()).rejects.toThrow('Erro HTTP: 404'); 
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(mockedFetch).toHaveBeenCalled();
    });

    it('deve lançar um erro se a API retornar um objeto ou dado inválido', async () => {
        
        const invalidData = { data: 'not_an_array' };
        mockedFetch.mockResolvedValue(
            createMockResponse(200, invalidData) as unknown as Response
        );

        await expect(fetchApps()).rejects.toThrow('A API não retornou o formato de lista esperado.'); 
        
        expect(consoleErrorSpy).toHaveBeenCalledWith("Dados recebidos não são um array:", invalidData); 
        expect(mockedFetch).toHaveBeenCalled();
    });

    it('deve retornar um array vazio e emitir um aviso se a lista estiver vazia', async () => {
        
        mockedFetch.mockResolvedValue(
            createMockResponse(200, []) as unknown as Response
        );

        const result = await fetchApps();

        expect(result).toEqual([]);
        expect(consoleWarnSpy).toHaveBeenCalledWith("A API retornou uma lista vazia de ferramentas.");
        expect(mockedFetch).toHaveBeenCalled();
    });

    it('deve lançar um erro na falha de rede (reject de fetch)', async () => {
        
        const networkError = new TypeError('Falha de conexão de rede');
        mockedFetch.mockRejectedValue(networkError);

        await expect(fetchApps()).rejects.toThrow(networkError);
        
        expect(consoleErrorSpy).toHaveBeenCalledWith("Erro na comunicação com a API:", networkError); 
        expect(mockedFetch).toHaveBeenCalled();
    });
});