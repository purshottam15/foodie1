import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react'
import '../App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAsync } from '../auth/authSlice';
import { useDispatch } from 'react-redux';



// Import Swiper styles
import 'swiper/css';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function Home() {
  const dispatch=useDispatch();
  


  const navigate=useNavigate()
useEffect(()=>{
  if(!localStorage.getItem('token')){
    
    navigate('/login')
   
      }
      else{
        dispatch(getUserAsync());
      }

},[])

  
  return (
    <div>
        <div className=" container-ls h-12">
        <div className="swipe  mb-0">

    
<Swiper
  spaceBetween={10}
  slidesPerView={1}
  onSlideChange={() => console.log('slide change')}
  onSwiper={(swiper) => console.log(swiper)}
>
  
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" className='Swipephoto ' alt="" /></SwiperSlide>


 
  ...
</Swiper>
</div>

<div className='explore '>
        
<h1 style={{textAlign:"center"}} class="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Explore Our Delicious</span></h1>



        <div className="foodExplore mx-2 ">
          
          
        <div
  class="relative cursor-pointer grid h-[30rem]  max-w-[25rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700" onClick={()=>{navigate("/food")}}>
  <div
    class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://cdn.pixabay.com/photo/2017/08/06/06/42/pizza-2589569_1280.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
    <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
  </div>
  <div class="relative p-6 px-6 py-14 md:px-12">
    <h2 class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
    Delicious, cheesy, classic Italian comfort food.
    </h2>
    <h5 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
      Italian Pizza
    </h5>
 
  </div>
</div>  
        <div
  class="relative cursor-pointer grid h-[30rem] w-full max-w-[25rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700" onClick={()=>{navigate("/food")}}>
  <div
    class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://cdn.pixabay.com/photo/2016/06/26/22/46/india-1481504_1280.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
    <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
  </div>
  <div class="relative p-6 px-6 py-14 md:px-12">
    <h2 class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
     Spicy, aromatic, rich cultural flavors.
    </h2>
    <h5 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
      Spicy Paneer
    </h5>
   
  </div>
</div>  
        <div
  class="relative cursor-pointer grid h-[30rem] w-full max-w-[25rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700" onClick={()=>{navigate("/food")}}>
  <div
    class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://cdn.pixabay.com/photo/2024/02/06/10/53/ai-generated-8556731_1280.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
    <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
  </div>
  <div class="relative p-6 px-6 py-14 md:px-12">
    <h2 class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
    Juicy, satisfying, all-American favorite.
    </h2>
    <h5 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
      Burgar
    </h5>
    
  </div>
</div>  
        
        </div>
    </div>

        </div>
      
    </div>
  )
}
