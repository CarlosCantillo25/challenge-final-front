import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'; // Importa los íconos desde react-icons

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-[#007BFF] w-full h-[25vh]">
      <div className="h-[15vh] w-full bg-[#007BFF] flex justify-between items-center px-6">
        <img src="../public/logo2.png" alt="logo" className="w-[6rem] object-contain" />
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Find what you are looking for"
            className="w-[30rem] h-[2.5rem] rounded-[5px] pl-[1rem] pr-[3rem] bg-white border-[#007BFF] focus:ring-[#007BFF] focus:shadow-[#007BFF] outline-none"
          />
          <span className="absolute right-[3rem] top-[50%] transform -translate-y-1/2 text-[#007BFF]">
            <AiOutlineSearch size={24} />
          </span>
        </div>
        <span className="text-[#007BFF] cursor-pointer">
          <AiOutlineShoppingCart size={24} />
        </span>
      </div>
      <div id='segunda seccion' className="bg-[#F5F5F5] h-[10vh] w-full flex items-center ">
        <div className="relative group bg-[#FFFBEB] h-[10vh] pt-[1.5rem] pl-[1.8rem] w-[12rem]">
          <span
            className="text-[gray] cursor-pointer"
            onClick={toggleDropdown}
          >
            Buy for categories
          </span>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-[35rem] bg-white border border-[#007BFF] rounded-md shadow-md">
            <p className="block px-4 py-2 text-[#007BFF] hover:bg-[#007BFF] hover:text-white">Select for category</p>
              <a className="block px-4 py-2 text-[#007BFF] hover:bg-[#007BFF] hover:text-white">
                Example Category
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
