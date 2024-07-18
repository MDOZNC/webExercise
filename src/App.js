import {React, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail.js';
import NavigationBar from './components/NavigatonBar';
import ProductList from './pages/ProductList.js';
import './scss/NavigationBar.scss'
import './scss/ProductList.scss'
import './scss/ProductDetail.scss'

function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]); // Initialize state with an empty array
    const [sliderValue, setSliderValue] = useState(10000);
    const [searchText, setSearchText] = useState('');


    return (
        <Router>
            <div className='main-content'>
                <NavigationBar allProducts={allProducts} products={products} setProducts={setProducts} searchText={searchText} setSearchText={setSearchText} sliderValue={sliderValue}/>
                <Routes>
                    <Route path='/' element={<ProductList allProducts={allProducts} setAllProducts={setAllProducts} products={products} setProducts={setProducts} sliderValue={sliderValue} setSliderValue={setSliderValue} searchText={searchText}/>}/>
                    <Route path='/product/:productId' element={<ProductDetail />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;