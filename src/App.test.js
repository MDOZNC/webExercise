import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Mock child components to isolate testing to the App component
jest.mock('./components/NavigatonBar', () => () => (
    <div>
      NavigationBar
      <input placeholder="Search" /> {/* Mock the input element */}
    </div>
  ));
jest.mock('./pages/ProductList', () => () => <div>ProductList</div>);
jest.mock('./pages/ProductDetail', () => () => <div>ProductDetail</div>);

describe('App', () => {
  it('renders without crashing', () => {
    render(
        <App />
    );
    screen.debug();
    expect(screen.getByText('NavigationBar')).toBeInTheDocument();
    expect(screen.getByText('ProductList')).toBeInTheDocument();
  });


  it('passes allProducts to ProductList and NavigationBar', () => {
    render(
        <App />
    );
    // Since components are mocked, you cannot directly check props, but you can ensure they are rendered.
    expect(screen.getByText('NavigationBar')).toBeInTheDocument();
    expect(screen.getByText('ProductList')).toBeInTheDocument();
  });

  it('updates searchText state correctly', () => {
    render(
        <App />
    );
    // Simulate user input in the NavigationBar's search input
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'new search' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    // Check if the searchText state is updated
    // This requires either checking the component's output or ensuring a function was called
  });

  it('filters products correctly based on searchText and sliderValue', () => {
    // This test would ideally check if filterProducts is called correctly and returns the expected result
  });

  // Additional tests can be added here to cover other functionalities and scenarios
});
