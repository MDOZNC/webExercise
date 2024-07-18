import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationBar from '../components/NavigatonBar';

// Mock necessary props
const mockSetProducts = jest.fn();
const mockSetSearchText = jest.fn();

describe('NavigationBar', () => {
  beforeEach(() => {
    render(
      <NavigationBar
        allProducts={[]}
        products={[]}
        setProducts={mockSetProducts}
        searchText=""
        setSearchText={mockSetSearchText}
        sliderValue={0}
      />
    );
  });

  test('renders without crashing', () => {
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByText('MAGAZINE')).toBeInTheDocument();
  });

  test('search functionality', () => {
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'new search' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    expect(mockSetSearchText).toHaveBeenCalledWith('new search');
  });

});
