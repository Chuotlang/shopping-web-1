import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import CommentOverAll from '../comment/CommentOverAll';
const ProductDetail = ({cache}) => {
    const {slug} = useParams();
    const [product,setProduct] = useState();
    const [socket,setSocket] = useState();

    let count = useRef(0);

    const url = `/product/${slug}`;
    useEffect(() => {
        let here = true;
        if(cache.current[url]){
            return setProduct(cache.current[url]);
        }
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data.product;
                setProduct(res.data.product);
            })
            .catch(err => {
                if(!here){
                    return;
                }
                toast.error(err.response.data.msg);
            })
        return () => {
            here = false;
        }
    },[url]);

    useEffect(() => {
        const socket = io();
        setSocket(socket);
        return () => {
            socket.close();
        }
    },[]);


    useEffect(() => {
        if(socket && product){
            socket.emit("joinRoom",{id:product._id});
        }
    },[socket,product]);

    const handleAddMore =() => {
        toast.warn("Xin lỗi, chưa làm cái này.");
    }
  return (
    <div className='grid wide'>
        <div className='product_detail'>
            <div className='row'>
                <div className='col c-12 m-6 l-6'>
                    <div className='image_detail'>
                        <img src={product?.image} />
                    </div>
                </div>
                <div className='col c-12 m-6 l-6'>
                    <div className='title_product'>
                        <h1>{product?.title}</h1>
                    </div>
                    <div className='description_product'>
                        <span>
                            {product?.description}
                        </span>
                    </div>
                    <div className='price_sold_product'>
                        <span>Price: $ {product?.price}</span>
                        <span>{product?.categary}</span>
                        <span>Sold: {product?.sold}</span>
                    </div>
                    <div className='button_product'>
                        <button onClick={handleAddMore}>Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
            <CommentOverAll product_id={product?._id}  socket={socket} slug={slug} />
        </div>
    </div>
  )
}

export default ProductDetail