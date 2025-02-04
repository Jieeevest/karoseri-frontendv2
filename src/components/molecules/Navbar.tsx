"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  const user = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <nav className="w-full z-50 h-20 text-gray-800 bg-white border-b border-gray-300 mb-5 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 pt-4">
          {/* Left Section: Breadcrumbs */}
          <div className="flex items-center space-x-2 font-normal text-sm">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <Link href="/current-page" className="hover:text-gray-300">
              Current Page
            </Link>
          </div>

          {/* Right Section: Name with Dropdown */}
          <div className="flex items-center space-x-4 relative">
            {/* User Name */}
            <div
              className="cursor-pointer flex items-center gap-2 text-sm font-medium"
              onClick={toggleDropdown}
            >
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="">{user.name}</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-50 right-0 mt-60 w-60 bg-white text-gray-800 rounded-lg shadow-sm border-[1px] border-gray-300">
                <div className="flex flex-col">
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm hover:bg-gray-100 rounded-tl-lg rounded-tr-lg"
                  >
                    <div className="flex items-center space-x-2 py-2 border-b-2 border-gray-200">
                      <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="pb-2">
                        <span className="text-gray-700 font-semibold">
                          {user.name}
                        </span>
                        <p className="text-gray-700 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <div className="flex space-x-2 py-2 items-center gap-2">
                      <i className="ki-outline ki-setting-2 text-xl" />
                      Settings
                    </div>
                  </Link>
                  <div
                    className="px-4 py-2 text-sm hover:bg-gray-100"
                    role="button"
                    onClick={handleLogout}
                  >
                    <div className="flex space-x-2 py-2 items-center gap-2">
                      <i className="ki-outline ki-exit-left text-xl" />
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
