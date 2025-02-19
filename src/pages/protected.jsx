import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized. Please log in.');
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student/protected', {
          headers: { Authorization: `Bearer ${token}` },
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

  return <h1>{message}</h1>;
};

export default ProtectedPage;
