import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCartAsync } from '../cart/cartSlice';



export default function FoodCart(props) {
  const dispatch=useDispatch();
  let navigate = useNavigate(props)
  const postcart = async (foodName, price, quantity,image) => {
    try {
      const response = await fetch('http://localhost:5000/auth/setfoodcart', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ foodName, price, quantity,image })
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      if (data.status == 200) {
        dispatch(fetchCartAsync());
        props.makeAlert()
        
        setQuantity(1)
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  };


  const [quantity, setQuantity] = useState(1)
  const foodAddtocart = (e) => {
    e.preventDefault()
    if (!localStorage.getItem('token')) {
      window.alert("Login to add food into the cart");
      navigate('/login');
      return;
    }

    postcart(props.name, props.price, quantity,props.image)

  }
  return (
    <div>    
<div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
  <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
    <img class="peer absolute top-0 right-0 h-full w-full object-cover" src={props.image} alt={props.name} />
    <img class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src={props.image}alt={props.name} />
   
    <svg class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
    {/* <!-- <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> --> */}
  </a>
  <div class="mt-4 px-5 pb-5">
    <a href="#">
      <h5 class="text-xl tracking-tight text-slate-900">{props.name}</h5>
    </a>
    <div class="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span class="text-3xl font-bold text-slate-900">₹{props.price}</span>
        <span class="text-sm text-slate-900 line-through">₹{props.price+props.price/10}</span>
      </p>
    </div>
    <select id="Quantity" value={quantity} onChange={(e) => { setQuantity(parseInt(e.target.value)) }}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>

    <a href="#" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={foodAddtocart}>
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to cart</a
    >
  </div>
</div>
    </div>
  );
}

