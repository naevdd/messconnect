import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Scroller1 = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/top_messes")
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="flex overflow-x-scroll overflow-y-hidden gap-4 p-4">
            {items.map((item) => (
                <div
                    key={item._id}
                    className="w-80 h-60 rounded-lg shadow-lg flex flex-col"
                >
                    {/* Image */}
                    <div className="h-60">
                        <img
                            src={item.image || "default-image-path.jpg"}
                            alt={item.messName || "Mess Name"}
                            className="w-full h-full object-cover "
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
    );
};

export default Scroller1;
