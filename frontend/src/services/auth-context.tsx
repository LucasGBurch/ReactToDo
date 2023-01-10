import React, { createContext, useCallback, useEffect, useState } from 'react';

let logoutTimer: any; // NodeJS.Timeout (+2 overloads)

// ------------------------------------------------
// Adaptando AuthContext para realidade TypeScript:
type authContextType = {
  token: string;
  taLogado: boolean;
  login: (token: string, tempoDaSessao: string) => void;
  logout: () => void;
};

const authContextValores: authContextType = {
  token: '',
  taLogado: false,
  login: (token, tempoDaSessao) => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextValores);
// ------------------------------------------------
// Funções acessórias para o Componente Provider:

// Calcula o tempo restante to token:
const calcularTempoRestante = (tempoDaSessao: string) => {
  const tempoAtual = new Date().getTime();
  const tempoDeExpiracao = new Date(tempoDaSessao).getTime();

  const duracaoRestante = tempoDeExpiracao - tempoAtual;

  return duracaoRestante;
};

// Busca o objeto com o token armazenado e seu tempo de duração:

const buscarTokenArmazenado:
  | {
      token: string | null;
      duracao: number;
    }
  | any = () => {
  // Não aceitava null, testamos com 'any', mas pode haver riscos a verificar depois! https://www.w3schools.com/typescript/typescript_special_types.php
  const tokenArmazenado = localStorage.getItem('token');
  const tempoDaSessaoArmazenado = localStorage.getItem('tempoDaSessao');

  const tempoRestante = calcularTempoRestante(tempoDaSessaoArmazenado!);

  if (tempoRestante <= 60000) {
    // se faltar só 1min...
    localStorage.removeItem('token');
    localStorage.removeItem('tempoDaSessao');
    return null;
  } // Encerra a sessão

  return {
    token: tokenArmazenado,
    duracao: tempoRestante,
  };
};

// ------------------------------------------------
type AuthContextProviderProps = {
  children: JSX.Element;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const dadosToken = buscarTokenArmazenado();
  let tokenInicial;
  if (dadosToken) {
    // se houver dados
    tokenInicial = dadosToken.token;
  }

  const [token, setToken] = useState<string>(tokenInicial);

  const usuarioTaLogado = !!token;
  // !! é 'not not': convertendo em booleano true ou false (string com conteúdo ou vazia);

  const logoutHandler = useCallback(() => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('tempoDaSessao');

    if (logoutTimer) {
      // Se há timer do logoutHandler (no useEffect abaixo)
      clearTimeout(logoutTimer); // Então limpamos o timeout;
    }
  }, []); // callback para armazenar o método na memória e evitar possíveis loops lá no useEffect do final (ainda não entendi essa conceito 100%, mas por instrução dos cursos vou manter a prática);

  const loginHandler = (token: string, tempoDaSessao: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('tempoDaSessao', tempoDaSessao); // string para usarmos em Date() da função calcular.

    const tempoRestante = calcularTempoRestante(tempoDaSessao);
    // Nosso callback acima é chamado aqui (tempo em ms):
    logoutTimer = setTimeout(logoutHandler, tempoRestante);
  };

  // useEffect hook para mudanças dos dados do Token (exceto pela inicialização nula do início):
  useEffect(() => {
    if (dadosToken) {
      console.log(dadosToken.duracao); // Reduz a cada F5 para testar no console;
      logoutTimer = setTimeout(logoutHandler, dadosToken.duracao);
    }
  }, [dadosToken, logoutHandler]);

  const contextValue: authContextType = {
    token: token,
    taLogado: usuarioTaLogado,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
