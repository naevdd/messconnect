import React, { useState, useEffect } from "react";
import axios from "axios";

const HostProfile = () => {
  const [profile, setProfile] = useState({
    ownerName: "",
    messName: "",
    location: "",
    mailId: "",
    mobileNumber: "",
    workingDays: "",
    image: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get("https://messbackend-8bh5.onrender.com/hosts");
        if (response.data.length > 0) {
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
      alert("Profile changes saved successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="bg-white fixed z-50 shadow-xl border border-black flex w-full h-16 items-center justify-between px-4 sm:pl-30">
        <p className="text-2xl font-semibold">PROFILE</p>
        <div className="bg-yellow-500 rounded-xl w-12 h-12 flex items-center justify-center">
          <span className="text-white text-xs">Profile</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-36 pt-20 pb-20 sm:pt-30 gap-8 sm:gap-24">
        {/* Profile Image */}
        <div className="flex flex-col my-auto mx-auto items-center shadow-md rounded-full w-48 h-48 sm:w-72 sm:h-72 bg-white justify-center">
          <div className="border bg-red-400 rounded-full w-40 h-40 sm:w-64 sm:h-64 flex items-center justify-center overflow-hidden">
            <img
              src={`http://localhost:3000/uploads/${profile.image}`}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Editable Fields */}
        <div className="shadow-md rounded-xl w-full sm:w-1/2 p-4 sm:p-8 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Host Details</h2>
          {/*
            Mapping through an array of field configurations to render
            labels and inputs/paragraphs for each profile field.
          */}
          {[
            { label: "Owner Name", name: "ownerName", type: "text" },
            { label: "Mess Name", name: "messName", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Mail ID", name: "mailId", type: "email" },
            { label: "Mobile Number", name: "mobileNumber", type: "text" },
            { label: "Working Days", name: "workingDays", type: "text" },
          ].map(({ label, name, type }) => (
            <div className="mb-4" key={name}>
              <label className="block text-left text-sm font-medium text-gray-700">{label}</label>
              {isEditing ? (
                <input
                  type={type}
                  name={name}
                  value={profile[name]}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{profile[name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end">
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
