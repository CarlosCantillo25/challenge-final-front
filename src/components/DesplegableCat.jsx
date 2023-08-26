import React, { useState } from 'react';
import { Link as Anchor } from 'react-router-dom';

export default function DesplegableCat() {
  
  const [openSearch, setOpenSearch] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
 

  const openDropdown = () => {
    setOpenSearch(true);

  };

  const closeDropdown = () => {
    setOpenSearch(false);
  };

  const toggleCategories = (category) => {
    setOpenCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };

  return (
    <div className="relative group bg-[#FFFBEB] h-[10vh] pt-[1.5rem] pl-[1.8rem] w-[20rem]" onMouseEnter={openDropdown} onMouseLeave={closeDropdown} >
      <p className="text-[gray] cursor-pointer font-semibold lg:text-2xl text-xl ms-[-40px] md:ms-0 flex items-center justify-around">
        More
        <svg className={`w-[1rem] mt-[0.4rem] w-6 h-6 text-gray-800 dark:text-white ${openSearch ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
        </svg>
      </p>
      {openSearch && (
        <div className="absolute mt-[1.4rem] w-[23rem] bg-white shadow-md z-10">
          <div onMouseEnter={() => toggleCategories('Mobile & Tabs')} onMouseLeave={() => toggleCategories('Mobile & Tabs')}>
            <p className='ml-[1.2rem] text-[1.2rem] text-[gray]'>Search for specific products by category</p>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Techs </p>
            {openCategories['Mobile & Tabs'] && (
              <div className="absolute top-0 left-full mt-0 bg-white  shadow-md z-10 w-[15rem] h-[30vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Techs</p>
                <Anchor to={'/Phones'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Phones </Anchor>
                <Anchor to={'/Tabs'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Tabs </Anchor>
                <Anchor to={'/Desktops'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Desktops </Anchor>
                <Anchor to={'/Notebooks'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Notebooks </Anchor>
              </div>
            )}
          </div>
          <div onMouseEnter={() => toggleCategories('Category2')} onMouseLeave={() => toggleCategories('Category2')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Audio & Video </p>
            {openCategories['Category2'] && (
              <div className="absolute top-0 left-full mt-0 bg-white shadow-md z-10 w-[15rem] h-[25vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Audio & video</p>
                <Anchor to={'/Headphones'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Headphones </Anchor>
                <Anchor to={'/SPEAKERS'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Speakers </Anchor>
                <Anchor to={'/Cameras'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Cameras </Anchor>
              </div>
            )}
          </div>
          <div onMouseEnter={() => toggleCategories('Category3')} onMouseLeave={() => toggleCategories('Category3')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Gamers </p>
            {openCategories['Category3'] && (
              <div className="absolute top-0 left-full mt-0 bg-white  shadow-md z-10 w-[15rem] h-[30vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Gamers</p>
                <Anchor to={'/Chairs'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Gamer's chairs </Anchor>
                <Anchor to={'/Mouses'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Mouses </Anchor>
                <Anchor to={'/Pc'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> PC's Gamer </Anchor>
                <Anchor to={'/Microphones'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Microphones </Anchor>
                </div>
            )}
          </div>
          <div onMouseEnter={() => toggleCategories('Category4')} onMouseLeave={() => toggleCategories('Category4')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Home & appliances </p>
            {openCategories['Category4'] && (
              <div className="absolute top-0 left-full mt-0 bg-white border shadow-md z-10 w-[15rem] h-[40vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Home & appliances</p>
                <Anchor to={'/TV'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> TV </Anchor>
                <Anchor to={'/Fridge'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Fridges </Anchor>
                <Anchor to={'/Kitchens'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Kitchens </Anchor>
                <Anchor to={'/Air'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Air conditioners </Anchor>
                <Anchor to={'/Laundrys'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Laundrys </Anchor>
                <Anchor to={'/Blenders'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer"> Blenders </Anchor>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
