import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the clinic name', () => {
  render(<App />);
  expect(screen.getAllByText(/Aura Odontologia/i).length).toBeGreaterThan(0);
});

test('renders the main navigation', () => {
  render(<App />);
  expect(screen.getByRole('navigation', { name: /navegación principal/i })).toBeInTheDocument();
});

test('renders the contact form', () => {
  render(<App />);
  expect(screen.getByRole('region', { name: /formulario de contacto/i })).toBeInTheDocument();
});
