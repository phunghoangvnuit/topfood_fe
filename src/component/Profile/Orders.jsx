import React, { useEffect } from 'react'
import { OrderCard } from './OrderCard'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from 'component/State/Order/Action';

export const Orders = () => {
  const { auth,cart,order } = useSelector(store => store);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrders(jwt))
  },[auth.jwt])

  return (
    <div className="flex items-center flex-col" style={{color: "#000000"}}>
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {
          order.orders.map((order)=>order.items.map((item)=><OrderCard order={order} item={item}/>))
        }

      </div> 
    </div>
  )
}
