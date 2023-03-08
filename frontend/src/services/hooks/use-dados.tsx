import { useState } from 'react';
import { Tarefa } from '../../components/Tarefas/tarefa.model';
import useHttp from './use-http';

// const recarregaPagina = () => window.location.reload();

type dadosHook = {
  buscadorDeTarefas: () => Tarefa[];
  adicionaTarefa: (texto: string) => void;
  excluiTarefa: (tarefaId: string) => void;
  atualizaTarefa: (tarefaId: string, marcado: boolean) => void;
  mensagemErro: string | boolean;
  mensagemExecutando: string | boolean;
  mensagemSucesso: string | boolean;
  estadoTarefas: Tarefa[];
};

const useDados = (): dadosHook => {
  // ------------------------------------
  // CHAMADA DE CUSTOM HOOKS:
  const { enviaRequisicao: buscaTarefas, erro: erroBusca } = useHttp();

  const { enviaRequisicao: enviarTarefa, erro: erroAdd } = useHttp();

  const { enviaRequisicao: deletaTarefa, erro: erroDeleta } = useHttp();

  const { enviaRequisicao: atualizarTarefa, erro: erroAtualiza } = useHttp();

  // ------------------------------------
  // CHAMADA DE STATE HOOKS:
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [mensagemExecutando, setMensagemExecutando] = useState<string>('');
  const [mensagemSucesso, setMensagemSucesso] = useState<string>('');

  // Funções acessórias:
  const existeTarefa = (texto: string) => {
    return tarefas.find((tarefa) => tarefa.Titulo === texto);
  };

  const existeId = (tarefaId: string) => {
    return tarefas.find((tarefa) => tarefa.idAPI === tarefaId);
  };

  const tarefaEhValida = (texto: string) => {
    if (texto.length > 2) return true;
  };

  // ------------------------------------
  // BUSCA DE TAREFAS na API
  const tarefasTransformadas = (objetoTarefas: any) => {
    setTarefas((tarefasAnteriores) => {
      const tarefasCarregadas = [...tarefasAnteriores];

      for (const chave in objetoTarefas) {
        const naoTaNaLista =
          !existeTarefa(objetoTarefas[chave].Titulo) &&
          !existeId(objetoTarefas[chave].idAPI);
        // If para tratar busca tarefas para não repetir na lista
        if (naoTaNaLista) {
          tarefasCarregadas.unshift({
            idAPI: objetoTarefas[chave].idAPI,
            Titulo: objetoTarefas[chave].Titulo,
            Data: objetoTarefas[chave].Data,
            Marcado: objetoTarefas[chave].Marcado,
            Status: objetoTarefas[chave].Status,
          });
        }
      }
      setMensagemExecutando('');
      if (tarefasCarregadas.length === 0) {
        setMensagemSucesso('Ainda não existem tarefas no banco.');
      } else {
        setMensagemSucesso('Tarefas Carregadas!');
      }
      return tarefasCarregadas;
    });
    // console.log(tarefasCarregadas); // Console para testar se o objeto está vindo
  };

  const buscadorDeTarefas = () => {
    setMensagemExecutando('Buscando Tarefas...');
    buscaTarefas(
      {
        url: 'https://6387a14cd9b24b1be3f61500.mockapi.io/api/todo',
      },
      tarefasTransformadas
    );

    setTimeout(() => {
      setMensagemExecutando('');
      setMensagemSucesso(''); // e remove o aviso
    }, 3000); // em 3 segundos

    return tarefas;
  };

  // ------------------------------------
  // CRIAÇÃO DE TAREFAS:
  const criadorDeTarefa = (texto: string, idAPI: string) => {
    setTarefas((tarefasAnteriores) => {
      const tarefasAtualizadas = [...tarefasAnteriores];

      tarefasAtualizadas.unshift({
        idAPI,
        Titulo: texto,
        Data: new Date(),
        Marcado: false,
        Status: 'Em andamento',
      });

      return tarefasAtualizadas;
    });
  };

  const adicionaTarefa = (texto: string) => {
    const tarefaEhNova = !existeTarefa(texto) && tarefaEhValida(texto);
    if (tarefaEhNova) {
      // Solução conservadora para preservar o id:
      // TESTAR ESSA PRIMEIRA POSIÇÃO EM FUNÇÃO DO UNSHIFT
      let idAPI;
      if (tarefas.length > 0) {
        const incrementaId = +tarefas[0].idAPI + 1;
        idAPI = incrementaId.toString();
        console.log(idAPI);
      } else {
        // Caso o state venha vazio:
        idAPI = '1';
      }
      setMensagemExecutando('Adicionando Tarefa...');
      enviarTarefa(
        {
          url: 'https://6387a14cd9b24b1be3f61500.mockapi.io/api/todo',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            idAPI,
            Titulo: texto,
            Data: new Date(),
            Marcado: false,
            Status: 'Em andamento',
          },
        },
        criadorDeTarefa.bind(null, texto, idAPI)
      );

      setMensagemExecutando('');
      setMensagemSucesso('Tarefa Adicionada!'); // mostra o aviso
      setTimeout(() => {
        setMensagemSucesso(''); // e remove o aviso
      }, 3000); // em 3 segundos
    } else if (existeTarefa(texto)) {
      alert('Essa tarefa já existe na lista! Tente usar outro título.');
    } else if (!tarefaEhValida(texto)) {
      alert('Título precisa ter 3 caracteres ou mais.');
    }
  };

  // ------------------------------------
  // EXCLUSÃO DE TAREFAS:
  const deletadorDeTarefa = (tarefaId: string) => {
    setTarefas((tarefasAnteriores) => {
      return tarefasAnteriores.filter((tarefa) => tarefa.idAPI !== tarefaId);
    });
  };

  const excluiTarefa = (tarefaId: string) => {
    const tarefaDeletada = tarefas.filter(
      (tarefa) => tarefa.idAPI === tarefaId
    );
    // console.log(tarefaDeletada); // console para ver a tarefa enquanto eu ajustava problemas com ids
    // Aqui e em atualizar, a mockAPI me obriga a usar o id da API para a url:
    const idAPI = tarefaDeletada[0].idAPI;
    setMensagemExecutando('Deletando Tarefa...');
    deletaTarefa(
      {
        url: `https://6387a14cd9b24b1be3f61500.mockapi.io/api/todo/${idAPI}`,
        method: 'DELETE',
      }, // Quando tem argumentos na função de aplicar, PRECISA DO BIND:
      deletadorDeTarefa.bind(null, tarefaId)
    );

    setMensagemExecutando('');
    setMensagemSucesso('Tarefa Deletada!'); // mostra o aviso // mostra o aviso
    setTimeout(() => {
      setMensagemSucesso(''); // e remove o aviso
    }, 3000); // em 3 segundos
  };

  // ------------------------------------
  // ATUALIZAÇÃO DE TAREFAS:
  const atualizadorDeTarefas = (tarefaId: string, marcado: boolean) => {
    setTarefas((tarefasAnteriores) => {
      const tarefasAtualizacao = [...tarefasAnteriores];

      const tarefasNovas = tarefasAtualizacao.map((tarefa) => {
        if (tarefa.idAPI === tarefaId) {
          tarefa.Marcado = !marcado;
          tarefa.Status = tarefa.Marcado ? 'Concluída!' : 'Em andamento';
        }
        return tarefa;
      });

      // console.log(tarefasNovas); // console de teste
      return tarefasNovas;
    });
  };

  const atualizaTarefa = (tarefaId: string, marcado: boolean) => {
    const tarefaAtualizada = tarefas.filter(
      (tarefa) => tarefa.idAPI === tarefaId
    );
    // console.log(tarefaAtualizada); // console de teste

    const idAPI = tarefaAtualizada[0].idAPI;
    const Titulo = tarefaAtualizada[0].Titulo;
    const Data = tarefaAtualizada[0].Data;
    const Marcado = !marcado;

    setMensagemExecutando('Atualizando Tarefas...');
    atualizarTarefa(
      {
        url: `https://6387a14cd9b24b1be3f61500.mockapi.io/api/todo/${idAPI}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: {
          idAPI,
          Titulo,
          Data,
          Marcado,
          Status: Marcado ? 'Concluída!' : 'Em andamento',
        },
      },
      atualizadorDeTarefas.bind(null, tarefaId, marcado)
    );

    setMensagemExecutando('');
    setMensagemSucesso('Tarefa Atualizada!'); // mostra o aviso
    setTimeout(() => {
      setMensagemSucesso(''); // e remove o aviso
    }, 3000); // em 3 segundos
  };

  //------------------------------------
  // Ternários removidos e trocados por State de mensagens dentro dos métodos
  // Mas teve um que não consegui fazer settando, pois o catch não pega de jeito nenhum:

  const mensagemErro = erroBusca || erroAdd || erroAtualiza || erroDeleta;

  // ESTADO DAS TAREFAS:

  const estadoTarefas = tarefas;

  // RETORNO DO HOOK
  return {
    buscadorDeTarefas,
    adicionaTarefa,
    excluiTarefa,
    atualizaTarefa,
    mensagemErro,
    mensagemExecutando,
    mensagemSucesso,
    estadoTarefas,
  };
};

export default useDados;
