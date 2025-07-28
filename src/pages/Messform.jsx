import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Mpage() {
    const navigate = useNavigate();

    const [ownername, setOwnername] = useState('');
    const [messname, setMessname] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [workinghours, setWorkingHours] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ownername || !messname || !location || !email || !phone || !workinghours || !password){
            alert("All fields are required.")
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const formData = new FormData();
        formData.append('ownername', ownername);
        formData.append('messname', messname);
        formData.append('location', location);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('workinghours', workinghours);
        formData.append('password', password);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('https://messbackend-8bh5.onrender.com/host/register',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Mess saved:', response.data);

            setOwnername('');
            setMessname('');
            setLocation('');
            setEmail('');
            setPhone('');
            setWorkingHours('');
            setPassword('');
            setConfirmPassword('');
            
            navigate('/host/messLogin');
        } catch (err) {
            console.error('Error saving item:', err);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="m-4">Register your mess</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center text-centre m-7 bg-yellow-400 rounded-2xl'>
                    <h2 className="text-center mt-4">Basic Details</h2>
                    <input
                        value={ownername}
                        onChange={(e) => setOwnername(e.target.value)}
                        type="text"
                        placeholder="Owner name"
                        className="m-3 p-2 w-2/3 bg-white"
                    />
                    <input
                        value={messname}
                        onChange={(e) => setMessname(e.target.value)}
                        type="text"
                        placeholder="Mess name"
                        className="p-2 w-2/3 m-3 bg-white"
                    />
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        placeholder="Location"
                        className="p-2 w-2/3 m-3 bg-white"
                    />
                    <label className="p-2">
                        <div className="label ">
                            <span className="">Add image</span>
                        </div>
                    </label>
                    <input type="file" className="p-2 w-2/3 m-6 bg-white" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
    
                <div className='flex flex-col items-center text-centre m-7 bg-yellow-400 rounded-2xl'>
                    <h2 className='text-center mt-4'>Owner contact</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Mail ID"
                        className="p-2 w-2/3 m-3 bg-white"
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile number"
                        className="p-2 w-2/3 mb-6 bg-white"
                    />
                </div>
                
                <div className='flex flex-col items-center m-7 bg-yellow-400 rounded-2xl'>
                    <h2 className='text-center m-4'>Working Days</h2>
                    <input
                        type="text"
                        value={workinghours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="Number of working days"
                        className="p-2 w-2/3 mb-6 bg-white"
                    />
                </div>
                
                <div className='flex flex-col m-7 items-center bg-yellow-400 rounded-2xl'>
                    <h2 className='text-center mt-4'>Create password</h2>
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className="p-2 w-2/3 m-3 bg-white"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Re-enter Password"
                        className="p-2 w-2/3 mb-6 bg-white"
                    />
                </div>
                
                <div className='flex items-center justify-center'>
                    <button type="submit" className="m-6 bg-black text-white p-3 rounded-2xl hover:bg-yellow-400 hover:text-black transition duration-300">
                        Sign up
                    </button>
                </div>
            </form>
            <a className='m-5' href="/host/messLogin">Already have an account? Click here to sign in</a>
        </div>
    );
}
