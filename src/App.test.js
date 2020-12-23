import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: Целиком этот файл - в мусорку + выпили библиотеку @testing-library/react из package.json
// TODO: В целом везде логика такая: не использутся - удали!
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
