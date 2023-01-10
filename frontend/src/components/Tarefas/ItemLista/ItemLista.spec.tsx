import { fireEvent, render, screen } from '@testing-library/react';
import ItemLista from './ItemLista';

describe("o botão 'Remover da Lista' está visível, o Título fica rasurado ao clicar na checkbox e o Status da tarefa muda", () => {
  test("o botão 'Remover da Lista' está visível", () => {
    const deletarTarefa = jest.fn();
    const atualizarTarefa = jest.fn();

    const tarefas = [
      {
        id: '01',
        idAPI: '1',
        Titulo: 'Primeira Tarefa',
        Data: new Date(),
        Marcado: false,
        Status: '',
      },
    ];

    render(
      <div>
        {tarefas.map((tarefa) => (
          <ItemLista
            {...tarefa}
            key={tarefa.id}
            deletarTarefa={deletarTarefa}
            atualizarTarefa={atualizarTarefa}
          />
        ))}
      </div>
    );
    const botaoRemover = screen.getByText(/Remover da lista/i);
    expect(botaoRemover).toBeVisible();
  });

  test('o Título fica rasurado ao clicar na checkbox', () => {
    const deletarTarefa = jest.fn();
    const atualizarTarefa = jest.fn();

    const tarefas = [
      {
        id: '1',
        idAPI: '1',
        Titulo: 'Primeira Tarefa',
        Data: new Date(),
        Marcado: false,
        Status: '',
      },
    ];

    render(
      <div>
        {tarefas.map((tarefa) => (
          <ItemLista
            {...tarefa}
            key={tarefa.id}
            deletarTarefa={deletarTarefa}
            atualizarTarefa={atualizarTarefa}
          />
        ))}
      </div>
    );

    const checkbox = screen.getByRole('checkbox');
    const itemTexto = screen.getByText(/Primeira Tarefa/i);

    fireEvent.click(checkbox);
    expect(itemTexto).toHaveClass('lista__itens--nome-rasura');
  });

  test('o Status da tarefa muda de "Em andamento" para "Concluída!" ao marcar a checkbox', () => {
    const deletarTarefa = jest.fn();
    const atualizarTarefa = jest.fn();

    const tarefas = [
      {
        id: '1',
        idAPI: '1',
        Titulo: 'Primeira Tarefa',
        Data: new Date(),
        Marcado: false,
        Status: 'Em andamento',
      },
    ];

    render(
      <div>
        {tarefas.map((tarefa) => (
          <ItemLista
            {...tarefa}
            key={tarefa.id}
            deletarTarefa={deletarTarefa}
            atualizarTarefa={atualizarTarefa}
          />
        ))}
      </div>
    );

    const checkbox = screen.getByRole('checkbox');
    const itemStatus = screen.getByText('Em andamento');

    fireEvent.click(checkbox);
    expect(itemStatus).toHaveTextContent('Concluída!');
  });

  test('o Status da tarefa muda de "Concluída!" para "Em andamento" ao desmarcar a checkbox', () => {
    const deletarTarefa = jest.fn();
    const atualizarTarefa = jest.fn();

    const tarefas = [
      {
        id: '1',
        idAPI: '1',
        Titulo: 'Primeira Tarefa',
        Data: new Date(),
        Marcado: true,
        Status: 'Em andamento',
      },
    ];

    render(
      <div>
        {tarefas.map((tarefa) => (
          <ItemLista
            {...tarefa}
            key={tarefa.id}
            deletarTarefa={deletarTarefa}
            atualizarTarefa={atualizarTarefa}
          />
        ))}
      </div>
    );

    const checkbox = screen.getByRole('checkbox');
    const itemStatus = screen.getByText('Concluída!');

    fireEvent.click(checkbox);
    expect(itemStatus).toHaveTextContent('Em andamento');
  });
});
