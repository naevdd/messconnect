import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaBowlFood, FaLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import axios from "axios";
import NavBar from "../Components/MessGalleryComp/MessGalleryNav";
import Reviews from "../Components/MessGalleryComp/Reviews";

const BASE_URI = import.meta.env.VITE_API_URL;

function IndMessPage() {
  const [mess, setMessData] = useState({});
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URI}/indmess/${id}`)
      .then((response) => {
        setMessData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mess data:", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/students`);
        if (response.data.length > 0) {
          const loggedInEmail = localStorage.getItem("studemail");
          const studentData = response.data.find((h) => h.email === loggedInEmail);
          setProfile({
            id: studentData._id,
            studentname: studentData.studentname,
            studentemail: loggedInEmail,
            hostelname: studentData.hostelname,
            address: studentData.address,
            phone: studentData.phone,
          });
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleOrderClick = async () => {
    const orderDetails = {
      orderId: Math.random().toString(36).substring(2, 15),
      messemail: mess.email,
      customerName: profile.studentname,
      customerEmail: profile.studentemail,
      customerPhone: profile.phone,
      status: "Pending",
    };

    try {
      const response = await axios.post(`${BASE_URI}/order`, orderDetails);
      alert("Order placed. Order ID: " + response.data.orderId);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 flex flex-col md:flex-row gap-0 md:gap-8 p-0 md:p-8">
          {/* Left Section */}
          <div className="flex flex-col md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
              <img
                src={mess.image ? `${BASE_URI}/uploads/${mess.image}` : "https://placehold.co/600x400?text=No+Image"}
                alt={mess.messname || "Mess Name"}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 px-6 py-3 border-t border-gray-100">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{mess.messname}</h1>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4 bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaLocationDot className="text-yellow-500" />
                <span className="font-semibold">Location:</span>
                <span>{mess.location}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaRegClock className="text-yellow-500" />
                <span className="font-semibold">Timings:</span>
                <span>{mess.time}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700">
                <IoPricetagsOutline className="text-yellow-500" />
                <span className="font-semibold">Price:</span>
                <span>₹{mess.price}</span>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex flex-col md:w-1/2 justify-between">
            <div className="bg-gray-50 rounded-xl shadow-sm p-6 mb-6 mt-6 md:mt-0 border border-gray-100">
              <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                <FaBowlFood className="text-yellow-500" /> Meals for the Day
              </h2>
              <ul className="space-y-3 text-base">
                <li>
                  <span className="font-semibold text-yellow-600">Breakfast:</span>{" "}
                  <span>{mess.breakfast || <span className="italic text-gray-400">Not Available</span>}</span>
                </li>
                <li>
                  <span className="font-semibold text-yellow-600">Lunch:</span>{" "}
                  <span>{mess.lunch || <span className="italic text-gray-400">Not Available</span>}</span>
                </li>
                <li>
                  <span className="font-semibold text-yellow-600">Dinner:</span>{" "}
                  <span>{mess.dinner || <span className="italic text-gray-400">Not Available</span>}</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full">
                <Reviews />
              </div>
              <button
                className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-semibold px-8 py-3 rounded-full shadow transition"
                onClick={handleOrderClick}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IndMessPage;