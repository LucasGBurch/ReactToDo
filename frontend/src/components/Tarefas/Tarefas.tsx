import React, { useState } from 'react';
import useDados from '../../services/hooks/use-dados';

import NovaTarefa from './NovaTarefa/NovaTarefa';
import ListaTarefas from './ListaTarefas/ListaTarefas';
import classes from './Tarefas.module.css';

const Tarefas: React.FC = () => {
  // CHAMADA DO CUSTOM HOOK QUE MANIPULA OS DADOS:
  const {
    buscadorDeTarefas,
    adicionaTarefa,
    excluiTarefa,
    atualizaTarefa,
    mensagemErro,
    mensagemExecutando,
    mensagemSucesso,
    estadoTarefas,
  } = useDados();

  // CHAMADA DE STATE HOOK:
  const [buscou, setBuscou] = useState<boolean>(false);

  // BUSCA DE TAREFAS
  const buscaTarefasHandler = () => {
    buscadorDeTarefas();
    // settar direto true para evitar bug de desabilitar botão de novo:
    setBuscou(true);
  };

  // CRIAÇÃO DE TAREFAS:
  const addTarefaHandler = (texto: string) => {
    adicionaTarefa(texto);
  };

  // EXCLUSÃO DE TAREFAS:
  const deletaTarefaHandler = (tarefaId: string) => {
    excluiTarefa(tarefaId);
  };

  // ATUALIZAÇÃO DE TAREFAS:
  const atualizaTarefaHandler = (tarefaId: string, marcado: boolean) => {
    atualizaTarefa(tarefaId, marcado);
  };

  const erro = mensagemErro && <p className={classes.erro}>{mensagemErro}</p>;
  const executando = mensagemExecutando && (
    <p className={classes.sucesso}>{mensagemExecutando}</p>
  );
  const sucesso = mensagemSucesso && (
    <p className={classes.sucesso}>{mensagemSucesso}</p>
  );

  return (
    <div className={classes.container}>
      <NovaTarefa adicionarTarefa={addTarefaHandler} buscou={buscou} />

      <button className={classes.botao} onClick={buscaTarefasHandler}>
        Buscar Tarefas
      </button>

      {erro}
      {executando}
      {sucesso}

      {buscou && <ListaTarefas
        deletarTarefa={deletaTarefaHandler}
        atualizarTarefa={atualizaTarefaHandler}
        itens={estadoTarefas}
      />}
    </div>
  );
};

export default Tarefas;
