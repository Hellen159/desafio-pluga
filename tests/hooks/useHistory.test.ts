import { renderHook } from '@testing-library/react'; 
import { act } from 'react'; 
import { useHistory } from '../../src/hooks/useHistory';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock de dados de teste
const app1 = { app_id: 'a', name: 'App A', color: '#FFF', icon: '', link: '' };
const app2 = { app_id: 'b', name: 'App B', color: '#FFF', icon: '', link: '' };
const app3 = { app_id: 'c', name: 'App C', color: '#FFF', icon: '', link: '' };
const app4 = { app_id: 'd', name: 'App D', color: '#FFF', icon: '', link: '' };
const app5 = { app_id: 'e', name: 'App E', color: '#FFF', icon: '', link: '' };

describe('useHistory', () => {
  
  it('deve armazenar no máximo 4 itens', () => {
    const { result } = renderHook(() => useHistory());

    act(() => {
      result.current.addToHistory(app1); // [A]
      result.current.addToHistory(app2); // [B, A]
      result.current.addToHistory(app3); // [C, B, A]
      result.current.addToHistory(app4); // [D, C, B, A] 
      result.current.addToHistory(app5); // [E, D, C, B] 
    });

    expect(result.current.history).toHaveLength(4);
    expect(result.current.history.map(h => h.app_id)).not.toContain('a'); 
    expect(result.current.history[0].app_id).toBe('e'); 
  });

  it('deve mover um item existente para o topo', () => {
    const { result } = renderHook(() => useHistory());

    act(() => {
      result.current.addToHistory(app1); // [A]
      result.current.addToHistory(app2); // [B, A]
      result.current.addToHistory(app1); // [A, B] -> A deve subir
    });

    // Verifica a ordem e o tamanho
    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0].app_id).toBe('a');
    expect(result.current.history[1].app_id).toBe('b');
  });
});