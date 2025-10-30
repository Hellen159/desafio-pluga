import React from 'react';
import styles from '../../styles/components/UI/Loading.module.css'; 

const Loading: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando ferramentas...</p>
        </div>
    );
};

export default Loading;