import React from "react";
import { useNavigate } from 'react-router-dom';

function MessGalleryNav(){

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/studentLogin");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return(
        <nav class="bg-yellow-400 border-gray-200 dark:bg-white-900 rounded-3xl">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="text-2xl font-satoshi font-bold text-white">MESS CONNECT</span>
            </a>
            <button 
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded={isOpen}
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-2 mt-4 border border-yellow-100 rounded-3xl md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                    <li>
                        <a href="/" className="block py-2 px-3 bg-purple-800 rounded md:bg-transparent md:p-0 text-white">Home</a>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="block w-full text-left py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 text-white">Logout</button>
                    </li>
                    <li>
                        <a href="/studentprofile" className="block py-2 px-3 hover:bg-gray-100 md:border-0 md:p-0 text-white md:text-yellow-500 md:hover:text-orange-400">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
        </nav>

    )
}
export default MessGalleryNav;