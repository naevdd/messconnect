import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL;

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
        const response = await axios.get(`${BASE_URI}/hosts`);
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
      await axios.put(`${BASE_URI}/hosts`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile changes saved successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 py-10 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border border-gray-100 flex flex-col md:flex-row gap-10 p-6 md:p-5">
        {/* Profile Image */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
          <div className="border bg-yellow-400 rounded-full w-40 h-40 md:w-56 md:h-56 flex items-center justify-center overflow-hidden shadow">
            <img
              src={profile.image ? `${BASE_URI}/uploads/${profile.image}` : "https://placehold.co/300x300?text=No+Image"}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Editable Fields */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-500">Host Details</h2>
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />
              ) : (
                <p className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-50">{profile[name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-yellow-400 text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
