import { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../auth-context';

type loginHook = {
  taCarregando: boolean;
  enviaRequisicao: (
    emailRecebido: string,
    senhaRecebida: string,
    url: string,
    ehLogin: boolean
  ) => Promise<void>;
};

const useLogin = (): loginHook => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [taCarregando, setTaCarregando] = useState<boolean>(false);

  const enviaRequisicao = useCallback(
    async (
      emailRecebido: string,
      senhaRecebida: string,
      url: string,
      ehLogin: boolean
    ) => {
      try {
        const resposta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: emailRecebido,
            password: senhaRecebida,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTaCarregando(false); // Firebase restringe email inválido e senha fraca (length < 6)
        const dados = await resposta.json();

        if (!resposta.ok) {
          let mensagemDeErro: any; // any porque o TS não sabe o que vai vir lá do servidor
          if (dados && dados.error && dados.error.message) {
            mensagemDeErro = dados.error.message;
          }
          throw new Error(mensagemDeErro);
        } // Tratamento de erro para caso ele exista nos dados (lógica acima)

        if (ehLogin) {
          // Agora lógica do Token com Context API (só se for login)
          // expiresIn é um Response Payload da API do Firebase:
          const tempoDeExpiracao: Date = new Date(
            new Date().getTime() + +dados.expiresIn * 1000
          ); // Conversões: +number e * 1000 para ms

          // Agora o AuthContext brilha (será?):
          authCtx.login(dados.idToken, tempoDeExpiracao.toISOString()); // Passamos as string de argumentos
          history.replace('/todo'); // Só redireciona se for pra login;
        }
      } catch (erro: any) {
        alert(erro.message);
      }
    },
    [authCtx, history]
  );

  return {
    taCarregando,
    enviaRequisicao,
  };
};

export default useLogin;
