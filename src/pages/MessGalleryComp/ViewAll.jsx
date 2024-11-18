import React, { useState } from 'react';

const ViewAll = () => {
    const items = [
        { id: 1, name: "Item 1", src:"../../assets/MessGallery/sc2-2.jpg"},
        { id: 2, name: "Item 2", src:"../../assets/MessGallery/sc2-2.jpg"},
        { id: 3, name: "Item 3", src:"../../assets/MessGallery/sc2-2.jpg" },
        { id: 4, name: "Item 4", src:"../../assets/MessGallery/sc2-2.jpg" },
        { id: 5, name: "Item 5", src:"../../assets/MessGallery/sc2-2.jpg" },
        { id: 6, name: "Item 6", src:"../../assets/MessGallery/sc2-2.jpg" },
        { id: 7, name: "Item 7", src:"../../assets/MessGallery/sc2-2.jpg" },
        { id: 8, name: "Item 8", src:"../../assets/MessGallery/sc2-2.jpg" },
        { id: 9, name: "Item 9", src:"../../assets/MessGallery/sc2-2.jpg" },
    ];

    const [showItems, setShowItems] = useState(false);

    return (
        <div className="p-4 mt-8">
            {/* Button */}
            <button
                className="px-20 py-5 bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400 focus:outline-none text-3xl"
                onClick={() => setShowItems(!showItems)}
            >
                {showItems ? "Hide" : "View All"}
            </button>

            {/* Items Grid */}
            {showItems && (
                <div className="mt-7 grid grid-cols-3 gap-4 h-10">
                    {items.map((item) => (
                        
                        <div
                            key={item.id}
                            className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 text-center"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAll;
