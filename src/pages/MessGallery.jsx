import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import MessGalleryNav from '../Components/MessGalleryComp/MessGalleryNav';

const BASE_URI = import.meta.env.VITE_API_URL;

const MessGallery = () => {
    const [items, setItems] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');
            return;
        }
        // Auth check (optional, can be removed if not needed)
        axios.get(`${BASE_URI}/student/protected`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        }).catch(() => navigate('/'));
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URI}/allmesses`)
            .then((response) => setItems(response.data))
            .catch((error) => console.error("Error in fetching data", error));
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URI}/top_messes`)
            .then((response) => setTopItems(response.data))
            .catch((error) => console.error("Error fetching top items:", error));
    }, []);

    const handleClick = () => setShowAll(!showAll);

    const MessCard = ({ item }) => (
        <div className="rounded-xl shadow bg-white border border-gray-100 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
            <div className="relative h-44 md:h-56 w-full">
                <img
                    src={`${BASE_URI}/uploads/${item.image}`}
                    alt={item.messname || "Mess Name"}
                    className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                    {item.review_total > 0
                        ? `⭐ ${(item.review_sum / item.review_total).toFixed(1)}`
                        : "No Rating"}
                </div>
            </div>
            <Link
                to={`/indmess/${item._id}`}
                className="flex flex-col items-center justify-center flex-1 px-4 py-4 bg-gray-50 rounded-b-xl"
            >
                <h1 className="font-bold text-lg text-gray-800 mb-1 truncate w-full">{item.messname || "Unnamed Mess"}</h1>
                <p className="text-gray-500 text-sm">{item.location || "Location not set"}</p>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <MessGalleryNav />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        {showAll ? "All Messes" : "Favourites"}
                    </h1>
                    <button
                        className="px-7 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow transition text-base md:text-lg"
                        onClick={handleClick}
                    >
                        {showAll ? "Show Favourites" : "View All"}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(showAll ? items : topItems).map((item) => (
                        <MessCard key={item._id} item={item} />
                    ))}
                </div>
                {(showAll ? items : topItems).length === 0 && (
                    <div className="text-center text-gray-500 text-lg mt-16">
                        No messes found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessGallery;