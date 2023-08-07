import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router';

function NavBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  function navigateToTVPage() {
    navigate("/tv");
  }
  function navigateToPhonesPage() {
    navigate("/phones");
  }
  function navigateToFrezeerPage() {
    navigate("/freezer");
  }
  function navigateToAudioPage() {
    navigate("/speakers");
  }

  function navigateToAirPage() {
    navigate("/air");
  }

  return (
    <nav className="bg-[#007BFF] w-full h-[25vh]">
      <div className="h-[15vh] w-full bg-[#007BFF] flex justify-around items-center px-6">
        <img src="/logo2.png" alt="logo" className="hidden md:block w-[6rem] object-contain" />
        <div className="relative flex items-center">
          <input type="text" placeholder="Find what you are looking for" className="md:w-[20rem] lg:w-[30rem] h-[2.5rem] rounded-[5px] pl-[1rem] pr-[3rem] bg-white border-[#007BFF] focus:ring-[#007BFF] focus:shadow-[#007BFF] outline-none"/>
          <span className="absolute right-[1rem] md:right-[3rem] top-[50%] transform -translate-y-1/2 text-[#007BFF]">
            <AiOutlineSearch size={24} />
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <svg className="w-6 h-6 text-[#ffc548] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
          </svg>
          <div className='hidden md:flex w-[8rem] justify-around'>
            <a className='text-[white]'>Log in</a>|<a className='text-[white]'>Register</a>
          </div>
        </div>
        <div className='flex flex-col items-center'>
        <svg className="w-6 h-6 text-[#ffc548] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
        </svg>
        <p className='hidden md:block text-[white]'>My shopping cart</p>
      </div>
        
      </div>
      <div id='segunda seccion' className="bg-[#F5F5F5] h-[10vh] w-full flex items-center p-10">
        <div className="relative group bg-[#FFFBEB] h-[10vh] pt-[1.5rem] pl-[1.8rem] w-[30rem]" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <span className="text-[gray] cursor-pointer font-semibold lg:text-2xl text-xl ms-[-40px] md:ms-0">CATEGORIES</span>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-[35rem] bg-white border border-[#007BFF] rounded-md shadow-md z-10">
              <p className="block px-4 py-2 text-[#007BFF] hover:bg-[#007BFF] hover:text-white">Select for category</p>
              <a className="block px-4 py-2 text-[#007BFF] hover:bg-[#007BFF] hover:text-white">Example Category</a>
            </div>
          )}
        </div>
      <div className='hidden lg:flex justify-between w-full bg-[#FFFBEB]'>
        <button onClick={navigateToTVPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/TV.png" alt="" />
          <p>TV</p>
        </button>
        <button onClick={navigateToPhonesPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/cell.png" alt="" />
          <p>Phones</p>
        </button>
        <button onClick={navigateToFrezeerPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/freezer.png" alt="" />
          <p>Freezer</p>
        </button>
        <button onClick={navigateToAudioPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/audio.png" alt="" />
          <p>Speakers</p>
        </button>
        <button onClick={navigateToAirPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/air.png" alt="" />
          <p>Air conditionet</p>
        </button>
      </div>
      </div>
    </nav>
  );
}

export default NavBar;
