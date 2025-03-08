import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Scroller1 = () => {

    const [items,setItems]=useState([]);

    useEffect(()=>{
        axios
        .get("http://localhost:5000/top_messes")
        .then((response)=>{
            setItems(response.data);
        })
        .catch((error)=>{
            console.error(error);
        })
    },[]);

    return (
        <div className="flex overflow-x-scroll scroll-p-7 scrollbar-none overflow-y-hidden scrollbar-hide gap-4 p-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="w-96 h-60 flex-none rounded-lg shadow-lg flex flex-col"
                >
                    {/* Image */}
                    <div className="h-60">
                        <img
                            src={item.image||""}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover "
                        />
                    </div>
                    
                    {/* Text */}
                    <Link to={`/indmess/${item._id}`} className="flex flex-row text-lg justify-between bg-yellow-300  p-2 text-center">
                        <h1 className="font-semibold">{item.messName}</h1>
                        <p>Rating: {item.review}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Scroller1;
