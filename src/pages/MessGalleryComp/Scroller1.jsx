import React from 'react';

const Scroller1 = () => {
    const items = [
        {
            src: "/sc1-1.jpg",
            text: "Mess 1"
        },
        {
            src: "/images/image2.jpg",
            text: "Mess 2"
        },
        {
            src: "/images/image3.jpg",
            text: "Mess 3"
        },
        {
            src: "/images/image4.jpg",
            text: "Mess 4"
        },
        {
            src: "/images/image5.jpg",
            text: "Mess 5"
        },
    ];

    return (
        <div className="flex overflow-x-auto gap-4 p-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 w-60 h-48 rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                    {/* Image */}
                    <div className="h-36">
                        <img
                            src={item.src}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 bg-white  p-2 text-center">
                        <h1 className="text-10px font-semibold">{item.text}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Scroller1;
