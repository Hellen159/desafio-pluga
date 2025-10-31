import React from 'react';
import type { AppTool } from '../../types';
import styles from '../../styles/components/AppCard.module.css'; 

interface AppCardProps {
    app: AppTool;
    onClick: (app: AppTool) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
    
    const cardStyle = {
        backgroundColor: app.color, 
        color: '#FFFFFF' 
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); 
            onClick(app);
        }
    };

    return (
        <div 
            style={cardStyle} 
            className={styles.appCard} 
            onClick={() => onClick(app)} 
            onKeyDown={handleKeyDown}
            role="button" 
            tabIndex={0}
        >
            <div className={styles.cardHeader}>
                <img src={app.icon} alt={`Ícone do ${app.name}`} className={styles.appIcon} />
            </div>
            <div className={styles.cardBody}>
                <h3 style={{ color: cardStyle.color === '#FFFFFF' ? '#FFFFFF' : '#000000' }}>{app.name}</h3>
            </div>
        </div>
    );
};

export default AppCard;