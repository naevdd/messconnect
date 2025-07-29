import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaBowlFood, FaLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import axios from "axios";
import NavBar from "../Components/MessGalleryComp/MessGalleryNav";
import Reviews from "../Components/MessGalleryComp/Reviews";

function IndMessPage() {
  const [mess, setMessData] = useState({});
  const [mealsToday, setMealsToday] = useState({});
  const { id } = useParams();
  const [profile, setProfile] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:3000/indmess/${id}`) // ✅ Backticks added
      .then((response) => {
        console.log("Fetched data:", response.data);
        setMessData(response.data);

        // ✅ Fixing day detection
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

        // ✅ Check for matching day in menu
        const todayMenu = response.data.weeklyMenu?.find((menu) => menu.day === today);

        setMealsToday(todayMenu ? todayMenu.meals : {});
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
          const loggedInEmail = localStorage.getItem("studemail");
          const studentData = response.data.find(h => h.email === loggedInEmail);
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

    console.log("Order button clicked for mess:", mess.messname);
    const orderDetails = {
      orderId: Math.random().toString(36).substring(2, 15),
      messemail: mess.email,
      customerName: profile.studentname,
      customerEmail: profile.studentemail,
      customerPhone: profile.phone,
      status: "Pending",
    };

    try {
      const response = await axios.post("http://localhost:3000/order", orderDetails);
      alert("Order placed");
      console.log("Order details = ", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="lg:m-10 md:10 lg:mx-40 md:mx-40 m-4">
      <NavBar />
      <div className="mt-12">
        <div className="flex flex-col md:flex-row lg:flex-row rounded-xl md:max-h-max lg:max-h-max md:overflow-hidden lg:overflow-hidden gap-10">
          {/* Left Section: Image and Mess Name */}
          <div className="flex flex-col md:w-1/2 lg:w-1/2 md:mr-5 lg:mr-5">
            {/* Image */}
            <img
              src={`http://localhost:3000/uploads/${mess.image}`} // ✅ Backticks added
              alt={mess.messname || "Mess Name"}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Mess Name */}
            <div className="bg-yellow-300 py-4 text-center text-4xl mt-5 font-semibold rounded-xl">
              <h1>{mess.messname}</h1>
            </div>
          </div>

          {/* Right Section: Details */}
          <div className="flex flex-col w-full md:w-1/2 rounded-xl">
            <div className="p-5 rounded-3xl">
              <h2 className="text-4xl font-bold text-center mb-8">Details</h2>
              <ul className="space-y-7 text-left">
                <li className="text-2xl flex items-center">
                  <FaRegClock className="inline-block mr-2 text-2xl" />
                  <strong>Timings:</strong> {mess.time}
                </li>
                <li className="text-2xl flex items-center">
                  <FaLocationDot className="inline-block mr-2 text-2xl" />
                  <span>Locations Served: </span>
                  <span className="font-medium">{mess.location}</span>
                </li>
                <li className="text-2xl flex items-center">
                  <IoPricetagsOutline className="inline-block mr-2 text-2xl" />
                  <strong>Price: </strong> {mess.price}
                </li>

                <li>
                  <div className="flex items-center">
                    <FaBowlFood className="inline-block mr-2 text-2xl" />
                    <strong className="text-2xl">Meals for the day: </strong>
                  </div>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li className="text-l">Breakfast: {mealsToday.breakfast || "Not Available"}</li>
                    <li className="text-l">Lunch: {mealsToday.lunch || "Not Available"}</li>
                    <li className="text-l">Dinner: {mealsToday.dinner || "Not Available"}</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-1 flex flex-col items-center justify-center gap-2">
              <Reviews />
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-full text-3xl hover:bg-red-700"
                onClick={handleOrderClick}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  export default IndMessPage;