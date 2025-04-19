import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../index.css';
import MessGalleryNav from '../Components/MessGalleryComp/MessGalleryNav';

const MessGallery = () => {
    const [items, setItems] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const itemsRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:5000/allmesses")
            .then((response) => {
                setItems(response.data);
                console.log("Fetched all items:", response.data);
            })
            .catch((error) => {
                console.error("Error in fetching data ", error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/top_messes")
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
        <div>
            <MessGalleryNav />
            <div>
                <h1 className='mb-5 mt-10 text-left text-4xl ml-4'>{showAll ? "All Messes" : "Favourites"}</h1>
                {!showAll ? (
                    <div className="flex overflow-x-scroll overflow-y-hidden gap-4 p-4">
                        {topItems.map((item) => (
                            <div key={item._id} className="w-80 h-60 rounded-lg shadow-lg flex flex-col">
                                <div className="h-60">
                                    <img src={item.image || "default-image-path.jpg"} alt={item.messname || "Mess Name"} className="w-full h-full object-cover" />
                                </div>
                                <Link to={`/indmess/${encodeURIComponent(item.messname)}`} className="flex flex-row text-lg justify-between bg-yellow-300 p-2 text-center rounded-lg">
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
                    <div ref={itemsRef} className="mt-10 grid grid-cols-3 gap-4">
                        {items.map((item) => (
                            <div key={item._id} className="border rounded-xl shadow-sm hover:bg-gray-100 text-center">
                                <img src={item.image || "default-image-path.jpg"} alt={item.messName || "Mess Name"} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <Link to={`/indmess/${encodeURIComponent(item.messname)}`} className="flex flex-row text-lg justify-between bg-yellow-300 p-2 text-center rounded-lg">
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
                <div className="p-4 mt-10">
                    <button className="px-20 py-5 bg-yellow-300 text-black font-bold rounded-xl hover:bg-yellow-400 focus:outline-none text-3xl" onClick={handleClick}>
                        {showAll ? "Show Favourites" : "View All"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessGallery;
