import React, { useState, useMemo } from 'react';
import AppCard from './AppCard';
import Pagination from '../Common/Pagination';
import SearchBar from '../Common/SearchBar';
import NoResults from '../UI/NoResults';
import type { AppTool } from '../../types'; 
import { ITEMS_PER_PAGE } from '../../config/config'; 
import styles from '../../styles/components/AppList.module.css';

interface AppListProps {
    apps: AppTool[];
    onAppSelect: (app: AppTool) => void;
}

const AppList: React.FC<AppListProps> = ({ apps, onAppSelect }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const filteredApps = useMemo(() => {
        if (!searchTerm) return apps;
        
        const lowerSearch = searchTerm.toLowerCase();
        return apps.filter(app => 
            app.name.toLowerCase().includes(lowerSearch)
        );
    }, [apps, searchTerm]);

    const totalItems = filteredApps.length;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentApps = filteredApps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const showNoResults = totalItems === 0 && apps.length > 0;
    const showEmptyState = apps.length === 0;

    if (showEmptyState) {
        return <NoResults message="Nenhuma ferramenta disponível para listagem." />;
    }

    return (
        <div className={styles.appListContainer}>
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
            />

            {showNoResults ? (
                <NoResults message={`Nenhum resultado encontrado para "${searchTerm}"`} />
            ) : (
                <>
                    <div className={styles.appGrid}>
                        {currentApps.map(app => (
                            <AppCard key={app.app_id} app={app} onClick={onAppSelect} />
                        ))}
                    </div>

                    <Pagination
                        totalItems={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default AppList;