import { useState, useCallback } from 'react';
import type { AppTool, HistoryItem } from '../types';
import { MAX_HISTORY_SIZE } from '../config/config'; 

/**
 * Hook para gerenciar um histórico limitado de ferramentas visualizadas.
 */
export const useHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const addToHistory = useCallback((app: AppTool) => {
        const historyItem: HistoryItem = {
            app_id: app.app_id,
            name: app.name,
            link: app.link,
            icon: app.icon,
            color: app.color
        };

        setHistory(prevHistory => {
            const filteredHistory = prevHistory.filter(item => item.app_id !== historyItem.app_id);

            const newHistory = [historyItem, ...filteredHistory];

            return newHistory.slice(0, MAX_HISTORY_SIZE);
        });
    }, []);

    return { history, addToHistory };
};