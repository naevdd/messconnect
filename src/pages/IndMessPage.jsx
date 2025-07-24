import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/MessGalleryComp/MessGalleryNav";
import Reviews from "../Components/MessGalleryComp/Reviews";

function IndMessPage() {
  const [mess, setMessData] = useState([]);
  const { id } = useParams();
  const [profile, setProfile] = useState({
      studentName: "",
      location: "",
      phone: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/indmess/${id}`) // Corrected endpoint 
      .then((response) => {
        console.log("Fetched data:", response.data); // Debug
        setMessData(response.data); // Ensure data is an array for mapping
      })
      .catch((error) => {
        console.error("Error fetching mess data:", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students"); // Replace with your backend URL
        if (response.data.length > 0) {
          // Assuming the API returns an array of hosts, use the first one for display
          const loggedInEmail = localStorage.getItem("email");
          const studentData = response.data.find(h => h.email === loggedInEmail);
          setProfile({
            studentName: studentData.studentname,
            location: studentData.location,
            phone: studentData.phone
          });
        }
      } catch (error) {
        console.error("Error fetching hosts:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleOrderClick = async() => {
    // Handle order click logic here
    console.log("Order button clicked for mess:", mess.messname);
    const orderDetails = {
      orderId:Math.random().toString(36).substring(2, 15),
      messName: mess.messname,
      customerName: profile.studentName,
      customerPhone: profile.phone,
      status:"Pending"
    }

    try{
      const response = await axios.post("https://messbackend-8bh5.onrender.com/order", orderDetails);
      alert("Order placed");
      console.log("Order details = ",response.data);
    }
    catch(error){
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  }

  return (
    <div className="m-10 mx-40">
      <NavBar />
      <div className="gap-4 mt-12">
            <div
              className="flex flex-row rounded-xl max-h-max overflow-hidden"
            >
              {/* Left Section: Image and Mess Name */}
              <div className="flex flex-col w-1/2 mr-5">
                {/* Image */}
                <div className="h-full w-full rounded-xl">
                  <img
                    src={`https://messbackend-8bh5.onrender.com/uploads/${mess.image}`} // Default image
                    alt={mess.messname || "Mess Name"}
                  />
                </div>

                {/* Mess Name */}
                <div className="bg-yellow-300 py-4 text-center text-4xl mt-5 font-semibold rounded-xl">
                  <h1>{mess.messname}</h1>
                </div>
              </div>

              {/* Right Section: Details */}
              <div className="flex flex-col w-full md:w-1/2 rounded-xl">
                <div className="bg-yellow-300 p-5 rounded-3xl">
                  <h2 className="text-4xl font-bold text-center mb-8">Details</h2>
                  <ul className="space-y-6 text-left">
                    <li className="text-2xl">
                      <strong >Timings:</strong> {mess.time}
                    </li>
                    <li className="text-2xl">
                      <strong >Locations Served:</strong> {mess.location}
                    </li>
                    <li className="text-2xl">
                      <strong >Contact:</strong> {mess.phone}
                    </li>

                    <li>
                      <strong className="text-2xl">Meals for the day:</strong> {mess.contact}
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li className="text-l">Breakfast: {mess.breakfast}</li>
                        <li className="text-l">Lunch: {mess.lunch}</li>
                        <li className="text-l">Dinner: {mess.dinner}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="mt-1">
                  <Reviews />
                  {/* Order Button */}
                  <div className="mt-7 flex justify-center">
                    <button className="bg-red-600 text-white px-6 py-2 rounded-full text-3xl hover:bg-red-700" onClick={handleOrderClick} >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>

      </div>
    </div>
  );
}

export default IndMessPage;
