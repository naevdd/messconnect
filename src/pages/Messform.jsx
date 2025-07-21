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
            const response = await axios.post('http://localhost:3000/host/register',formData, {
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
        <div className="flex items-center justify-center flex-col min-h-screen px-2">
            <div className="mt-5 p-2 left-0 right-0 mx-auto w-1/2 flex bg-white border-black border-4 items-center justify-center rounded-3xl
                ">
                <p className="font-satoshi font-bold text-black text-center text-lg xs:text-xl sm:text-2xl md:text-3xl">
                MESS CONNECT
                </p>
            </div>
            <h1 className="mt-16 mb-2 text-xl sm:text-2xl font-bold text-center">Register your mess</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className='flex flex-col items-center mt-4  mx-10 sm:m-7 bg-yellow-400 rounded-2xl p-2 sm:p-8'>
                    <h2 className="text-center  mt-2 sm:mt-4 text-lg sm:text-xl font-semibold">Basic Details</h2>
                    <input
                        value={ownername}
                        onChange={(e) => setOwnername(e.target.value)}
                        type="text"
                        placeholder="Owner name"
                        className="m-2 p-2 w-2/3 sm:w-2/3 bg-white rounded"
                    />
                    <input
                        value={messname}
                        onChange={(e) => setMessname(e.target.value)}
                        type="text"
                        placeholder="Mess name"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        placeholder="Location"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                    <label className="p-2 w-2/3 sm:w-2/3">
                        <div className="label">
                            <span>Add image</span>
                        </div>
                    </label>
                    <input type="file" className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded" onChange={(e) => setImage(e.target.files[0])}/>
                </div>

                <div className='flex flex-col items-center m-10 sm:m-7 bg-yellow-400 rounded-2xl p-2 sm:p-8'>
                    <h2 className='text-center mt-2 sm:mt-4 text-lg sm:text-xl font-semibold'>Owner contact</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Mail ID"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile number"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                </div>
                
                <div className='flex flex-col items-center m-10 sm:m-7 bg-yellow-400 rounded-2xl p-2 sm:p-8'>
                    <h2 className='text-center mt-2 sm:mt-4 text-lg sm:text-xl font-semibold'>Working Days</h2>
                    <input
                        type="text"
                        value={workinghours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="Number of working days"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                </div>
                
                <div className='flex flex-col items-center m-10 sm:m-7 bg-yellow-400 rounded-2xl p-2 sm:p-8'>
                    <h2 className='text-center mt-2 sm:mt-4 text-lg sm:text-xl font-semibold'>Create password</h2>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter password"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Re-enter Password"
                        className="p-2 w-2/3 sm:w-2/3 m-2 bg-white rounded"
                    />
                </div>
                
                <div className='flex items-center justify-center'>
                    <button type="submit" className="mx-10 sm:m-6 bg-black text-white p-3 rounded-2xl hover:bg-yellow-400 hover:text-black transition duration-300  sm:w-auto">
                        Sign up
                    </button>
                </div>
            </form>
            <a className='m-5 text-center text-sm sm:text-base' href="/host/messLogin">Already have an account? Click here to sign in</a>
        </div>
    );
}
