import React from 'react'

export default function ProductCard(props) {
    const date = props.date.substring(0, props.date.indexOf('T'));
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
            <div className='product-card-bottom-half'>
                <p id='location'>{props.address.city}, {props.address.state}</p>
                <p>Date: {date}</p>
                <p>{props.discription}</p>
            </div>
        </div>
    )
}