import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import CharacterItem from "@/components/CharacterItem";

describe('CharacterItem', () => {
  const character = {
    name: 'Luke Skywalker'
  };

  test('renders character name', () => {
    //render component CharacterItem
    render(<CharacterItem character={character} openModal={() => {}} />);
    //find text element with character name
    const nameElement = screen.getByText(character.name);
    // testing if text element is placed on DOM
    expect(nameElement).toBeInTheDocument();
  });

  test('calls openModal function when clicked on item', () => {
    // creating moc-function for openModal
    const mockOpenModal = jest.fn();

    //render component
    render(<CharacterItem character={character} openModal={mockOpenModal} />);

    //click on the element
    fireEvent.click(screen.getByText(character.name));

    //testing if function called with argument
    expect(mockOpenModal).toHaveBeenCalledWith(character);
  });
})

