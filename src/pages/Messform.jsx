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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/host/register', {
                ownername,
                messname,
                location,
                email,
                phone,
                workinghours,
                password
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

            navigate('/messLogin');
        } catch (err) {
            console.error('Error saving item:', err);
        }
    };

    return (
        <div className="main">
            <h1 className="m-11">Register your mess</h1>
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <h2 className="text-left">Basic Details</h2>
                    <input
                        value={ownername}
                        onChange={(e) => setOwnername(e.target.value)}
                        type="text"
                        placeholder="Owner name"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        value={messname}
                        onChange={(e) => setMessname(e.target.value)}
                        type="text"
                        placeholder="Mess name"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        placeholder="Location"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text imglabel">Add image</span>
                        </div>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs mb-10" />
                </div>
    
                <div className='container'>
                    <h2>Owner contact</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Mail ID"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile number"
                        className="input input-bordered w-full max-w-xs mb-10"
                    />
                </div>
                
                <div className='container'>
                    <h2>Working Hours</h2>
                    <input
                        type="text"
                        value={workinghours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="Working Hours"
                        className="input input-bordered w-full max-w-xs mb-10"
                    />
                </div>
                
                <div className='container'>
                    <h2>Create password</h2>
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Re-enter Password"
                        className="input input-bordered w-full max-w-xs mb-10"
                    />
                </div>
                
                <div className='main'>
                    <button type="submit" className="mb-10">
                        Sign up
                    </button>
                </div>
                
            </form>
        </div>
    );
}
