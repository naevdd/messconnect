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
            axios.post('https://messbackend-8bh5.onrender.com/student/login', { email, password })
                .then((response) => {
                    const storedToken = response.data.token;
                    localStorage.setItem('token', storedToken);
                    localStorage.setItem('studemail',email)
                    setToken(storedToken)
                    alert('Login successful! Token stored.');
                    navigate('/mess');
                })
                .catch((err) => {
                    console.error('Login failed:', err);
                    alert("Invalid credentials.")
                });
        } catch (err) {
            console.error(err.response.data.error);
            alert('Invalid credentials');
        }
    };
    return(
        <div>
            <div className="z-10 fixed mt-5 p-2 left-0 right-0 mx-auto w-1/2 flex bg-white border-black border-4 items-center justify-center rounded-3xl
                ">
                <p className="font-satoshi font-bold text-black text-center text-lg xs:text-xl sm:text-2xl md:text-3xl">
                MESS CONNECT
                </p>
            </div>
            <div className='flex flex-col items-center justify-center h-screen px-4 sm:px-0'>
                <div className='flex flex-col items-center justify-center bg-yellow-400 text-center rounded-2xl w-3/4 max-w-md sm:max-w-lg p-6 sm:p-10'>
                    <h1 className='text-md font-bold mb-4 lg:text-2xl'>Student Login</h1>
                    <form onSubmit={handleLogin} className='w-full'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Mail ID" className="w-5/6 lg:w-full p-2 my-3 bg-white rounded" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-5/6 lg:w-full p-2 my-3 bg-white rounded" />
                        <div className='flex justify-center'>
                            <button action="submit" className='px-4 py-2 text-md mt-4 bg-black text-white rounded-xl hover:bg-white hover:text-black transition duration-300 lg:px-6 lg:py-3 lg:mt-4'>Login</button>
                        </div>
                    </form>
                </div>
                <a className='mt-6 text-center' href="/studentRegistration">Don't have an account? Click here to sign up</a>
            </div>
        </div>  
    )
}