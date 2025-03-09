import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewAll = () => {
    const [items, setItems] = useState([]);
    const [showItems, setShowItems] = useState(false);
    const itemsRef = useRef(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/allmesses")
            .then((response) => {
                setItems(response.data);
                console.log("Fetched items:", response.data); // Debugging
            })
            .catch((error) => {
                console.error("Error in fetching data ", error);
            });
    }, []);

    const handleClick = () => {
        setShowItems(!showItems);
        console.log("Show items toggled:", !showItems); // Debugging
        if (!showItems && itemsRef.current) {
            itemsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="p-4 mt-10">
            {/* Button */}
            <button
                className="px-20 py-5 bg-yellow-300 text-black font-bold rounded-xl hover:bg-yellow-400 focus:outline-none text-3xl"
                onClick={handleClick}
            >
                {showItems ? "Hide" : "View All"}
            </button>

            {/* Items Grid */}
            {showItems && (
                <div ref={itemsRef} className="mt-20 grid grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-xl shadow-sm hover:bg-gray-100 text-center"
                        >
                            {/* Image */}
                            <img
                                src={item.image || "default-image-path.jpg"}
                                alt={item.messName || "Mess Name"}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            {/* Text */}
                            <Link
                                to={`/indmess/${item._id}`}
                                className="bg-yellow-300 text-lg flex flex-row justify-between p-2 rounded-lg"
                            >
                                <h1 className="font-semibold">{item.messName || "Unnamed Mess"}</h1>
                                <h1>Rating: {item.review || "N/A"}</h1>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAll;
