// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchApps } from './services/api';
import { useHistory } from './hooks/useHistory';
import type { AppTool } from './types'; 
import styles from './styles/components/App.module.css'; // Ajuste o caminho conforme sua estrutura real

import AppList from './components/List/AppList';
import AppModal from './components/Modal/AppModal';
import Loading from './components/UI/Loading';
const App: React.FC = () => {
    // Tipagem do estado principal de dados
    const [allApps, setAllApps] = useState<AppTool[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 
    // Tipagem do app selecionado (pode ser null se o modal estiver fechado)
    const [selectedApp, setSelectedApp] = useState<AppTool | null>(null); 
    
    const { history, addToHistory } = useHistory();

    // Carregamento inicial
    useEffect(() => {
        const loadApps = async () => {
            try {
                const data = await fetchApps();
                setAllApps(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
            } finally {
                setLoading(false);
            }
        };
        loadApps();
    }, []);

    // Abre o modal e adiciona o app ao histórico
    const handleAppSelect = useCallback((app: AppTool) => {
        setSelectedApp(app);
        addToHistory(app);
    }, [addToHistory]);

    // Lógica para reabrir o modal clicando em um item do histórico
    const handleHistoryClick = useCallback((appId: string) => {
        // Busca a ferramenta completa no array principal
        const app = allApps.find(a => a.app_id === appId); 
        if (app) {
            handleAppSelect(app);
        }
    }, [allApps, handleAppSelect]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-message">Erro ao carregar: {error}</div>;
    }

    return (
        <div className={styles.appContainer}>
            <header className={styles.appHeader}>
                <h1>Integrações Pluga</h1>
                <p>Descubra e integre as ferramentas certas.</p>
            </header>
            
            <main>
                <AppList 
                    apps={allApps} 
                    onAppSelect={handleAppSelect}
                />
            </main>
            
            {/* Renderização condicional do Modal */}
            {selectedApp && (
                <AppModal 
                    app={selectedApp}
                    // Filtra o app atual para não aparecer no próprio histórico do modal
                    history={history.filter(h => h.app_id !== selectedApp.app_id)} 
                    // history={history}
                    onClose={() => setSelectedApp(null)}
                    onHistoryClick={handleHistoryClick}
                />
            )}
        </div>
    );
}

export default App;