import { render } from '@testing-library/react';
import FormularioAuth from './FormularioAuth';

describe('o formulário está renderizando', () => {
  test('render do formulário', () => {
    render(<FormularioAuth />);
  });
});
