import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetail from './ProductDetail';
import { BrowserRouter } from 'react-router-dom';

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      product: {
        title: "Example Product",
        type: "Gadget",
        description: "This is a sample description of a product.",
        price: "299",
        productImg: ["image1.jpg","image2.jpg"]
      }
    }
  })
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );
  });

  test('renders product details correctly', () => {
    expect(screen.getByText('Example Product')).toBeInTheDocument();
    expect(screen.getByText('Gadget')).toBeInTheDocument();
    expect(screen.getByText('This is a sample description of a product.')).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /Product View/i })[0]).toHaveAttribute('src', '../image1.jpg');
  });

  test('carousel functionality and button interactions', () => {
    // Additional tests can be written here to simulate user interactions
    // such as clicking the carousel controls or the buy button.
  });
});
