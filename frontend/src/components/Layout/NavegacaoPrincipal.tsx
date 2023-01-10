import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../../services/auth-context';
import classes from './NavegacaoPrincipal.module.css';

const NavegacaoPrincipal: React.FC = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const taLogado = authCtx.taLogado;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  };

  return (
    <header className={classes.cabecalho}>
      <Link to='/'>
        <div className={classes.logo}>Tarefas React</div>
      </Link>
      <nav>
        <ul>
          {!taLogado && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {taLogado && (
            <li>
              <Link to='/todo'>Tarefas</Link>
            </li>
          )}
          {taLogado && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavegacaoPrincipal;
