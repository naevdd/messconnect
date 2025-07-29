import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

function Reviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { id } = useParams(); // Get the mess ID from the URL
  const BASE_URI = import.meta.env.VITE_API_URL;
  const handleRatingClick = async (ratingValue) => {
    setRating(ratingValue);

    try {
      const response = await axios.post(`${BASE_URI}/indmess/${id}/rate`, {
        rating: ratingValue,
      });
      console.log("Rating submitted:", response.data);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex space-x-1" role="group" aria-label="Star rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={index}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full px-2"
              onClick={() => handleRatingClick(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              aria-label={`Rate ${ratingValue} stars out of 5`}
            >
              <FaStar
                className={`w-8 h-8 ${
                  ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                } transition-colors duration-200`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
