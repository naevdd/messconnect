import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);


  const [activeOrder, setActiveOrder] = useState(null);
  
  const handleOrderClick = (order) => {
      setActiveOrder(order);
    };

  useEffect(() => {
          axios.get("http://localhost:3000/orders")
              .then((response) => {
                  setOrders(response.data);
                  console.log("Fetched all items:", response.data);
              })
              .catch((error) => {
                  console.error("Error in fetching data ", error);
              });
      }, []);
  

  return (
      <section>
      <div className='bg-white fixed z-50 shadow-xl border border-black justify-between flex w-full
      h-16 text-center'>
      <p className='text-left text-2xl ml-44 my-auto'>MANAGE ORDERS</p>
      <div className='bg-yellow-500 mr-5 rounded-xl 
          w-12 my-auto h-12'>
          <p className='text-white mt-4 text-xs'>Profile</p>
      </div>
      </div>
      <div className='flex justify-between p-20 flex-row gap-24'>
          <div className='ml-20 mt-10 shadow-md rounded-xl w-1/3 bg-white'>
          <div className='bg-white rounded-xl w-full h-20'>

          </div>
          <div className='overflow-y-auto h-[65vh]'>
          {orders.map((order) => (
          <div
            key={order._id}
            className={`bg-${
              activeOrder?._id===order._id ? "gray-300" : "white"
            } p-2 w-full cursor-pointer`}
            onClick={() => handleOrderClick(order)}
          >
            <h1 className="text-center">Order {order._id}</h1>
            <p className="text-left p-1">{order.customerName}</p>
            <p className="text-left p-1">{order.customerPhone}</p>
            <p className="text-left p-1">{order.status}</p>
          </div>
        ))}
        </div>
          </div>
          <div className="mr-20 mt-10 p-20 shadow-md rounded-xl w-1/2 bg-white">
        {activeOrder ? (
          <>
            <h2 className="text-xl font-semibold">Order {activeOrder._id} Details</h2>
            <p className="mt-4 text-lg">Name: {activeOrder.customerName}</p>
            <p className="mt-2 text-lg">Phone: {activeOrder.customerPhone}</p>
            <p className="mt-2 text-lg">Status: {activeOrder.status}</p>
          </> 
        ) : (
          <p className="text-center text-gray-500">Select an order to view details</p>
        )}
      </div>
      </div>
      </section>
  )
}

export default Orders