import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../src/components/Common/SearchBar';

describe('SearchBar Component (AAA Pattern)', () => {
    
    let mockOnSearchChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks(); 
        mockOnSearchChange = vi.fn(); 
    });

    it('deve renderizar com o placeholder correto e o valor inicial', () => {
        const mockProps = {
            searchTerm: '',
            onSearchChange: mockOnSearchChange,
        };
        render(<SearchBar {...mockProps} />);

        const clearButton = screen.queryByLabelText('Limpar busca');
        expect(clearButton).not.toBeInTheDocument();
    });

    it('deve chamar onSearchChange com o novo valor ao digitar', () => {
        const mockProps = {
            searchTerm: '',
            onSearchChange: mockOnSearchChange,
        };
        render(<SearchBar {...mockProps} />);
        
        const searchInput = screen.getByRole('textbox', { name: 'Barra de busca de aplicativos' });
        const newSearchTerm = 'pluga';
        
        fireEvent.change(searchInput, { target: { value: newSearchTerm } });

        expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
        expect(mockOnSearchChange).toHaveBeenCalledWith(newSearchTerm);
    });

    it('deve mostrar o botão de limpar e chamá-lo para redefinir a busca', () => {
        
        const mockProps = {
            searchTerm: 'teste',
            onSearchChange: mockOnSearchChange, 
        };
        render(<SearchBar {...mockProps} />);

        const clearButton = screen.getByRole('button', { name: 'Limpar busca' });
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        expect(mockOnSearchChange).toHaveBeenCalledTimes(1); 
        expect(mockOnSearchChange).toHaveBeenCalledWith('');
    });
});