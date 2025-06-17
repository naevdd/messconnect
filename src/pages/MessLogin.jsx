import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function Mlogin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/host/login', { email, password });
            
            const recievedToken = response.data.token;
            localStorage.setItem('token', recievedToken); 
            localStorage.setItem('email', email);
            localStorage.setItem("hostId", response.data.hostId);
            setToken(recievedToken);
            alert('Login successful! Token stored.');
            navigate('/host',{ replace: true });
    
        } catch (err) {
            console.error('Login failed:', err);
            alert('Invalid credentials');
        }
    };
    
    return(
        <div className='flex items-center justify-center h-screen flex-col'>
            <div className='flex items-center justify-center flex-col bg-yellow-400 text-center rounded-2xl'>
                <h1 className='p-3'>Mess Login</h1>
                <form onSubmit={handleLogin}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Mail ID" className="w-2/3 p-2 m-3 bg-white" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-2/3 p-2 m-3 bg-white" />
                    <div className='flex justify-center'>
                        <button action="submit" className='m-6 bg-black text-white p-3 rounded-2xl hover:bg-white hover:text-black transition duration-300'>Login</button>
                    </div>
                </form>
            </div> 
            <a className='mt-5' href="/host/messRegistration">Don't have an account? Click here to sign up</a>
        </div>
    )
}