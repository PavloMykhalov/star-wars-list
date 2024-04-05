import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import Router from 'next/navigation'; // Changed to next/navigation
import '@testing-library/jest-dom';

// Mocking the push method of Router
jest.mock('next/navigation', () => ({
  push: jest.fn(), // Mocking the push method
}));

describe('Home page', () => {
  test('renders main heading', () => {
    // Rendering the Home component
    render(<Home />);
    
    // Checking if the main heading is rendered correctly
    const mainHeading = screen.getByText(/Explore detail information about your favourite hero/i);
    expect(mainHeading).toBeInTheDocument();
  });

  test('renders "Get started" button', () => {
    // Rendering the Home component
    render(<Home />);
    
    // Checking if the "Get started" button is rendered correctly
    const getStartedButton = screen.getByRole('button', { name: /Get started/i });
    expect(getStartedButton).toBeInTheDocument();
  });
});
