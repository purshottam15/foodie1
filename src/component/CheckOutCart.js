import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deletefoodAsync,updatecartAsync } from '../cart/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { fetchCartAsync } from '../cart/cartSlice';
import { cartItem } from '../cart/cartSlice';

export default function CheckOutCart(props) {
    // const [cart, setcart] = useState([]);
    const [flag, setflag] = useState(false);
    const dispatch=useDispatch();
    const cart=useSelector(cartItem);
    let sum = 0;
    let index = 0;
    const deletefood = async (id) => {
      dispatch(deletefoodAsync(id));

    }

    

    const fetchCart = async () => {
        try {
          dispatch(fetchCartAsync());

            cart.map((data) => {
                sum += data.price * data.quantity
            })
        } catch (error) {
            console.log(error)
        }



    }


    const quantityChange = async (newQuantity, id) => {
      if(newQuantity<=0){
        return;
      }
      
      dispatch(updatecartAsync({id,newQuantity}))

    }
    useEffect(() => {
        fetchCart()
       
    }, cart)
    cart.map((data) => {
        sum += data.price * data.quantity
    })



    return (
        <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} func={quantityChange} deleteItem={deletefood} />
            ))}
          </div>
          {cart.length>0&&<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">₹{sum}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">₹30</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">₹{sum+30}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" disabled={cart.length <= 0} ><Link to="/order/payment">Check out</Link></button>
          </div>}
        </div>
      </div>
    )
}



function CartItem({ item,func,deleteItem }) {
    return (
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={item.image}  alt={item.name} className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{item.foodName}</h2>
            <p className="mt-1 text-xs text-gray-700">{item.quantity}</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>{func(Number(item.quantity-1),item._id)}}> - </span>
              <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value ={item.quantity} min="1" />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>{func(Number(item.quantity+1),item._id)}}> + </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">{item.price}</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={()=>{deleteItem(item._id)}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
