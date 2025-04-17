import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/MessGalleryComp/MessGalleryNav";
import Reviews from "../Components/MessGalleryComp/Reviews";

function IndMessPage() {
  const [messData, setMessData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/indmess/${id}`) // Corrected endpoint
      .then((response) => {
        console.log("Fetched data:", response.data); // Debug
        setMessData([response.data]); // Ensure data is an array for mapping
      })
      .catch((error) => {
        console.error("Error fetching mess data:", error);
      });
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="gap-4 mt-12">
        {messData.length > 0 ? (
          messData.map((mess) => (
            <div
              key={mess._id}
              className="flex flex-row rounded-xl max-h-max overflow-hidden"
            >
              {/* Left Section: Image and Mess Name */}
              <div className="flex flex-col w-1/2 mr-5">
                {/* Image */}
                <div className="h-full w-full rounded-xl">
                  <img
                    src={mess.image || "default-image-path.jpg"} // Default image
                    alt={mess.messName || "Mess Name"}
                  />
                </div>

                {/* Mess Name */}
                <div className="bg-yellow-300 py-4 text-center text-4xl mt-5 font-semibold rounded-xl">
                  <h1>{mess.messName}</h1>
                </div>
              </div>

              {/* Right Section: Details */}
              <div className="flex flex-col w-full md:w-1/2 rounded-xl">
                <div className="bg-yellow-300 p-5 rounded-xl">
                  <h2 className="text-4xl font-bold mb-8">Details</h2>
                  <ul className="space-y-6 text-2xl text-left">
                    <li>
                      <strong>Timings:</strong> {mess.time}
                    </li>
                    <li>
                      <strong>Locations Served:</strong> {mess.location}
                    </li>
                    <li>
                      <strong>Price:</strong> {mess.price}
                    </li>
                    <li>
                      <strong>Food for the Day:</strong> {mess.food}
                    </li>
                  </ul>
                </div>
                <div className="mt-1">
                  <Reviews />
                  {/* Order Button */}
                  <div className="mt-7 flex justify-center">
                    <button className="bg-red-600 text-white px-6 py-2 rounded-full text-3xl hover:bg-red-700">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20 text-2xl">Loading mess details...</div>
        )}
      </div>
    </div>
  );
}

export default IndMessPage;
