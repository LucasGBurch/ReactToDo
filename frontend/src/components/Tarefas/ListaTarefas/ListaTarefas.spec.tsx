import { fireEvent, render, screen } from '@testing-library/react';
import ListaTarefas from './ListaTarefas';

describe('componente de apresentação está executando suas funções', () => {
  test('botão de remover tarefa da lista ativa a função correspondente', () => {
    const deletarTarefa = jest.fn();
    const atualizarTarefa = jest.fn();

    const estadoTarefas = [
      {
        id: '01',
        idAPI: '1',
        Titulo: 'Primeira Tarefa',
        Data: new Date(),
        Marcado: false,
        Status: 'Em andamento',
      },
    ];

    render(
      <ListaTarefas
        deletarTarefa={deletarTarefa}
        atualizarTarefa={atualizarTarefa}
        itens={estadoTarefas}
      />
    );

    const botaoRemover = screen.getByText(/Remover da lista/i);
    fireEvent.click(botaoRemover);
    expect(deletarTarefa).toBeCalled();
  });
});
