import React, { useState } from "react";


const Orders = () => {
    const orders = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        location: `Location ${i + 1}`,
        items: `Items ${i + 1}`,
        price: `$${(i + 1) * 10}`,
      }));

    const [activeOrder, setActiveOrder] = useState(null);
    
    const handleOrderClick = (order) => {
        setActiveOrder(order);
      };

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
              key={order.id}
              className={`bg-${
                activeOrder?.id===order.id ? "gray-300" : "white"
              } p-2 w-full cursor-pointer`}
              onClick={() => handleOrderClick(order)}
            >
              <h1 className="text-center">Order {order.id}</h1>
              <p className="text-left p-1">{order.location}</p>
              <p className="text-left p-1">{order.items}</p>
              <p className="text-left p-1">{order.price}</p>
            </div>
          ))}
          </div>
            </div>
            <div className="mr-20 mt-10 p-20 shadow-md rounded-xl w-1/2 bg-white">
          {activeOrder ? (
            <>
              <h2 className="text-xl font-semibold">Order {activeOrder.id} Details</h2>
              <p className="mt-4 text-lg">Location: {activeOrder.location}</p>
              <p className="mt-2 text-lg">Items: {activeOrder.items}</p>
              <p className="mt-2 text-lg">Price: {activeOrder.price}</p>
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