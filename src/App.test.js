import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand element', () => {
  render(<App />);

  const element = screen.getByText(/Microblog/);

  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('navbar-brand');
});
