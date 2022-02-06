import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from '../../components/ProductCard';
import customStyles from '../../common/customStyles.js'
// import DropdownSvg from '../../svg/dropdown.svg'
import './HomePage.css';


export default function HomePage () {
    const [data, setData] = useState([]);
    // const [uniqueProductList, setUniqueProductList] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get("https://assessment-edvora.herokuapp.com/");
            setData(res.data);
        }
        getData();
    },[]);
    
    const uniqueProductList = [...new Set(data?.map(data => data.product_name))]
    const uniqueStateList = [...new Set(data?.map(data => data.address.state))]
    const uniqueCityList = [...new Set(data?.map(data => data.address.city))]
    // setUniqueProductList (unique);
    // console.log(uniqueProductList);

    var settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
            breakpoint: 1700,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 1400,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 1060,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
            }
        ]
    };
    return (
        <div className='container'>
            <div className='left-gridbox'>
                <div className='filters-container'>
                    <p>Filter</p>
                    <hr/>
                    <select className='product-filter'>
                    <option hidden value="">Products</option>
                        {uniqueProductList?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option> 
                            )
                        })}
                    <option value="">None</option>
                    </select>
                    <select className='product-filter'>
                        <option defaultValue={""} value={null} hidden>State</option>
                        {uniqueStateList?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option> 
                            )
                        })}
                        <option value="">None</option>
                    </select>
                    <select className='product-filter'>
                        <option defaultValue={""} value={null} hidden>City</option>
                        {uniqueCityList?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option> 
                            )
                        })}
                        <option value="">None</option>
                    </select>
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