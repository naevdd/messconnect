import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import HostProfile from './HostProfile'
import MenuPage from './MenuPage'
import Orders from './Orders'




const HostPage = () => {

  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("messtoken");
    navigate("/#1");
  };

  useEffect(() => {        
    const storedToken = localStorage.getItem('messtoken');
    setToken(storedToken);
    if (!storedToken) {
      navigate('/#1');
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/host/protected', {
          headers: { Authorization: `Bearer ${storedToken}` },
          signal: controller.signal,
        });
        setMessage(response.data.message);
      } catch (err) {
        if (axios.isCancel(err)) return;
        nav
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <section className='bg-gray-400'>
    <div className='fixed shadow-xl bg-white w-20 h-screen left-0'>
      <div className='flex flex-col text-center
       gap-10'>
        <NavLink
            to="orders"
            className={({ isActive }) =>
              `rounded-xl mx-auto mt-24 w-14 h-14 ${
                isActive ? 'bg-orange-500' : 'bg-yellow-500'
              }`
            }
          >
            <p className="text-white mt-4 text-sm">Orders</p>
          </NavLink>
          <NavLink
            to="menu"
            className={({ isActive }) =>
              `rounded-xl mx-auto w-14 h-14 ${
                isActive ? 'bg-orange-500' : 'bg-yellow-500'
              }`
            }
          >
            <p className="text-white mt-4 text-sm">Menu</p>
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `rounded-xl mx-auto w-14 h-14 ${
                isActive ? 'bg-orange-500' : 'bg-yellow-500'
              }`
            }
          >
            <p className="text-white mt-4 text-sm">Profile</p>
          </NavLink>
          <button 
        onClick={handleLogout} 
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
        Logout
      </button>
      </div>
    </div>
    <div className='text-center bg-gray-300'>
      <Routes>
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<HostProfile />} />
            <Route path="menu" element={<MenuPage />} />
      </Routes>
    </div>
    </section>

  )
}

export default HostPage