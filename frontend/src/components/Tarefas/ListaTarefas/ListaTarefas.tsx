import React from 'react';
import ItemLista from '../ItemLista/ItemLista';
import classes from './ListaTarefas.module.css';

interface ListaTarefasProps {
  itens: {
    idAPI: string;
    Titulo: string;
    Data: Date;
    Marcado: boolean;
    Status: string;
  }[];
  deletarTarefa: (id: string) => void;
  atualizarTarefa: (id: string, marcado: boolean) => void;
}

const ListaTarefas: React.FC<ListaTarefasProps> = (props) => {
  return (
    <ul className={classes.lista}>
      {props.itens.map((tarefa) => (
        <ItemLista
          {...tarefa}
          key={tarefa.idAPI}
          deletarTarefa={props.deletarTarefa}
          atualizarTarefa={props.atualizarTarefa}
        />
      ))}
    </ul>
  );
};

export default ListaTarefas;
