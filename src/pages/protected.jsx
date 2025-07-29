import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    window.history.pushState(null,null, window.location.href);
    window.onpopstate = () => {
        window.history.go(1);
    };

    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if (!storedToken) {
      setMessage('Unauthorized. Please log in.');
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
        setMessage('Access denied. Invalid token.');
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/studentLogin');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{message}</h1>
      {token && <p className="mt-3 text-sm text-gray-700">Your Token: {token}</p>}
      <button 
        onClick={handleLogout} 
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default ProtectedPage;
