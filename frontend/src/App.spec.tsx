import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('a aplicação está renderizando', () => {
  test('render de App', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
