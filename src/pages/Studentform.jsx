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
    
            try {
                const response = await axios.post('http://localhost:3000/student/register', {
                    studentname,
                    hostelname,
                    address,
                    email,
                    phone,
                    password
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
        <div className='main'>
            <h1 className='m-10'>Student registration</h1>
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <h2>Student details</h2>
                    <input value = {studentname} onChange={(e) => setStudentname(e.target.value)} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
                    <input value = {hostelname} onChange={(e) => setHostelname(e.target.value)} type="text" placeholder="Hostel name" className="input input-bordered w-full max-w-xs" />
                    <input value = {address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" className="input input-bordered w-full max-w-xs mb-10" />
                </div>
                <div className='container'>
                    <h2>Contact Details</h2>
                    <input value = {email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Mail ID" className="input input-bordered w-full max-w-xs" />
                    <input value = {phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Mobile number" className="input input-bordered w-full max-w-xs mb-10" />
                </div>
                <div className='container'>
                    <h2>Create password</h2>
                    <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" className="input input-bordered w-full max-w-xs" />
                    <input value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Re-enter Password" className="input input-bordered w-full max-w-xs mb-10" />
                </div>
                <div className='main'>
                    <button type="submit" className='mb-10' onClick={()=>{navigate('/studentLogin')}}>Sign up</button>
                </div>
            </form>
        </div>
        
    )
}