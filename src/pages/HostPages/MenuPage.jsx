import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuPage = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menuDetails, setMenuDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const hostId = localStorage.getItem("hostId");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`https://messbackend-8bh5.onrender.com/get-menu/${hostId}`);
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
        [meal]: [...(prevDetails[selectedDay]?.[meal] || []), ""],
      },
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

      const response = await axios.put("https://messbackend-8bh5.onrender.com/update-menu", {
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
    <section>
      {/* Header */}
      <div className="bg-white fixed z-50 shadow-xl border border-black flex w-full h-16 items-center justify-between px-4 sm:pl-30">
        <p className="text-2xl font-semibold">MENU</p>
        <div className="bg-yellow-500 rounded-xl w-12 h-12 flex items-center justify-center">
          <span className="text-white text-xs">Profile</span>
        </div>
      </div>

      {/* Responsive layout */}
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-36 pt-20 sm:pt-30 gap-8 sm:gap-24">
        {/* Days sidebar */}
        <div className="shadow-md rounded-xl w-full sm:w-1/3 bg-white">
          <ul className="flex sm:flex-col flex-row p-2 sm:p-4 overflow-x-auto sm:overflow-visible">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <li
                key={day}
                className={`p-4 sm:p-8 cursor-pointer whitespace-nowrap ${selectedDay === day ? "bg-gray-300" : "bg-white"}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>

        {/* Menu details */}
        <div className="shadow-md rounded-xl w-full sm:w-1/2 p-4 sm:p-8 h-auto bg-white">
          <h2 className="text-2xl font-semibold mb-6 sm:mb-10">{selectedDay} Menu</h2>

          {["Breakfast", "Lunch", "Dinner"].map((meal) => (
            <div key={meal} className="mb-6 sm:mb-10">
              <label className="block text-sm mb-2 font-medium text-gray-700">{meal}</label>
              {isEditing ? (
                <>
                  {(menuDetails[selectedDay]?.[meal] || [""]).map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      value={item}
                      onChange={(e) => handleMealChange(meal, index, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                <p>{(menuDetails[selectedDay]?.[meal] || []).join(", ") || "No data"}</p>
              )}
            </div>
          ))}

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
