import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Scroller1 = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/top_messes")
            .then((response) => {
                console.log("Recieved data = ",response);
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
                    key={item.messname}
                    className="w-80 h-60 rounded-lg shadow-lg flex flex-col"
                >
                    {/* Image */}
                    <div className="h-60">
                        <img
                            src={item.image || "default-image-path.jpg"}
                            alt={item.messname || "Mess Name"}
                            className="w-full h-full object-cover "
                        />
                    </div>
                    
                    {/* Text */}
                    <Link 
                        to={`/indmess/${item.messname}`} 
                        className="flex flex-row text-lg justify-between bg-yellow-300 p-2 text-center rounded-lg"
                    >
                        <h1 className="font-semibold">{item.messname || "Unnamed Mess"}</h1>
                        <p>                        
                        Rating:{" "}
                        {item.review_total > 0
                            ? (item.review_sum / item.review_total).toFixed(1)
                            : "N/A"}          

                            {/*Rating: {item.review !== undefined ? Number(item.review).toFixed(1) : "N/A"}*/}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Scroller1;
