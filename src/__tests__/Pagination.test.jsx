import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

const mockHandlePrevPage = jest.fn();
const mockHandleNextPage = jest.fn();
const mockOnPageChange = jest.fn();

const mockProps = {
  currentPage: 2,
  totalPages: 5,
  handlePrevPage: mockHandlePrevPage,
  handleNextPage: mockHandleNextPage,
  onPageChange: mockOnPageChange,
};

describe('Pagination', () => {
  test('renders buttons and current page correctly', () => {
    render(<Pagination {...mockProps} />);

    // Checking the presence of buttons
    const prevButton = screen.getByAltText('Previous page button');
    const nextButton = screen.getByAltText('Next page button');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Checking the activity of "previous" and "next" buttons
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // Checking the number of page number buttons
    const pageButtons = screen.getAllByRole('button', { name: /[0-9]+/ });
    expect(pageButtons.length).toBe(mockProps.totalPages);

    // Checking the correct active page number
    expect(pageButtons[mockProps.currentPage - 1]).toHaveClass('chakra-button css-16jr0ax');
  });

  test('calls handlers when previous and next buttons are clicked', () => {
    render(<Pagination {...mockProps} />);

    const prevButton = screen.getByAltText('Previous page button');
    const nextButton = screen.getByAltText('Next page button');

    // Clicking on the previous and next buttons
    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    // Checking if the previous and next button click handlers were called
    expect(mockHandlePrevPage).toHaveBeenCalledTimes(1);
    expect(mockHandleNextPage).toHaveBeenCalledTimes(1);
  });

  test('calls onPageChange handler when a page button is clicked', () => {
    render(<Pagination {...mockProps} />);

    const pageButtons = screen.getAllByRole('button', { name: /[0-9]+/ });

    // Clicking on the first page button
    fireEvent.click(pageButtons[0]);

    // Checking if the onPageChange handler was called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

});
