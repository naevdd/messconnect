import React, { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const loggedInMessEmail = localStorage.getItem("email");

  if (!loggedInMessEmail) {
    console.error("Mess email not found in localStorage.");
    return null;
  }

  const handleOrderClick = (order) => {
    setActiveOrder(order);
  };

  useEffect(() => {
    axios.get(`${BASE_URI}/orders`, { params: { messemail: loggedInMessEmail } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error in fetching data ", error);
      });
  }, []);

  const handleMarkCompleted = async (orderId) => {
    try {
      await axios.delete(`${BASE_URI}/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      setActiveOrder(null);
      alert('Order marked as completed!');
    } catch (error) {
      console.error("Error marking order as completed:", error);
      alert('Failed to update order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full px-2 sm:px-6 pt-6 pb-3 bg-transparent">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow flex items-center justify-between px-4 py-3">
          <p className="text-2xl font-bold text-yellow-500">Manage Orders</p>
          <div className="bg-yellow-500 rounded-xl w-12 h-12 flex items-center justify-center">
            <span className="text-white text-xs">Profile</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row pb-24 gap-8">
          {/* Orders list */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 w-full sm:w-1/3 flex flex-col">
            <div className="rounded-t-2xl w-full h-16 flex items-center justify-center font-semibold text-lg border-b border-gray-100">
              Orders List
            </div>
            <div className="overflow-y-auto h-[40vh] sm:h-[65vh]">
              {orders.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No orders found.</div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className={`p-3 w-full cursor-pointer border-b border-gray-50 transition-colors ${
                      activeOrder?._id === order._id ? "bg-yellow-100" : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => handleOrderClick(order)}
                  >
                    <h1 className="font-bold text-base truncate">Order {order._id}</h1>
                    <p className="text-sm text-gray-700">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerPhone}</p>
                    <p className="text-xs text-gray-500">{order.orderCount}</p>
                    <p className="text-xs text-gray-500">{order.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order details */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 w-full sm:w-2/3 p-6 flex flex-col justify-center">
            {activeOrder ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <div className="space-y-2">
                  <p><span className="font-semibold">Order ID:</span> {activeOrder._id}</p>
                  <p><span className="font-semibold">Name:</span> {activeOrder.customerName}</p>
                  <p><span className="font-semibold">Phone:</span> {activeOrder.customerPhone}</p>
                  <p><span className="font-semibold">Status:</span> {activeOrder.status}</p>
                </div>
                <button
                  onClick={() => handleMarkCompleted(activeOrder._id)}
                  className="mt-6 bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
                >
                  Mark as Completed
                </button>
              </>
            ) : (
              <div className="text-center text-gray-400 my-8">Select an order to view details</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;