import { Link } from 'react-router-dom';
import classes from './ConteudoNaoAutorizado.module.css';

const ConteudoNaoAutorizado: React.FC = () => {
  return (
    <div className={classes.container}>
      <section className={classes.inicio}>
        <div className={classes['texto-container']}>
          <h1>Acesso restrito.</h1>
          <p>A página que você tentou acessar não está disponível!</p>
          <p>Verifique se você já realizou o Login. O link para as Tarefas estará no cabeçalho caso positivo.</p>
          <p>
            Caso não esteja logado, você pode criar uma conta e/ou realizar login{' '}
            <Link to='/auth'>neste endereço.</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConteudoNaoAutorizado;
