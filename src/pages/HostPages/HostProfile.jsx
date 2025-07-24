import React, { useState, useEffect } from "react";
import axios from "axios";

const HostProfile = () => {
  // Profile details state
  const [profile, setProfile] = useState({
    ownerName: "",
    messName: "",
    location: "",
    mailId: "",
    mobileNumber: "",
    workingDays: "",
    image: ""
  });

  // State to toggle editable mode
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get("https://messbackend-8bh5.onrender.com/hosts"); // Replace with your backend URL
        if (response.data.length > 0) {
          // Assuming the API returns an array of hosts, use the first one for display
          const loggedInEmail = localStorage.getItem("email");
          const hostData = response.data.find(h => h.email === loggedInEmail);
          setProfile({
            id: hostData._id,
            ownerName: hostData.ownername,
            messName: hostData.messname,
            location: hostData.location,
            mailId: hostData.email,
            mobileNumber: hostData.phone,
            workingDays: hostData.workinghours,
            image: hostData.image
          });
        }
      } catch (error) {
        console.error("Error fetching hosts:", error);
      }
    };

    fetchHosts();
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
      const token = localStorage.getItem('messtoken');
      const response = await axios.put("https://messbackend-8bh5.onrender.com/hosts", profile, {
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
    <section>
      {/* Header */}
      <div className="bg-white fixed z-50 shadow-xl border border-black justify-between flex w-full h-16 text-center">
        <p className="text-left text-2xl ml-44 my-auto">PROFILE</p>
        <div className="bg-yellow-500 mr-5 rounded-xl w-12 my-auto h-12">
          <p className="text-white mt-4 text-xs">Profile</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-between p-20 flex-row gap-24">
        {/* Left Section: Profile Image */}
        <div className="ml-36 flex flex-col my-auto shadow-md rounded-full w-3/12 h-96 bg-white items-center justify-center">
          <div className="border bg-red-400 rounded-full w-64 h-64">
            {/* Profile Image */}
            <img src={`https://messbackend-8bh5.onrender.com/uploads/${profile.image}`} alt="" />
          </div>
        </div>

        {/* Right Section: Editable Fields */}
        <div className="mr-20 mt-10 shadow-md rounded-xl w-1/2 p-8 h-auto bg-white">
          <h2 className="text-2xl font-semibold mb-4">Host Details</h2>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Owner Name</label>
            {isEditing ? (
              <input
                type="text"
                name="ownerName"
                value={profile.ownerName}
                onChange={handleProfileChange}
                className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile.ownerName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Mess Name</label>
            {isEditing ? (
              <input
                type="text"
                name="messName"
                value={profile.messName}
                onChange={handleProfileChange}
                className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile.messName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleProfileChange}
                className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile.location}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Mail ID</label>
            {isEditing ? (
              <input
                type="email"
                name="mailId"
                value={profile.mailId}
                onChange={handleProfileChange}
                className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile.mailId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Mobile Number</label>
            {isEditing ? (
              <input
                type="text"
                name="mobileNumber"
                value={profile.mobileNumber}
                onChange={handleProfileChange}
                className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile.mobileNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Working Days</label>
            {isEditing ? (
              <input
                type="text"
                name="workingDays"
                value={profile.workingDays}
                onChange={handleProfileChange}
                className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-left block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile.workingDays}</p>
            )}
          </div>

          <div className="flex justify-between">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostProfile;
