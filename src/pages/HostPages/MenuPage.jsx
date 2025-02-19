import React, { useState } from "react";

const MenuPage = () => {
  // State to manage the selected day and the meal details for each day
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menuDetails, setMenuDetails] = useState({
    Monday: { breakfast: "", lunch: "", dinner: "" },
    Tuesday: { breakfast: "", lunch: "", dinner: "" },
    Wednesday: { breakfast: "", lunch: "", dinner: "" },
    Thursday: { breakfast: "", lunch: "", dinner: "" },
    Friday: { breakfast: "", lunch: "", dinner: "" },
    Saturday: { breakfast: "", lunch: "", dinner: "" },
    Sunday: { breakfast: "", lunch: "", dinner: "" },
  });

  // State to toggle editable mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle day selection
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsEditing(false); // Reset to non-editable when switching days
  };

  // Function to handle input changes for meals
  const handleMealChange = (meal, value) => {
    setMenuDetails((prevDetails) => ({
      ...prevDetails,
      [selectedDay]: {
        ...prevDetails[selectedDay],
        [meal]: value,
      },
    }));
  };

  // Function to handle save
  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
    setIsEditing(false); // Disable editing after saving
  };

  return (
    <section>
      {/* Header */}
      <div className="bg-white fixed z-50 shadow-xl border border-black justify-between flex w-full h-16 text-center">
        <p className="text-left text-2xl ml-44 my-auto">MENU</p>
        <div className="bg-yellow-500 mr-5 rounded-xl w-12 my-auto h-12">
          <p className="text-white mt-4 text-xs">Profile</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-between p-20 flex-row gap-24">
        {/* Left Section: Days of the Week */}
        <div className="ml-20 mt-10 shadow-md rounded-xl w-1/3 bg-white">
          <ul className="flex flex-col p-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <li
                key={day}
                className={`p-8 cursor-pointer ${selectedDay === day ? "bg-gray-300" : "bg-white"}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Meal Details */}
        <div className="mr-20 mt-10 shadow-md rounded-xl w-1/2 p-8 h-auto bg-white">
          <h2 className="text-2xl font-semibold mb-10">{selectedDay} Menu</h2>

          {/* Editable Meal Fields */}
          <div className="mb-10">
            <label className="block text-sm mb-2 font-medium text-gray-700">Breakfast</label>
            {isEditing ? (
              <input
                type="text"
                value={menuDetails[selectedDay].breakfast}
                onChange={(e) => handleMealChange("breakfast", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p>{menuDetails[selectedDay].breakfast || "No data"}</p>
            )}
          </div>

          <div className="mb-10">
            <label className="block text-sm mb-2 font-medium text-gray-700">Lunch</label>
            {isEditing ? (
              <input
                type="text"
                value={menuDetails[selectedDay].lunch}
                onChange={(e) => handleMealChange("lunch", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p>{menuDetails[selectedDay].lunch || "No data"}</p>
            )}
          </div>

          <div className="mb-10">
            <label className="block text-sm mb-2 font-medium text-gray-700">Dinner</label>
            {isEditing ? (
              <input
                type="text"
                value={menuDetails[selectedDay].dinner}
                onChange={(e) => handleMealChange("dinner", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p>{menuDetails[selectedDay].dinner || "No data"}</p>
            )}
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex justify-between">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="mt-4 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 mx-auto bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
              >
                Edit Menu
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
