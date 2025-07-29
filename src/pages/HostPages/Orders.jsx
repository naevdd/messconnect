import React, { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const loggedInMessEmail = localStorage.getItem("email");


  if (!loggedInMessEmail) {
    console.error("Mess email not found in localStorage.");
    return;
  }

  const handleOrderClick = (order) => {
    setActiveOrder(order);
  };

  useEffect(() => {
    axios.get(`${BASE_URI}/orders`,{ params: { messemail: loggedInMessEmail } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error in fetching data ", error);
      });
  }, []);

  const handleMarkCompleted = async (orderId) => {
    try {
      // Send DELETE request to the backend
      await axios.delete(`${BASE_URI}/orders/${orderId}`);

      // Update the UI by removing the order from the list
      setOrders(orders.filter(order => order._id !== orderId));
      
      // Clear the active order view
      setActiveOrder(null); 
      
      alert('Order marked as completed!');

    } catch (error) {
      console.error("Error marking order as completed:", error);
      alert('Failed to update order.');
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="bg-white fixed z-50 shadow-xl border border-black flex w-full h-16 items-center justify-between px-4 sm:pl-30">
        <p className="text-2xl font-semibold">MANAGE ORDERS</p>
        <div className="bg-yellow-500 rounded-xl w-12 h-12 flex items-center justify-center">
          <span className="text-white text-xs">Profile</span>
        </div>
      </div>

      {/* Responsive layout */}
      <div className="flex flex-col sm:flex-row justify-between px-4 pb-20 sm:px-36 pt-20 sm:pt-30 gap-8 sm:gap-24">
        {/* Orders list */}
        <div className="shadow-md rounded-xl w-full sm:w-1/3 bg-white">
          <div className="bg-white rounded-xl w-full h-20 flex items-center justify-center font-semibold text-lg">
            Orders List
          </div>
          <div className="overflow-y-auto h-[40vh] sm:h-[65vh]">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-2 w-full cursor-pointer transition-colors ${
                  activeOrder?._id === order._id ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handleOrderClick(order)}
              >
                <h1 className="text-center font-bold">Order {order._id}</h1>
                <p className="text-left p-1">{order.customerName}</p>
                <p className="text-left p-1">{order.customerPhone}</p>
                <p className="text-left p-1">{order.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order details */}
        <div className="shadow-md rounded-xl w-full sm:w-1/2 p-4 sm:p-8 bg-white">
          {activeOrder ? (
            <>
              <h2 className="text-xl font-semibold">Order {activeOrder._id} Details</h2>
              <p className="mt-4 text-lg">Name: {activeOrder.customerName}</p>
              <p className="mt-2 text-lg">Phone: {activeOrder.customerPhone}</p>
              <p className="mt-2 text-lg">Status: {activeOrder.status}</p>
              <button
                onClick={() => handleMarkCompleted(activeOrder._id)}
                className="mt-6 bg-green-400 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Mark as Completed
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500">Select an order to view details</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;