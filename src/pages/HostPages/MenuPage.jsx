import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL;

const MenuPage = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menuDetails, setMenuDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const hostId = localStorage.getItem("hostId");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/get-menu/${hostId}`);
        const transformedMenu = response.data.weeklyMenu.reduce((acc, day) => {
          acc[day.day] = {
            Breakfast: day.meals.find((meal) => meal.type === "Breakfast")?.items || [],
            Lunch: day.meals.find((meal) => meal.type === "Lunch")?.items || [],
            Dinner: day.meals.find((meal) => meal.type === "Dinner")?.items || [],
          };
          return acc;
        }, {});
        setMenuDetails(transformedMenu);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [hostId]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsEditing(false);
  };

  const handleMealChange = (meal, index, value) => {
    setMenuDetails((prevDetails) => {
      const updatedItems = [...(prevDetails[selectedDay]?.[meal] || [])];
      updatedItems[index] = value;
      return {
        ...prevDetails,
        [selectedDay]: {
          ...prevDetails[selectedDay],
          [meal]: updatedItems,
        },
      };
    });
  };

  const addMealItem = (meal) => {
    setMenuDetails((prevDetails) => ({
      ...prevDetails,
      [selectedDay]: {
        ...prevDetails[selectedDay],
        [meal]: [...(prevDetails[selectedDay]?.[meal] || []), ""]
      }
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const menu = [
        { type: "Breakfast", items: menuDetails[selectedDay]?.Breakfast || [] },
        { type: "Lunch", items: menuDetails[selectedDay]?.Lunch || [] },
        { type: "Dinner", items: menuDetails[selectedDay]?.Dinner || [] },
      ];

      const weeklyMenu = [{ day: selectedDay, meals: menu }];

      const response = await axios.put(`${BASE_URI}/update-menu`, {
        hostId,
        weeklyMenu,
      });

      alert(response.data.message || "Changes saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full px-2 sm:px-6 pt-6 pb-3 bg-transparent">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow flex items-center justify-between px-4 py-3">
          <p className="text-2xl font-bold text-yellow-500">MENU</p>
          <div className="bg-yellow-500 rounded-xl w-12 h-12 flex items-center justify-center">
            <span className="text-white text-xs">Profile</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto pb-24 px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 flex flex-col md:flex-row gap-0 md:gap-8 p-0 md:p-8">
          {/* Days sidebar */}
          <div className="w-full md:w-1/3 border-r border-gray-100">
            <ul className="flex md:flex-col flex-row p-2 md:p-4 overflow-x-auto md:overflow-visible gap-2 md:gap-0">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <li
                  key={day}
                  className={`p-3 md:p-4 cursor-pointer rounded-lg text-center font-medium transition ${
                    selectedDay === day
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-50 text-gray-700 hover:bg-yellow-50"
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </li>
              ))}
            </ul>
          </div>

          {/* Menu details */}
          <div className="w-full md:w-2/3 p-4 md:p-8">
            <h2 className="text-2xl font-semibold mb-8">{selectedDay} Menu</h2>
            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
              <div key={meal} className="mb-8">
                <label className="block text-base mb-2 font-medium text-gray-700">{meal}</label>
                {isEditing ? (
                  <>
                    {(menuDetails[selectedDay]?.[meal] || [""]).map((item, index) => (
                      <input
                        key={index}
                        type="text"
                        value={item}
                        onChange={(e) => handleMealChange(meal, index, e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 mb-2"
                      />
                    ))}
                    <button
                      onClick={() => addMealItem(meal)}
                      className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                    >
                      Add Item
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">{(menuDetails[selectedDay]?.[meal] || []).join(", ") || <span className="italic text-gray-400">No data</span>}</p>
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
                  Edit Menu
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
