import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deletefoodAsync,updatecartAsync } from '../cart/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { fetchCartAsync } from '../cart/cartSlice';
import { cartItem } from '../cart/cartSlice';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from "react-hook-form"
import Alert from './Alert';
import { placeOrderAsync } from '../cart/cartSlice';
import { orderFood } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { clearCartAsync } from '../cart/cartSlice';
import axios from 'axios';

export default function Payment(props) {
   
    const [flag, setflag] = useState(false);
    const [address, setAddress] = useState([]);
    const dispatch=useDispatch();
    const cart=useSelector(cartItem);
    const [orderedFood,setOrderedFood ] = useState([]);
    const currOrder=useSelector(orderFood);
    const navigate=useNavigate();
    let sum = 0;
    let index = 0;
    const [alert, SetAlert] = useState(false);
    const [message, setMessage] = useState("")
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm();
    const deletefood = async (id) => {
      dispatch(deletefoodAsync(id));

    }

    const createOrderInstance=async()=>{
      console.log("Function called")
      let res= await fetch('http://localhost:5000/auth/create/order',{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      

    },
    body:JSON.stringify({amount:sum})
  })

  let data= await res.json();
  console.log(data)
  
  if(data.status==200){
    console.log(data)
    return data;
  }


    }
    const makeAlert=()=>{
      setMessage("Adress has been added...Now you can checkout")
      SetAlert(true)
      setTimeout(()=>{
        SetAlert(false)
  
      },3000)
    }
    const makeOrder=async()=>{
      if(address.length<=0){
        setMessage("please enter address..")
      SetAlert(true)
      setTimeout(()=>{
        SetAlert(false)
  
      },3000)
        return;
      }
       console.log("food detail",cart)

      let data={food:cart,modeofpayment:"cash",address}
       dispatch(placeOrderAsync(data));
      dispatch(clearCartAsync())
    //   const order=await createOrderInstance();
    //   // if(order.status==500){return}
    //   const keyId=await axios.get("http://localhost:5000/auth/getkey");

    //   var options = {
    //     key: keyId.key, // Enter the Key ID generated from the Dashboard
    //     amount: order.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //     currency: "INR",
    //     name: "Foodie", //your business name
    //     description: "Test Transaction",
    //     image: "https://example.com/your_logo",
    //     order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //     callback_url: "http://localhost:5000/auth/verify",
    //     "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    //         name: address.name, //your customer's name
    //         "email": "gaurav.kumar@example.com",
    //         "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
    //     },
    //     "notes": {
    //         "address": "Razorpay Corporate Office"
    //     },
    //     "theme": {
    //         "color": "#3399cc"
    //     }
    // };
    // const rzp1 = new window.Razorpay(options);
    
    //     rzp1.open();
       
    }

      // dispatch(placeOrderAsync(data));
      // dispatch(clearCartAsync())
    

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


    useEffect(() => {
        fetchCart()
       
    }, cart)
    cart.map((data) => {
        sum += data.price * data.quantity
    })



    return (
      
        <div className="h-screen bg-gray-100 pt-20">
          {currOrder&&navigate('/order/success')}
          { alert&&<Alert message={message}/>}
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div>

          <form onSubmit={handleSubmit((data) => {
                       if(typeof(data.phone)!=="number"&&data.phone.length!=10){
                        window.alert("Mobile number is not valid");
                        return;
                       }
                       if(typeof(data.zipcode)!=="number"&&data.zipcode.length!=5){
                        window.alert("Zipcode is not valid");
                        return;
                       }
                       setAddress(data);
                       makeAlert(true);
                       

                    })}>
      <div className="space-y-12 mb-3">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Delivery address</h2>
        

         
        </div>

        <div className="border-b border-gray-900/10 pb-12">
         
        

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  {...register("name")}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  {...register("phone")}
                  
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  
                />
              </div>
            </div>

           

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  {...register("street")}
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Landmark
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="landmark"
                  id="landmark"
                  {...register("landmark")}
                  autoComplete="landmark"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  {...register("city")}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  {...register("zipcode")}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            
          </div>
          
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
       
      </div>

      
    </form>

         
          
          {cart.length>0&&<div className="mt-10 rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-3/3">
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
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={makeOrder}  >Order</button>
          </div>} </div>
          <div className="rounded-lg md:w-1/2">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
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
         
            <div className="flex items-center space-x-4">
              <p className='text-lg mx-0'>Price-</p>
              <p className="text">{item.price}</p>
           
            </div>
          </div>
        </div>
      </div>
    );
  }
