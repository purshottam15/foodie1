import React from 'react'
import orderSuccess from '../orderSuccess.gif'
import { clearOrder } from '../cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function OrderSuccess() {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  setTimeout(()=>{

dispatch(clearOrder());
navigate('/')
    
  },1500)
  return (
    <div style={{width:"100%"}}><img style={{width:"100%",height:"32rem",position:"absolute",top:"0rem"}} src={orderSuccess} alt="" /></div>
  )
}
