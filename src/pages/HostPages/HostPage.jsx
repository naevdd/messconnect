import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import HostProfile from './HostProfile';
import MenuPage from './MenuPage';
import Orders from './Orders';

const navItems = [
  { to: "orders", label: "Orders" },
  { to: "menu", label: "Menu" },
  { to: "profile", label: "Profile" },
];

const HostPage = () => {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("messtoken");
    navigate("/");
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
        const response = await axios.get('https://messbackend-8bh5.onrender.com/host/protected', {
          headers: { Authorization: `Bearer ${storedToken}` },
          signal: controller.signal,
        });
        setMessage(response.data.message);
      } catch (err) {
        if (axios.isCancel(err)) return;
        // Handle error
      }
    };

    fetchData();

    return () => controller.abort();
  }, [navigate]);

  return (
    <section className="bg-gray-400 min-h-screen">
      {/* Sidebar for desktop, topbar for mobile */}
      <nav className="bg-white shadow-xl
        fixed left-0 top-0 h-screen w-20 flex-col gap-10 text-center
        sm:flex hidden z-20">
        <div className="flex flex-col gap-10 mt-24">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-xl mx-auto w-14 h-14 flex items-center justify-center
                ${isActive ? 'bg-orange-500' : 'bg-yellow-500'}`
              }
            >
              <p className="text-white text-sm">{label}</p>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="mt-5 mx-2 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Topbar for mobile */}
      <nav className="bg-white shadow-xl
        fixed bottom-0 left-0 w-full h-16 flex-row gap-2 items-center justify-between
        sm:hidden flex z-20">
        <div className="flex flex-row -ml-1 gap-3 w-full justify-center items-center">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-xl w-16 h-10 flex items-center justify-center mx-1
                ${isActive ? 'bg-orange-500' : 'bg-yellow-500'}`
              }
            >
              <span className="text-white text-xs">{label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 ml-2"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Main content */}
      <div
        className="bg-gray-300 text-center pt-16 sm:pt-0"
        style={{ minHeight: '100vh' }}
      >
          <Routes>
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<HostProfile />} />
            <Route path="menu" element={<MenuPage />} />
          </Routes>
        </div>
    </section>
  );
};

export default HostPage;