import React,{useState,useEffect} from "react";
import axios from "axios";
import MessGalleryNav from "../Components/MessGalleryComp/MessGalleryNav";

const BASE_URI = import.meta.env.VITE_API_URL;

function StudP() {

  const [profile, setProfile] = useState({
      studentname: "",
      hostelname: "",
      address: "",
      email: "",
      phone: "",
    });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/students`);
        if (response.data.length > 0) {
          const loggedInEmail = localStorage.getItem("studemail");
          const studentData = response.data.find(h => h.email === loggedInEmail);
          setProfile({
            id: studentData._id,
            studentname: studentData.studentname,
            hostelname: studentData.hostelname,
            address: studentData.address,
            email: studentData.email,
            phone: studentData.phone,
          });
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URI}/students`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Profile updated successfully:", response.data);
      alert("Profile changes saved successfully!");
      setIsEditing(false); // Disable edit mode after saving
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save changes. Please try again.");
    }
  };


  return (
    <div className="m-2 sm:m-4 md:mx-10 lg:mx-40">
    <MessGalleryNav />
    <div className="min-h-screen flex items-center justify-center pt-3 sm:pt-5">
      <div className="bg-yellow-400 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Profile</h1>
        <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl">
            <div>
                <p><span className="font-semibold">Name:</span> </p>
                {isEditing ? (
                <input
                    type="text"
                    name="studentname"
                    value={profile.studentname}
                    onChange={handleProfileChange}
                    className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                ) : (
                <p className="mt-1 text-left block w-full min-h-7 px-3 py-2 border bg-white border-black rounded-md shadow-sm">{profile.studentname}</p>
                )}
            </div>  
            <div>
                <p><span className="font-semibold">Hostel Name:</span> </p>
                {isEditing ? (
                <input
                    type="text"
                    name="hostelname"
                    value={profile.hostelname}
                    onChange={handleProfileChange}
                    className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                ) : (
                <p className="mt-1 text-left block w-full min-h-7 px-3 py-2 border bg-white border-black rounded-md shadow-sm">{profile.hostelname}</p>
                )}
            </div> 
            <div>
                <p><span className="font-semibold">Address:</span> </p>
                {isEditing ? (
                <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                ) : (
                <p className="mt-1 text-left block w-full min-h-7 px-3 py-2 border bg-white border-black rounded-md shadow-sm">{profile.address}</p>
                )}
            </div>            
            <div>
                <p><span className="font-semibold">Email ID:</span> </p>
                {isEditing ? (
                <input
                    type="text"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                ) : (
                <p className="mt-1 text-left block w-full min-h-7 px-3 py-2 border bg-white border-black rounded-md shadow-sm">{profile.email}</p>
                )}
            </div>
            <div>
                <p><span className="font-semibold">Phone:</span> </p>
                {isEditing ? (
                <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                ) : (
                <p className="mt-1 text-left block w-full min-h-7 px-3 py-2 border bg-white border-black rounded-md shadow-sm">{profile.phone}</p>
                )}
            </div> 
            <div>
                {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="bg-red-600 text-white py-2 px-6 rounded-2xl block mx-auto"
              >
                Save Changes
              </button>
            ) : (
              <button className="bg-red-600 text-white py-2 px-6 rounded-2xl block mx-auto" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            </div>    
            
        </div>
      </div>
    </div>
    </div>
  );
}

export default StudP;
