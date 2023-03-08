import { useState } from 'react';

import classes from './FormularioAuth.module.css';
import useLogin from '../../services/hooks/use-login';
import { firebaseConfig } from '../../constants/config';

const FormularioAuth: React.FC = () => {
  // Custom Hook:
  const { taCarregando, enviaRequisicao } = useLogin();

  // State Hooks:
  const [inputUsuario, setInputUsuario] = useState({ email: '', senha: '' });
  const [ehLogin, setEhLogin] = useState<boolean>(true);

  const trocarFuncaoHandler = () => {
    setEhLogin((estadoAnterior) => !estadoAnterior);
  };

  const digitaEmailHandler = (evento: any) => {
    setInputUsuario((estadoAnterior) => {
      return { ...estadoAnterior, email: evento.target.value };
    });
  };

  const digitaSenhaHandler = (evento: any) => {
    setInputUsuario((estadoAnterior) => {
      return { ...estadoAnterior, senha: evento.target.value };
    });
  };

  const submitHandler = (evento: any) => {
    evento.preventDefault();
    // Exclamação para indicar que sabemos que pode ser null de início:

    const emailDigitado = inputUsuario.email;
    const senhaDigitada = inputUsuario.senha;

    let url: string; // Temos uma para LOGAR e outra para CADASTRAR

    /* Instruções para gerar as url:
    https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    Obtenção das Chaves/Key da API: Configurações do projeto (Firebase) > Geral */

    const chaveAuth = firebaseConfig.apiKey;
    if (ehLogin) {
      url = `${firebaseConfig.urlLogin}${chaveAuth}`;
    } else {
      url = `${firebaseConfig.urlCadastro}${chaveAuth}`;
    } // Ambas as Requisições são do tipo POST!

    enviaRequisicao(emailDigitado, senhaDigitada, url, ehLogin);

    // Limpando inputs após executar:
    setInputUsuario({
      email: '',
      senha: '',
    });
  };

  return (
    <section className={classes.autenticacao}>
      <h1>{ehLogin ? 'Entrar' : 'Cadastrar'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.controle}>
          <label htmlFor='email'>Digite seu e-mail</label>
          <input
            type='email'
            id='email'
            required
            value={inputUsuario.email}
            onChange={digitaEmailHandler}
          />
        </div>
        <div className={classes.controle}>
          <label htmlFor='password'>Digite sua senha</label>
          <input
            type='password'
            id='password'
            required
            value={inputUsuario.senha}
            onChange={digitaSenhaHandler}
          />
        </div>
        <div className={classes.acoes}>
          {!taCarregando && (
            <button>{ehLogin ? 'Login' : 'Criar Usuario'}</button>
          )}
          {taCarregando && <p>Enviando requisição...</p>}
          <button
            type='button'
            className={classes.mudar}
            onClick={trocarFuncaoHandler}
          >
            {ehLogin ? 'Criar Novo Usuario' : 'Logar com Usuario Existente'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormularioAuth;
