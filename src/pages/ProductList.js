import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductList({ setAllProducts, products, setProducts, filterProducts, sliderValue, setSliderValue, searchText }) {
    // const navigate = useNavigate();
    const handleRangeChange = (e) => {
        let newSliderValue = e.target.value;
        setSliderValue(newSliderValue);
        setProducts(filterProducts(newSliderValue, searchText));
        console.log('Slider Value : ', sliderValue);
    }

    useEffect(() => {
        fetch('/products.json')
            .then(response => response.json())
            .then(data => {
                setAllProducts(data.items);
                setProducts(data.items);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="product-list row">
            <section className="col-lg-3 pt-3">
                <div className='filter-by'>
                    <p className="filter-text">Filter By</p>
                    <div id="accordion">
                        <div id="headingOne">
                            <button className="btn pr-1">
                                Collection
                                <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />
                            </button>
                            <div id="collapseOne" className="collapse">
                                In Design Phase
                            </div>
                        </div>
                        <div id="headingTwo">
                            <button className="btn pr-1">
                                Colour
                                <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />
                            </button>
                            <div id="collapseOne" className="collapse">
                                In Design Phase
                            </div>
                        </div>
                        <div id="headingThree">
                            <button className="btn pr-1">
                                Category
                                <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />
                            </button>
                            <div id="collapseOne" className="collapse">
                                In Design Phase
                            </div>
                        </div>
                    </div>
                    <div className="slidecontainer">
                        <p className="price-range pt-3 mb-0">Price Range</p>
                        <input type="range" min="0" max="25000" step={250} value={sliderValue} className="slider" id="myRange" onChange={handleRangeChange} />
                        <p className="price-range">
                            ${sliderValue}
                            {sliderValue === 25000 && <span>+</span>}
                        </p>
                    </div>
                </div>
            </section>
            <section className='col-lg-9 products'>
                <div className='product-center'>
                    {
                        products && products.length > 0 ?
                            products.map(product => (
                                <div className='product'>
                                    <Link state={{ product }} to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <article key={product.id}>
                                            <div className="img-container">
                                                <img src={product.productImg[0]} alt={product.title} className="product-img" />
                                            </div>
                                            <p>{product.title}</p>
                                            <h2>{product.type}</h2>
                                            <h4>${product.price}</h4>
                                        </article>
                                    </Link>
                                </div>
                            )) :
                            (<h3>No Items Found</h3>)
                    }
                </div>
            </section>
        </div>
    );
}

export default ProductList;