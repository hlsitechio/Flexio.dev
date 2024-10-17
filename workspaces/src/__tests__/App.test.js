import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Flexio.dev title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Flexio\.dev/i);
  expect(titleElement).toBeInTheDocument();
});