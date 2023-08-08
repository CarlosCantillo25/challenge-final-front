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
    <div
      className="relative group bg-[#FFFBEB] h-[10vh] pt-[1.5rem] pl-[1.8rem] w-[30rem]"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <span className="text-[gray] cursor-pointer font-semibold lg:text-2xl text-xl ms-[-40px] md:ms-0">
        CATEGORIES
      </span>
      {openSearch && (
        <div className="absolute mt-[1.4rem] w-[20rem] bg-white shadow-md z-10">
          <p className="block px-4 py-2 text-[#1b1f24] text-center text-[1.2rem]">
            Search products for categories
          </p>
          <div onMouseEnter={() => toggleCategories('Mobile & Tabs')} onMouseLeave={() => toggleCategories('Mobile & Tabs')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
              Techs
            </p>
            {openCategories['Mobile & Tabs'] && (
              <div className="absolute top-0 left-full mt-0 bg-white  shadow-md z-10 w-[15rem] h-[30vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Techs</p>
                <Anchor to={'/Phones'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Phones
                </Anchor>
                <Anchor to={'/Tabs'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Tabs
                </Anchor>
                <Anchor to={'/Desktops'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Desktops
                </Anchor>
                <Anchor to={'/Notebooks'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Notebooks
                </Anchor>
                {/* Agrega más opciones aquí */}
              </div>
            )}
          </div>
          <div onMouseEnter={() => toggleCategories('Category2')} onMouseLeave={() => toggleCategories('Category2')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
              TV & AUDIO
            </p>
            {openCategories['Category2'] && (
              <div className="absolute top-0 left-full mt-0 bg-white shadow-md z-10 w-[15rem] h-[30vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>TV & AUDIO</p>
                <Anchor to={'/TV'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  TV
                </Anchor>
                <Anchor to={'/Headphones'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Headphones
                </Anchor>
                <Anchor to={'/Microphones'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Microphones
                </Anchor>
                <Anchor to={'/Cameras'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Cameras
                </Anchor>
                {/* Agrega más opciones aquí */}
              </div>
            )}
          </div>
          {/* Agrega más bloques de categorías y desplegables aquí */}
          <div onMouseEnter={() => toggleCategories('Category3')} onMouseLeave={() => toggleCategories('Category3')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
              Gamers
            </p>
            {openCategories['Category3'] && (
              <div className="absolute top-0 left-full mt-0 bg-white  shadow-md z-10 w-[15rem] h-[30vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Gamer components</p>
                <Anchor to={'/Chairs'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Gamer's chairs
                </Anchor>
                <Anchor to={'/Mouses'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Mouses
                </Anchor>
                <Anchor to={'/Pc'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  PC's Gamer
                </Anchor>
                </div>
            )}
          </div>
          <div onMouseEnter={() => toggleCategories('Category4')} onMouseLeave={() => toggleCategories('Category4')}>
            <p className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
            Home & appliances
            </p>
            {openCategories['Category4'] && (
              <div className="absolute top-0 left-full mt-0 bg-white border shadow-md z-10 w-[15rem] h-[35vh]">
                <p className='text-center text-[1.3rem] py-[1rem]'>Home & appliances</p>
                <Anchor to={'/Fridge'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Fridges
                </Anchor>
                <Anchor to={'/Kitchens'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Kitchens
                </Anchor>
                <Anchor to={'/Air'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Air conditionets
                </Anchor>
                <Anchor to={'/Laundrys'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Laundrys
                </Anchor>
                <Anchor to={'/Blenders'} className="block px-4 py-2 text-[#007BFF] hover:text-[gray] text-[1rem] cursor-pointer">
                  Blenders
                </Anchor>
                {/* Agrega más opciones aquí */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
