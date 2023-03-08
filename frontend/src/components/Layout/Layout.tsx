import { Fragment } from 'react';
import NavegacaoPrincipal from './NavegacaoPrincipal';

type LayoutProps = {
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <NavegacaoPrincipal />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
