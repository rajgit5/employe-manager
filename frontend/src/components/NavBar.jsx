import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {FaBars} from "react-icons/fa"
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-green-500">Employee Manager</span>
            </div>
            <div className="hidden md:flex md:space-x-8 md:ml-10">
              <Link to="/dashboard" className="text-gray-700 hover:text-green-500">Dashboard</Link>
              <Link to="/employees" className="text-gray-700 hover:text-green-500">Employees</Link>
              <Link to="/reports" className="text-gray-700 hover:text-green-500">Reports</Link>
              {isLoggedIn && (
                <Link to="/profile" className="text-gray-700 hover:text-green-500">My Profile</Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-500"
              >
                Logout
              </button>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-500 focus:outline-none"
            >
              <FaBars/>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="block text-gray-700 hover:text-green-500">Dashboard</Link>
            <Link to="/employees" className="block text-gray-700 hover:text-green-500">Employees</Link>
            <Link to="/reports" className="block text-gray-700 hover:text-green-500">Reports</Link>
            {isLoggedIn && (
              <Link to="/profile" className="block text-gray-700 hover:text-green-500">My Profile</Link>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-700 hover:text-green-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;