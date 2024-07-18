import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
 
// Mock fetch
fetchMock.enableMocks();
 
beforeEach(() => {
    fetch.resetMocks();
});
 
const mockSetAllProducts = jest.fn();
const mockSetProducts = jest.fn();
const mockSetSliderValue = jest.fn();
 
 
describe('ProductList Component', () => {
    const mockProducts = [
        { id: 1, title: 'Product 1', price: '500',  productImg: ['/path/to/image1.jpg'] },
        { id: 2, title: 'Product 2', price: '1500', productImg: ['/path/to/image2.jpg'] },
        { id: 3, title: 'Product 3', price: '10500', productImg: ['/path/to/image3.jpg'] }
    ];
    beforeEach(() => {
        fetch.mockClear();
    });
 
    it('fetches products and displays them', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            items: [
                { id: 1, title: 'Product 1', price: '500', productImg: ['/path/to/image1.jpg'] },
                { id: 2, title: 'Product 2', price: '1500', productImg: ['/path/to/image2.jpg'] },
                { id: 3, title: 'Product 3', price: '10500', productImg: ['/path/to/image3.jpg'] }
            ]
        }));
 
        render(
            <BrowserRouter>
                <ProductList
                    allProducts={[]}
                    setAllProducts={mockSetAllProducts}
                    products={mockProducts}
                    sliderValue={1000}
                    setSliderValue={() => { }}
                    searchText=""
                    setProducts={mockSetProducts}
                />
            </BrowserRouter>
        );
 
        // Check if fetch was called
        expect(fetch).toHaveBeenCalledTimes(1);
        // expect(screen.getByText('No Items Found')).toBeInTheDocument();
 
        // Wait for the products to be displayed
        await waitFor(() => {
            expect(mockSetAllProducts).toHaveBeenCalled();
        });
        expect(screen.getByAltText(/Product 1/i)).toHaveAttribute('src', '/path/to/image1.jpg')
    });
 
    it('displays "No Items Found" when no products are available and not loading', () => {
        render(
            <BrowserRouter>
                <ProductList
                    allProducts={[]}
                    setAllProducts={mockSetAllProducts}
                    products={[]}
                    sliderValue={1000}
                    setSliderValue={() => { }}
                    searchText=""
                    setProducts={mockSetProducts}
                />
            </BrowserRouter>
        );
        const slider = screen.getByTestId('price-range');
        fireEvent.change(slider, { target: { value: '500' } });
 
        expect(screen.getByText('No Items Found')).toBeInTheDocument();
    });
 
    it('filters products based on slider value', async () => {
 
        render(
            <BrowserRouter>
                <ProductList
                    allProducts={mockProducts}
                    setAllProducts={() => { }}
                    products={[]}
                    sliderValue={1000}
                    setSliderValue={mockSetSliderValue}
                    searchText=""
                    setProducts={mockSetProducts}
                />
            </BrowserRouter>
        );
 
        const slider = screen.getByTestId('price-range');
        fireEvent.change(slider, { target: { value: '500' } });
 
        // Assuming the filterProducts function is called and updates products
        expect(mockSetSliderValue).toHaveBeenCalled();
        // fireEvent.change(slider, { target: { value: '12000' } });
        // await waitFor(() => {
        //     expect(setProducts).toHaveBeenCalledWith(mockProducts);
        // });
    });
 
});