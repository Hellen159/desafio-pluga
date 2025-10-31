import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AppCard from '../../../src/components/List/AppCard'; 
import type { AppTool } from '../../../src/types';
import '@testing-library/jest-dom/vitest';

const styles = {
    appCard: 'mock-app-card',
    cardHeader: 'mock-card-header',
    appIcon: 'mock-app-icon',
    cardBody: 'mock-card-body',
};

// --- Dados Mock para Teste ---
const mockApp: AppTool = {
    app_id: 'chat-v3',
    name: 'Chat V3',
    icon: '/icons/chat-v3.svg',
    color: '#007bff', 
    link: '/app/chat-v3',
};

const mockOnClick = vi.fn(); 

describe('AppCard', () => {

    beforeEach(() => {
        mockOnClick.mockClear(); 
    });


    it('deve renderizar o nome e ícone do aplicativo corretamente', () => {
        // Arrange: Renderiza o componente com os dados mock
        render(<AppCard app={mockApp} onClick={mockOnClick} />);

        // Assert 1: Verifica se o nome do app está presente
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(mockApp.name);

        // Assert 2: Verifica se a imagem (ícone) está presente com o alt text correto
        const icon = screen.getByAltText(`Ícone do ${mockApp.name}`);
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('src', mockApp.icon);
    });


    it('deve aplicar a cor de fundo e a cor de texto branca corretamente', () => {
        
        render(<AppCard app={mockApp} onClick={mockOnClick} />);
        
        const cardElement = screen.getByRole('button');

        // Assert 1: Verifica a cor de fundo
        expect(cardElement).toHaveStyle({
            backgroundColor: mockApp.color, 
        });

        // Assert 2: Verifica a cor do texto/heading
        expect(cardElement).toHaveStyle({
            color: '#FFFFFF', 
        });
        
        // Assert 3: Verifica a cor condicional do H3
        const headingElement = screen.getByRole('heading', { level: 3 });
        expect(headingElement).toHaveStyle({ color: '#FFFFFF' }); 
    });


    it('deve chamar a função onClick com o objeto AppTool correto quando clicado', () => {
        
        render(<AppCard app={mockApp} onClick={mockOnClick} />);
        
        // Arrange: Encontra o elemento de clique (div com role="button")
        const cardElement = screen.getByRole('button');

        // Act: Simula o evento de clique no elemento
        fireEvent.click(cardElement);

        // Assert 1: Verifica se a função mock foi chamada
        expect(mockOnClick).toHaveBeenCalledTimes(1);

        // Assert 2: Verifica se a função mock foi chamada com o argumento correto
        expect(mockOnClick).toHaveBeenCalledWith(mockApp);
    });

    it('deve chamar a função onClick quando a tecla ENTER é pressionada (tabIndex=0)', () => {
        
        render(<AppCard app={mockApp} onClick={mockOnClick} />);
        
        const cardElement = screen.getByRole('button');

        // Act: Simula o evento de tecla ENTER
        fireEvent.keyDown(cardElement, { key: 'Enter', code: 'Enter' });

        // Assert: Verifica se a função mock foi chamada
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});