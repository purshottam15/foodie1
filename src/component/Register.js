import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import { CreateUserAsync, errorMessage } from '../auth/authSlice';
import { UseSelector } from 'react-redux';
import axios from 'axios';

import { usercreated } from '../auth/authSlice';
// import { errorMessage } from '../auth/authSlice';


export default function Register() {
  const dispatch=useDispatch();
  const Isusercreated=useSelector(usercreated);
  const errorMess=useSelector(errorMessage);
  // State-------------
  // const [IsError, setIsError] = useState(false)
  // const [alert, SetAlert] = useState(false)
  // const [message, setMessage] = useState("")
  // const [errorMessage, seterrorMessage] = useState("")
  const [user, setUser] = useState({ name: "", email: "", location: "", password: "" })
  // State end -------------
  const navigate = useNavigate();
 const [city, setCity] = useState("");
 const [loadingLocation, setloadingLocation] = useState(false);

  // Function==============
  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value })

  }
  const formSubmit = async (e) => {
  e.preventDefault();
dispatch(CreateUserAsync(user));



  }
  useEffect(()=>{
    if(Isusercreated==true){
    
     
        navigate('/login')

      
    }

  },[Isusercreated])

  const getpincode=async(value)=>{
   
setCity("")
    setloadingLocation(true)

try {
	const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
	let pincodeDetail=await response.json();
  setloadingLocation(false)
  setCity(pincodeDetail[0].
    PostOffice[0].Name +" ,"+pincodeDetail[0].
    PostOffice[0].District)
} catch (error) {
	console.error(error);
}
  }

  return (
    <div>
      {/* {alert&&<Alert message={message} status="success"/>} */}
      <div className="flex  w-full max-w-sm mx-auto overflow-hidden mt-4 text-black bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
       {/* <form method='POST' onSubmit={formSubmit}> */}

        <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1615719413546-198b25453f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")'}}></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            {/* <p>Foodie</p> */}
          </div>

          <p className="mt-3 text-xl text-center text-black dark:text-gray-200">
           Create a new account
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <Link to="/login" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">Existing user-login</Link>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

             <form method='POST' onSubmit={formSubmit}>
             <div className="mt-4">

<label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="LoggingEmailAddress">Enter Name</label>
<input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" onChange={inputChange} name="name" />
</div>

          <div className="mt-4">

            <label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" onChange={inputChange} name="email" />
          </div>
          <div className="mt-4">

            <label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="LoggingEmailAddress">Pincode</label>
            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" onChange={inputChange} name="location" onBlur={(e)=>{getpincode(e.target.value)}} />
           {loadingLocation&& <div class="flex items-center">
        <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
        </div>
        Searching Location
    </div>}
          <p className='text-violet-950'>{city}</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="loggingPassword">Password</label>
              
            </div>

            <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" name="password" onChange={inputChange} type="password" />
          </div>
          {errorMess && <p style={{ color: "red" }}>{errorMess}</p>}
          <div className="mt-6">
            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign up!
            </button>
          </div>
            </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
           <Link to="/login"> <a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or login</a>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> </Link>
          </div>
        </div>
        </div>
    </div>
  )
}
