import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterModal from '../components/CharacterModal';
import { getCharacterFilms } from '../api/films';
import { getCharacterStarships } from '../api/starships';

// Object with mocked character data and a function for closing the modal
const mockCharacter = {
  name: 'Luke Skywalker',
  films: ['fake-film-url'],
  starships: ['fake-starship-url'],
};
const mockClose = jest.fn();

// Mocking API functions
jest.mock('../api/films', () => ({
  getCharacterFilms: jest.fn().mockResolvedValue(['Film 1', 'Film 2']), // Mocking the function to get character films
}));

jest.mock('../api/starships', () => ({
  getCharacterStarships: jest.fn().mockResolvedValue(['Starship 1', 'Starship 2']), // Mocking the function to get character starships
}));

describe('CharacterModal', () => {
  // Test to fetch films and starships when the modal is opened
  test('fetches films and starships when modal is opened', async () => {
    render(<CharacterModal character={mockCharacter} isOpen={true} onClose={mockClose} />);
    
    await act(async () => { 
      // Checking if the function to get films was called with the correct parameters
      await waitFor(() => expect(getCharacterFilms).toHaveBeenCalledWith(mockCharacter.films)); 
      // Checking if the function to get starships was called with the correct parameters
      await waitFor(() => expect(getCharacterStarships).toHaveBeenCalledWith(mockCharacter.starships)); 
    });
  });

  // Test to render character name in the modal header and first node
  test('renders character name in the modal header and first node', async () => {
    render(<CharacterModal character={mockCharacter} isOpen={true} onClose={mockClose} />);
    await act(async () => { 
      const modalHeaders = screen.getAllByText(mockCharacter.name); // Getting all headers containing the character name
      expect(modalHeaders.length).toBe(2); // Checking that the character name is displayed in two headers
    });
  });

  // Test to call onClose function when modal is closed
  test('calls onClose when modal is closed', async () => {
    render(<CharacterModal character={mockCharacter} isOpen={true} onClose={mockClose} />);
    const closeButton = screen.getByLabelText('Close'); // Getting the close button of the modal

    act(() => {
      fireEvent.click(closeButton); // Simulating a click on the close button
      expect(mockClose).toHaveBeenCalled(); // Checking that the function to close the modal was called
    });
  });
});
