import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MessGalleryNav() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/studentLogin");
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-yellow-400 border-gray-200 dark:bg-white-900 rounded-3xl">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="text-2xl font-satoshi font-bold text-white">MESS CONNECT</span>
                </a>
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={menuOpen}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div
                    id="navbar-default"
                    className={`overflow-hidden transition-all duration-500 ease-in-out w-full md:block md:w-auto ${menuOpen ? 'max-h-96' : 'max-h-0'} md:max-h-full`}
                    style={{}}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-2 mt-4 border border-yellow-100 rounded-3xl md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark">
                        <li>
                            <a href="/" className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-white" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/studentprofile" className="block py-2 px-3 hover:bg-gray-100 md:border-0 md:p-0 dark:text-white md:dark:hover:text-orange-400 md:dark:hover:bg-transparent">Profile</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-red-500" aria-current="page" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default MessGalleryNav;