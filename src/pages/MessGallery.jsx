
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import '../index.css';
import MessGalleryNav from '../Components/MessGalleryComp/MessGalleryNav';

const MessGallery = () => {
    const [items, setItems] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const itemsRef = useRef(null);

    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {        
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        if (!storedToken) {
        navigate('/');
        return;
        }

        const controller = new AbortController();
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/student/protected', {
            headers: { Authorization: `Bearer ${storedToken}` },
            signal: controller.signal,
            });
            setMessage(response.data.message);
        } catch (err) {
            if (axios.isCancel(err)) return;
            nav
        }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/allmesses")
            .then((response) => {
                setItems(response.data);
                console.log("Fetched all items:", response.data);
            })
            .catch((error) => {
                console.error("Error in fetching data ", error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/top_messes")
            .then((response) => {
                setTopItems(response.data);
                console.log("Fetched top items : ",response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleClick = () => {
        setShowAll(!showAll);
        console.log("Show items toggled:", !showAll);
    };

    return (
        <div className="lg:px-40 md:px-20 px-2 lg:py-10 py-5">
            <MessGalleryNav />
            <div>
                <h1 className='mb-5 py-9 md:py-18 lg:py-18 text-left text-4xl ml-4'>{showAll ? "All Messes" : "Favourites"}</h1>
                {!showAll ? (
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-10 px-3">
                        {[...topItems]
                        .filter(item => item.review_total > 0)
                        .sort((a, b) => (b.review_sum / b.review_total) - (a.review_sum / a.review_total))
                        .slice(0, 4)
                        .map((item) => (
                            <div key={item._id} className="border rounded-xl shadow-sm hover:bg-gray-100 text-center">
                                <div className="h-40 md:h-60 lg:h-60">
                                    <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.messname || "Mess Name"} className="w-full h-40 md:h-60 object-cover rounded-t-xl" />
                                </div>
                                <Link to={ `/indmess/${item._id}`} className="flex flex-row text-lg justify-between bg-yellow-300 p-1 text-center rounded-lg">
                                    <h1 className="font-semibold">{item.messname || "Unnamed Mess"}</h1>
                                    <p>
                                        Rating:{" "}
                                        {item.review_total > 0
                                            ? (item.review_sum / item.review_total).toFixed(1)
                                            : "N/A"}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div ref={itemsRef} className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-10 px-3">
                        {items.map((item) => (
                            <div key={item._id} className="border rounded-xl shadow-sm hover:bg-gray-100 text-center">
                                <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.messname || "Mess Name"} className="w-full h-40 md:h-60 object-cover rounded-t-xl" />
                                <Link to={`/indmess/${item._id}`} className="flex flex-row text-lg justify-between bg-yellow-300 p-1 text-center rounded-lg">
                                    <h1 className="font-semibold">{item.messname || "Unnamed Mess"}</h1>
                                    <p>
                                        Rating:{" "}
                                        {item.review_total > 0
                                            ? (item.review_sum / item.review_total).toFixed(1)
                                            : "N/A"}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                <div className="p-4 mt-10 flex w-full">
                    <button className="px-20 py-5 mx-auto bg-yellow-300 text-black font-bold rounded-xl hover:bg-yellow-400 focus:outline-none text-3xl" onClick={handleClick}>
                        {showAll ? "Show Favourites" : "View All"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessGallery;