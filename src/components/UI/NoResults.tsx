import React from 'react';
import styles from '../../styles/components/UI/NoResults.module.css'; 

interface NoResultsProps {
    message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ message }) => {
    return (
        <div className={styles.noResultsContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.alertIcon}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <p>Ops! Não encontramos resultados.</p>
            <p className={styles.noResultsDetail}>{message || "Tente ajustar os termos de busca."}</p>
        </div>
    );
};

export default NoResults;