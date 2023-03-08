import { useState } from 'react';

import { Tarefa } from '../tarefa.model';
import classes from './ItemLista.module.css';

type ItemListaProps = Tarefa & {
  deletarTarefa: (id: string) => void;
  atualizarTarefa: (id: string, marcado: boolean) => void;
};

const ItemLista = ({
  idAPI,
  Titulo,
  Marcado,
  Status,
  deletarTarefa,
  atualizarTarefa,
}: ItemListaProps) => {
  const [marcado, setMarcado] = useState<boolean>(Marcado);

  const marcadoHandler = () => {
    setMarcado((marcado) => !marcado);
    atualizarTarefa(idAPI, marcado);
    // Provavelmente este marcado passado com o id ainda não mudou porque o setState é assíncrono. É por isso que lá no container de todas as tarefas nos ainda mudamos o marcado com ! para manipular a mudança dos dados;
    // Aqui ele setta para já indicar visualmente no Item, assim como a mudança de Status e seus estilos.
  };

  if (marcado) {
    Status = 'Concluída!';
  } else {
    Status = 'Em andamento';
  }

  return (
    <li className={classes.lista__itens}>
      <p
        className={`${
          marcado
            ? classes['lista__itens--nome-rasura']
            : classes['lista__itens--nome']
        }`}
      >
        {Titulo}
      </p>

      <div className={classes['lista__itens--acoes']}>
        <span className={classes['lista__itens--checkbox']}>
          <input checked={marcado} type='checkbox' onChange={marcadoHandler} />
          Concluir
        </span>
        <button
          className={classes['lista__itens--botao']}
          onClick={() => deletarTarefa(idAPI)}
        >
          Remover da lista
        </button>
      </div>
      <p
        className={
          classes[
            `${
              marcado
                ? 'lista__itens--status-concluida'
                : 'lista__itens--status-andamento'
            }`
          ]
        }
      >
        {Status}
      </p>
    </li>
  );
};

export default ItemLista;
