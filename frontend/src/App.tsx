import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import SpinnerDeCarregar from './components/UI/SpinnerDeCarregar';
import AuthContext from './services/auth-context';

/* Imports com lazy(); Quando implementada, o Switch foi envolvido com <Suspense fallback={componente com estilo de roda giratória}> */

const PaginaInicial = React.lazy(() => import('./pages/PaginaInicial'));
const PaginaAuth = React.lazy(() => import('./pages/PaginaAuth'));
const PaginaInexistente = React.lazy(() => import('./pages/PaginaInexistente'));
const PaginaNaoAutorizada = React.lazy(
  () => import('./pages/PaginaNaoAutorizada')
);
const PaginaTarefas = React.lazy(() => import('./pages/PaginaTarefas'));

const App: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centraliza'>
            <SpinnerDeCarregar />
          </div>
        }
      >
        <Switch>
          <Route path='/' exact>
            <PaginaInicial />
          </Route>
          <Route path='/auth'>
            {!authCtx.taLogado && <PaginaAuth />}
            {authCtx.taLogado && <Redirect to='/not-authorized' />}
          </Route>
          <Route path='/todo'>
            {authCtx.taLogado && <PaginaTarefas />}
            {!authCtx.taLogado && <Redirect to='/not-authorized' />}
          </Route>
          <Route path='/not-authorized'>
            <PaginaNaoAutorizada />
          </Route>
          <Route path='/not-found'>
            <PaginaInexistente />
          </Route>
          <Route path='*'>
            <Redirect to='/not-found' />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
