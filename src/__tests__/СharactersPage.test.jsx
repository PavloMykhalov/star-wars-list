import { render, screen } from '@testing-library/react';
import { getCharacters } from "../api/characters";
import CharactersPage from "../app/characters/page";

// Mocking the getCharacters function
jest.mock('../api/characters', () => ({
  getCharacters: jest.fn().mockResolvedValue({ characters: [], count: 0 }),
}));

// Mocking useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CharactersPage', () => {
  it('renders loading spinner when characters are being fetched', async () => {
    // Passing isLoading=true to trigger the loading spinner display
    render(<CharactersPage isLoading={true} />);
    
    // Checking if the loading spinner is present on the page
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders characters list when characters are fetched', async () => {
    // Mocking the result of fetching characters
    const characters = [
      { id: 1, name: 'Luke Skywalker' },
      { id: 2, name: 'Darth Vader' },
    ];
    getCharacters.mockResolvedValueOnce({ characters, count: 2 });

    // Rendering the component
    render(<CharactersPage />);

    // Expecting the CharactersList component to be displayed after characters are loaded
    await screen.findByText('Luke Skywalker');
    await screen.findByText('Darth Vader');

    // Checking if the characters are displayed on the page
    const lukeElement = screen.getByText('Luke Skywalker');
    const vaderElement = screen.getByText('Darth Vader');
    expect(lukeElement).toBeInTheDocument();
    expect(vaderElement).toBeInTheDocument();
  });
});
