import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Spage(){
    const navigate = useNavigate();
    
        const [studentname, setStudentname] = useState('');
        const [hostelname, setHostelname] = useState('');
        const [address, setAddress] = useState('');
        const [phone, setPhone] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!studentname || !hostelname || !address || !email || !phone || !password) {
                alert('All fields are required');
                return;
            }
    
            try {
                const response = await axios.post('https://messbackend-8bh5.onrender.com/student/register', {
                    studentname,
                    hostelname,
                    address,
                    email,
                    phone,
                    password
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                
                console.log('Student saved:', response.data);
    
                setStudentname('');
                setHostelname('');
                setAddress('');
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
    
                navigate('/studentLogin');
            } catch (err) {
                console.error('Error saving item:', err.response ? err.response.data : err.message);
            }
        };
    return (
        <div className='flex items-center justify-center flex-col'>
            <h1 className='m-4'>Student registration</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center text-centre m-7 bg-yellow-400 rounded-2xl'>
                    <h2 className='text-center mt-4'>Student details</h2>
                    <input value = {studentname} onChange={(e) => setStudentname(e.target.value)} type="text" placeholder="Name" className="p-2 w-2/3 m-3 bg-white" />
                    <input value = {hostelname} onChange={(e) => setHostelname(e.target.value)} type="text" placeholder="Hostel name" className="p-2 w-2/3 m-3 bg-white" />
                    <input value = {address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" className="p-2 w-2/3 m-6 bg-white" />
                </div>
                <div className='flex flex-col items-center text-centre m-7 bg-yellow-400 rounded-2xl'>
                    <h2 className='text-center mt-4'>Contact Details</h2>
                    <input value = {email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Mail ID" className="p-2 w-2/3 m-3 bg-white" />
                    <input value = {phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Mobile number" className="p-2 w-2/3 m-6 bg-white" />
                </div>
                <div className='flex flex-col items-center text-centre m-7 bg-yellow-400 rounded-2xl'>
                    <h2 className='text-center mt-4'>Create password</h2>
                    <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" className="p-2 w-2/3 m-3 bg-white" />
                    <input value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Re-enter Password" className="p-2 w-2/3 m-6 bg-white" />
                </div>
                <div className='flex items-center justify-center'>
                    <button type="submit" className='m-6 bg-black text-white p-3 rounded-2xl hover:bg-yellow-400 hover:text-black transition duration-300'>Sign up</button>
                </div>
            </form>
            <a className='m-5' href="/studentLogin">Already have an account? Click here to sign in</a>
        </div>
        
    )
}