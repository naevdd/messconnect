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
            })
            .catch((error) => {
                console.error("Error in fetching data ", error);
            });
    }, []);

    const handleClick = () => {
        setShowItems(!showItems);
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
                            className="w-72  h-60 rounded-lg shadow-lg flex flex-col"
                        >
                            {/* Image */}
                            <div className="h-60">
                                <img
                                    src={item.image || "default-image-path.jpg"}
                                    alt={item.messname || "Mess Name"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text */}
                            <Link
                                to={`/indmess/${item._id}`}
                                className="flex flex-row text-lg justify-between bg-yellow-300 p-2 text-center rounded-lg"
                            >
                                <h1 className="font-semibold">{item.messName || "Unnamed Mess"}</h1>
                                <p>Rating: {item.review || "N/A"}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAll;
