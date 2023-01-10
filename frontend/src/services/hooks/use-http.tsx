import { useCallback, useState } from 'react';

type httpHook = {
  taCarregando: boolean;
  erro: any;
  enviaRequisicao: (requisicaoConfig: any, aplicarDados: any) => Promise<void>;
};

const useHttp = (): httpHook => {
  const [taCarregando, setTaCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const enviaRequisicao = useCallback(
    async (requisicaoConfig: any, aplicarDados: any) => {
      setTaCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(requisicaoConfig.url, {
          method: requisicaoConfig.method ? requisicaoConfig.method : 'GET',
          headers: requisicaoConfig.headers ? requisicaoConfig.headers : {},
          body: requisicaoConfig.body
            ? JSON.stringify(requisicaoConfig.body)
            : null,
        });

        if (!resposta.ok) {
          throw new Error('Erro na requisição!');
        }

        const dados = await resposta.json();
        aplicarDados(dados);
      } catch (erro: any) {
        setErro(erro.message || 'Algo deu errado');
      }
      setTaCarregando(false);
    },
    []
  );

  return {
    taCarregando, // taCarregando: taCarregando
    erro, // erro: erro
    enviaRequisicao, // enviaRequisicao: enviaRequisicao
  };
};

export default useHttp;
