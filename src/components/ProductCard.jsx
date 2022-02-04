import React from 'react'

export default function ProductCard(props) {
    return(
        <div className='product-card'>
            <div className='product-card-top-half'>
                <div className='img-box'>
                    <img src={props.image} alt="not-found" className='product-img'/>
                </div>
                <div className='product-name-box'>
                    <p className='product-name'>{props.product_name}</p>
                    <p className='brand-name'>{props.brand_name}</p>
                    <p className='price'>$ {props.price}</p>
                </div>
            </div>
        </div>
    )
}