import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom'


export default function Slogin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            axios.post('http://localhost:3000/student/login', { email, password })
                .then((response) => {
                    localStorage.setItem('token', response.data.token); // ✅ Store token
                    navigate('/protected');
                })
                .catch((err) => console.error('Login failed:', err));
            alert('Login successful! Token stored.');
            navigate('/protected')
        } catch (err) {
            console.error(err.response.data.error);
            alert('Invalid credentials');
        }
    };
    return(
        <div className='container'>
            <h1>Student Login</h1>
            <form onSubmit={handleLogin}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Mail ID" className="input input-bordered w-full max-w-xs" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                <div className='main'>
                    <button action="submit">Login</button>
                </div>
                {token && <p>Your Token: {token}</p>}
            </form>
        </div>
    )
}