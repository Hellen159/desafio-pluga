import React from 'react';
import type { AppTool, HistoryItem } from '../../types';
import styles from '../../styles/components/AppModal.module.css'; 

interface AppModalProps {
    app: AppTool;
    history: HistoryItem[];
    onClose: () => void;
    onHistoryClick: (appId: string) => void; 
}

const AppModal: React.FC<AppModalProps> = ({ app, history, onClose, onHistoryClick }) => {
    
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                
                <button className={styles.modalClose} onClick={onClose} aria-label="Fechar modal">&times;</button>
                
                <div className={styles.appDetails}>
                    
                    <div 
                        className={styles.modalIconWrapper} 
                        style={{ backgroundColor: app.color }} 
                    >
                        <img 
                            src={app.icon} 
                            alt={`Ícone do ${app.name}`} 
                            className={styles.modalIcon} 
                        />
                    </div>
                    
                    <h1 style={{ color: app.color }}>{app.name}</h1>
                    
                    <a 
                        href={app.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.btnPrimary}
                    >
                        ACESSAR
                    </a>
                </div>

                {/* Seção de Histórico */}
                <div className={styles.historySection}>
                    <h2>ÚLTIMAS FERRAMENTAS VISUALIZADAS</h2>
                    {history.length > 0 ? (
                        <div className={styles.historyListGrid}>
                            {history.map(histApp => {
                                
                                const historyItemStyle = {
                                    backgroundColor: histApp.color,
                                    color: '#FFFFFF' 
                                };

                                return (
                                    <div 
                                        key={histApp.app_id} 
                                        className={styles.historyItem} 
                                        onClick={() => onHistoryClick(histApp.app_id)}
                                        style={historyItemStyle} 
                                    >
                                        <img src={histApp.icon} alt={histApp.name} className={styles.historyIcon} />
                                        <span 
                                            className={styles.historyName}
                                            style={{ color: '#FFFFFF' }} 
                                        >
                                            {histApp.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className={styles.emptyHistory}>Histórico vazio.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppModal;