import { useContext } from 'react';
import AuthContext from '../../../services/auth-context';
import classes from './ConteudoInicial.module.css';

const ConteudoInicial: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const taLogado = authCtx.taLogado;

  return (
    <div className={classes.container}>
      <section className={classes.inicio}>
        <div className={classes['texto-container']}>
          <h1>Aplicação de Tarefas React</h1>
          <p>Bem-vindo!</p>
        </div>
        <div className={classes['texto-container']}>
          {!taLogado && <p>
            Você pode registrar sua conta e fazer login clicando no canto superior
            direito da tela.
          </p>}
          {taLogado && <p>
            Se estiver logado, você já pode cadastrar suas tarefas no sistema!
          </p> &&
          <p>Verifique suas opções no cabeçalho da tela.</p>}
        </div>
      </section>
    </div>
  );
};

export default ConteudoInicial;
