import { fireEvent, render, screen } from '@testing-library/react';
import Tarefas from './Tarefas';

describe('as tarefas renderizam, o botão adicionar só aparece depois do de buscar ser clicado e as funções rodam', () => {
  test('o botão de adicionar não é apresentado sem clicar no botão de buscar', () => {
    render(<Tarefas />);
    const botaoAdicionar = screen.getByText(/Adicionar/i);

    expect(botaoAdicionar).toHaveClass('formulario__desabilita');
  });

  test('o botão de buscar tarefas, ao ser clicado, apresenta o de adicionar na tela', () => {
    render(<Tarefas />);
    const botaoAdicionar = screen.getByText(/Adicionar/i);
    const botaoBuscar = screen.getByText(/Buscar Tarefas/i);

    fireEvent.click(botaoBuscar);
    expect(botaoAdicionar).toHaveClass('formulario__botao');
  });
});
