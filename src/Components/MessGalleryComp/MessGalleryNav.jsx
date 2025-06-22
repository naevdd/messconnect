import React from "react";
import { useNavigate } from 'react-router-dom';

function MessGalleryNav(){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/studentLogin");
    };

    return(
        <nav class="bg-purple-800 border-gray-200 dark:bg-white-900 rounded-3xl ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="text-2xl font-satoshi font-bold text-yellow-300">MESS CONNECT</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-yellow-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-purple-800 dark">
                <li>
                <a href="/" class="block py-2 px-3 bg-purple-800 rounded md:bg-transparent md:p-0 md:dark:text-yellow-300" aria-current="page">Home</a>
                </li>
                <li>
                <a href="/" class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-yellow-300" aria-current="page" onClick={handleLogout}>Logout</a>
                </li>
                <li>
                <a href="/studentprofile" class="block py-2 px-3  hover:bg-gray-100 md:border-0 md:p-0 dark:text-white md:dark:hover:text-orange-400 md:dark:hover:bg-transparent">Profile</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>

    )
}
export default MessGalleryNav;