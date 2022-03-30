import { render, screen, queryAllByAttribute, getByTestId } from '@testing-library/react';
import App from './App';
import Header from './components/Header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/main-logo.svg/i);
  expect(linkElement).toBeInTheDocument();
});
