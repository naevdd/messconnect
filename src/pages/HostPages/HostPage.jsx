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

const BASE_URI = import.meta.env.VITE_API_URL;

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
        const response = await axios.get(`${BASE_URI}/host/protected`, {
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
      <nav className="
        fixed left-0 top-0 h-screen ml-5 w-20 flex-col gap-10 text-center
        sm:flex hidden z-20">
        <div className="bg-white border border-gray-200 rounded-2xl shadow flex flex-col gap-8 mt-10 py-8 px-2 h-[85vh] items-center">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-xl shadow shadow-gray-500 mx-auto w-14 h-12 flex items-center justify-center
                ${isActive ? 'bg-orange-500' : 'bg-yellow-500'}`
              }
            >
              <p className="text-white text-sm">{label}</p>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="mt-5 mx-2 shadow shadow-gray-500 bg-red-500 text-sm text-white py-2 px-1 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Topbar for mobile */}
      <nav className="bg-white shadow-xl
        fixed bottom-0 left-0 w-full h-16 flex-row gap-2 items-center justify-between
        sm:hidden flex z-20">
        <div className="bg-white border border-gray-200 rounded-t-2xl shadow flex flex-row gap-2 w-full justify-center items-center py-2">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-xl w-16 shadow shadow-gray-500 h-10 flex items-center justify-center mx-1
                ${isActive ? 'bg-orange-500' : 'bg-yellow-500'}`
              }
            >
              <span className="text-white text-xs">{label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 shadow shadow-gray-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 ml-2"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Main content */}
      <div
        className="bg-gray-300 text-center pt-0"
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