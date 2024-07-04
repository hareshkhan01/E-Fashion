import React, { useContext, useState } from 'react'
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { addToCart } from '../../../redux/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const WishList = () => {
    const context = useContext(myContext)
    const { wishLists, mode, removeProductFromWishList } = context
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)

    const addCart = (products) => {
        dispatch(addToCart(products))
        toast.success('Added to cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const handleRemove = (product) => {
        removeProductFromWishList(product);
    }

    return (
        <Layout>
            <div className="flex flex-wrap -m-4">
                {wishLists && wishLists.map((item, index) => {
                    const { title, price, description, imageUrl } = item;
                    return (
                        <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                            <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div onClick={() => window.location.href = `/productinfo/${item.id}`} className="flex justify-center cursor-pointer">
                                    <img className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="product" />
                                </div>
                                <div className="p-5 border-t-2">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>Quick-Bazar</h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h1>
                                    <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {price}</p>
                                    <div className="flex justify-center">
                                        <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">Add To Cart</button>
                                    </div>
                                    <div className="flex justify-center mt-3">
                                        <button onClick={() => handleRemove(item)} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export default WishList
