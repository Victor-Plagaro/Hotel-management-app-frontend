import React, { useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";

export const NameUser: React.FC = () => {
  const usuario: string | null = useSelector(
    (state: RootState) => state.user.user?.email || null,
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-1 focus:ring-black focus:ring-offset-2 focus:outline-none dark:bg-stone-800 dark:text-gray-200 dark:hover:bg-stone-900 dark:focus:ring-2"
      >
        {usuario || "Usuario"}
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-stone-800 dark:text-gray-200 dark:ring-white">
          <div className="py-1">
            <a
              href="/perfil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-stone-500"
            >
              Perfil
            </a>
            <a
              href="/#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-stone-500"
            >
              <Logout />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameUser;
