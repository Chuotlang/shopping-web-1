import React, { useEffect, useRef } from 'react'
import './Product.css';
import {Link} from 'react-router-dom';
import ButtonAdd from './ButtonAdd';
const Product = ({product}) => {

    const imgRef = useRef();

    useEffect(() => {
        const img = imgRef.current;
        const ob = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                img.setAttribute("src",img.alt);
                img.classList.add("active");
            }
        })
        if(img){
            ob.observe(img);
        }

        return () => {
            ob.unobserve(img);
        }
    },[])
    
    
  return (
    <div className='col c-10 c-o-1 m-4 l-3'>
        <div className='card'>
            <div className='card_image'>
                <Link to={`/product/${product.slug}`} className='Link'>
                    <img alt={product.image} ref={imgRef} className='lazy_load'/>
                </Link>
            </div>
            <div className='card_infor'>
                <div className='title_card'>
                <Link to={`/product/${product.slug}`} className='Link'>
                    <h1 style={{color:"black"}}>{product.title}</h1>
                </Link>
                </div>
                <div className='description_card'>
                    <span>{product.description}</span>    
                </div>
                <div className='price_sold_card'>
                    <span>Price: $ {product.price}</span>
                    <span>Sold: {product.sold}</span>
                </div>
                <ButtonAdd product_id={product._id} slug={product.slug}/>
            </div>
        </div>
    </div>
  )
}

export default Product