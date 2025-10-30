import React from 'react';
import styles from '../../styles/components/SearchBar.module.css';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    
    const handleClear = () => {
        onSearchChange('');
    };

    return (
        <div className={styles.searchBarContainer}> 
            
            <div className={styles.searchIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>

            <input
                type="text"
                placeholder="Buscar ferramenta pelo nome..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Barra de busca de aplicativos"
                className={styles.searchInput} 
            />
            
            {searchTerm && (
                <button 
                    onClick={handleClear} 
                    className={styles.clearButton}
                    aria-label="Limpar busca"
                >
                    &times; 
                </button>
            )}
        </div>
    );
};

export default SearchBar;