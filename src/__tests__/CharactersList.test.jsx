import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import CharactersList from '../components/CharactersList';

describe('CharactersList', () => {
  const characters = [
    { name: 'Luke Skywalker', birthYear: '19BBY' },
    { name: 'Leia Organa', birthYear: '19BBY' },
    { name: 'Han Solo', birthYear: '29BBY' },
  ];

  test('renders list of characters', () => {
    //render component
    render(<CharactersList characters={characters} />);

    //check if all characters placed in DOM
    characters.forEach(character => {
      const characterElement = screen.getByText(character.name);
      expect(characterElement).toBeInTheDocument();
    })
  });
})