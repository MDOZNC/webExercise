import React from 'react'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';

function ProductDetail() {
    const location = useLocation();
    const { product } = location.state;
    const carImg = product.productImg.map(img => '../'+img);

    return (
        <div className='row main-content container align-items-center'>
            <div className="preview col-md-8 col-sm-12 px-0" style={{ overflow: 'hidden', height: '500px' }}>
                <Carousel>
                    <Carousel.Item>
                        <img src={carImg[0]} alt="Product View" style={{ height: '500px', width: '100%' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={carImg[1]} alt="Product View" style={{ height: '500px', width: '100%' }} />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="col-md-4 col-sm-12">
                <span className="product-title">{product.title}</span>
                <h3 className="product-type">{product.type}</h3>
                <p className="product-description">{product.description}</p>
                <div className="mb-4 mt-2">
                    <span>Color</span>
                </div>
                <div className="mb-4 mt-2">
                    <p>Price Per Unit</p>
                    <div className='d-flex'>
                        <h4 className="price me-4">${product.price}</h4>
                        {/* <div className="buy-btn"> */}
                        <button className="buy-btn add-to-cart px-3 me-4" type="button">Buy Now</button>
                        <span><FontAwesomeIcon icon={faShoppingCart} /></span>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
