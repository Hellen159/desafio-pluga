import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../src/components/Common/Pagination'; 

const mockStyles = {
    pagination: 'pagination',
    active: '_active_6f374e', 
};
vi.mock('../../../styles/components/Pagination.module.css', () => (mockStyles));

describe('Pagination Component (AAA Pattern)', () => {
    
    let mockOnPageChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks(); 
        mockOnPageChange = vi.fn();
    });

    it('deve retornar null se o total de páginas for 1 ou menos', () => {
        
        const props = {
            totalItems: 5, 
            itemsPerPage: 10,
            currentPage: 1,
            onPageChange: mockOnPageChange,
        };
        
        const { container } = render(<Pagination {...props} />);

        expect(container.firstChild).toBeNull();
    });

    it('deve renderizar o número correto de botões de página', () => {
        
        const props = {
            totalItems: 25,
            itemsPerPage: 10,
            currentPage: 1,
            onPageChange: mockOnPageChange,
        };
        
        render(<Pagination {...props} />);

        const pageButtons = screen.getAllByRole('button');
        expect(pageButtons).toHaveLength(3); 
        
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('deve aplicar a classe active à página atual', () => {
        
        const props = {
            totalItems: 25,
            itemsPerPage: 10,
            currentPage: 2,
            onPageChange: mockOnPageChange,
        };
        
        render(<Pagination {...props} />);

        // ASSERT: 
        const page1Button = screen.getByText('1');
        const page2Button = screen.getByText('2');
        
        expect(page2Button).toHaveClass(mockStyles.active); 
        
        expect(page1Button).not.toHaveClass(mockStyles.active); 
    });

    it('deve chamar onPageChange com o número correto da página ao ser clicado', () => {
        
        const props = {
            totalItems: 25,
            itemsPerPage: 10,
            currentPage: 1,
            onPageChange: mockOnPageChange,
        };
        render(<Pagination {...props} />);
        
        const page3Button = screen.getByText('3');
        fireEvent.click(page3Button);

        expect(mockOnPageChange).toHaveBeenCalledTimes(1);
        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });
});