import { fireEvent, render, screen } from '@testing-library/react';
import ItemLista from '../ItemLista/ItemLista';
import NovaTarefa from './NovaTarefa';

describe('após escrever um valor qualquer no campo de texto e clicar no botão adicionar, este vai aparecer na listagem', () => {
  test('O valor no parágrafo da lista é o mesmo registrado no array de objetos Tarefa', () => {
    const adicionarTarefa = jest.fn();
    const deletarTarefa = jest.fn();
    const atualizarTarefa = jest.fn();

    render(
      <div>
        <NovaTarefa adicionarTarefa={adicionarTarefa} buscou />
      </div>
    );

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

    const botaoAdicionar = screen.getByText('Adicionar');
    const paragrafoTarefa = screen.getByText('Primeira Tarefa')

    fireEvent.click(botaoAdicionar);

    expect(paragrafoTarefa).toHaveTextContent(tarefas[0].Titulo);
  });
});
