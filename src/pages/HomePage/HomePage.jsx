import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from '../../components/ProductCard';
// import customStyles from '../../common/customStyles.js'
// import DropdownSvg from '../../svg/dropdown.svg'
import './HomePage.css';


export default function HomePage () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);   
    const [searchProduct, setSearchProduct] = useState("");   
    const [product, setProduct] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    // const [uniqueProductList, setUniqueProductList] = useState([]);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await axios.get("https://assessment-edvora.herokuapp.com/");
            setData(res.data);
            setLoading(false);
        }
        getData();
    },[]);
    
    const uniqueProductList = [...new Set(data?.map(data => data.product_name))]
    const uniqueStateList = [...new Set(data?.map(data => data.address.state))]
    const uniqueCityList = [...new Set(data?.map(data => data.address.city))]
    // setUniqueProductList (unique);
    // console.log(uniqueProductList);

    const filteredData = data
    .filter((item) => item.product_name.toLowerCase().includes(product.toLowerCase()))
    .filter((item) => item.address.state.includes(state))
    .filter((item) => item.address.city.includes(city));

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
                infinite: false,
                dots: false
            }
            },
            {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: false
            }
            }
        ]
    };
    return (
        <div className='container'>
            <div className='left-gridbox'>
                <div className='filters-container'>
                    <input type="text" placeholder='Filter' onChange={(e)=> setProduct(e.target.value)}/>
                    <hr/>
                    <select className='product-filter' onChange={(e)=>setProduct(e.target.value)}>
                    <option hidden value="">Products</option>
                        {uniqueProductList?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option> 
                            )
                        })}
                    <option value="">None</option>
                    </select>
                    <select className='product-filter' onChange={(e)=>setState(e.target.value)}>
                        <option defaultValue={""} value={null} hidden>State</option>
                        {uniqueStateList?.map((item,index)=>{
                            return(
                                <option key={index} value={item} >{item}</option> 
                            )
                        })}
                        <option value="">None</option>
                    </select>
                    <select className='product-filter' onChange={(e)=>setCity(e.target.value)}>
                        <option defaultValue={""} value={null} hidden>City</option>
                        {uniqueCityList?.map((item,index)=>{
                            return(
                                <option key={index} value={item} >{item}</option> 
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
                    <h3>Products List</h3>
                    <hr/>
                    <div className='slide-section'>
                        <Slider {...settings}>
                            {loading? (<h1>Loading...</h1>) :
                                filteredData.filter((value) => {
                                    if(searchProduct === "") {
                                        return value;
                                    }
                                    else if (value.product_name.toLowerCase().includes(searchProduct.toLowerCase())) {
                                        return value;
                                    }
                                })
                                .map((e, i) => {
                                    return(
                                        <ProductCard key={i} {...e} />
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <h3>Brands List</h3>
                    <hr/>
                    <div className='slide-section'>
                        <Slider {...settings}>
                            {loading? (<h1>Loading...</h1>) :
                                filteredData.filter((value) => {
                                    if(searchProduct === "") {
                                        return value;
                                    }
                                    else if (value.product_name.toLowerCase().includes(searchProduct.toLowerCase())) {
                                        return value;
                                    }
                                })
                                .map((e, i) => {
                                    return(
                                        <ProductCard key={i} {...e} />
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}