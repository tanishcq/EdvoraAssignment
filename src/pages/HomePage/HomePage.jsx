import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from '../../components/ProductCard';
import './HomePage.css';


export default function HomePage () {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get("https://assessment-edvora.herokuapp.com/");
            setData(res.data);
        }
        getData();
    },[]);

    var settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    };
    console.log(data);
    return (
        <div className='container'>
            <div className='left-gridbox'>
                <div className='filters-container'>
                    <p>Filter</p>
                    <hr/>
                </div>
            </div>
            <div className='right-gridbox'>
                <div className='cards-container'>
                    <h1>Edvora</h1>
                    <h2>Products</h2>
                    <h3>Brands</h3>
                    <hr/>
                    <div className='slide-section'>
                        <Slider {...settings}>
                            {
                                data.length > 0 && data.map((e, i) => {
                                    return(
                                        <ProductCard key={i} {...e} />
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <h3>Products List</h3>
                    <hr/>
                </div>
            </div>
        </div>
    )
}