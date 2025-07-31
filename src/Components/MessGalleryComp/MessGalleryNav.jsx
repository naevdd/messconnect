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
        <nav className="w-full px-2 sm:px-6 pt-4 pb-2 bg-transparent">
            <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md flex flex-wrap items-center justify-between px-4 py-3">
                <a href="/" className="flex items-center space-x-3">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                    <span className="text-2xl font-bold text-yellow-500">MESS CONNECT</span>
                </a>
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-200"
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out w-full md:block md:w-auto ${menuOpen ? 'max-h-96' : 'max-h-0'} md:max-h-full`}
                >
                    <ul className="font-medium flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
                        <li>
                            <a href="/" className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-gray-700 hover:text-yellow-500 transition" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/studentprofile" className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-gray-700 hover:text-yellow-500 transition">Profile</a>
                        </li>
                        <li>
                            <button
                                className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-red-500 hover:text-red-700 transition"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MessGalleryNav;