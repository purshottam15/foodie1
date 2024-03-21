import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cartItem } from '../cart/cartSlice'

export default function Navbar(props) {
  let navigate = useNavigate();
  let cart = useSelector(cartItem);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className="navbar font-sans bg-stone-800 text-white"> {/* Change text color to white */}
        <div className="logo">
          <Link to="/" className='logoName' style={{ textDecoration: "none", color: "#FFF" }}> {/* Change color to white */}
            <h1 className='text-2xl select-none hover:scale-110 ease-in duration-150'>Foodie</h1>
          </Link>
        </div>
        <div className="items text-white"> {/* Change text color to white */}
          <ul className="itemlist">
            <li><Link className='actualItem font-sans	 text-white' to="/"> Home</Link></li>
            <li><Link className='actualItem text-white' to="/food"> Food</Link></li>
            {!localStorage.getItem('token') && <li><Link className='actualItem text-white' to="/login"> Login</Link></li>}
            {!localStorage.getItem('token') && <li><Link className='actualItem text-white' to="/signup"> SignUp</Link></li>}
            {localStorage.getItem('token') &&
              <li><Link className='btn btn-danger' to="/cart">Cart <span className="badge badge-light">{cart.length}</span></Link></li>
            }
            {localStorage.getItem('token') &&
              <li className="nav-item dropdown actualItem">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user text-white"></i>
                </a>
                <ul className="dropdown-menu">
                  <Link className='dropdown-item ' to="/profile">Profile</Link>
                  <li><Link className='dropdown-item' to="/user/order"> Order</Link></li>
                  {localStorage.getItem('token') && <li className='dropdown-item' onClick={logout}>logout</li>}
                </ul>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
