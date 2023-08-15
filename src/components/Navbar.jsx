import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { api, apiUrl, endpoints } from '../utils/api';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions.js';
import { Link as Anchor } from "react-router-dom";
import { useNavigate } from 'react-router';
import DesplegableCat from './DesplegableCat';
import axios from 'axios';
import Swal from 'sweetalert2';

function NavBar() {
const navigate = useNavigate();
const dispatch = useDispatch();
const read_products = useSelector((store) => store.products.products);
const [verificationCode, setVerificationCode] = useState("");
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [isVerified, setIsVerified] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [filteredProducts, setFilteredProducts] = useState([]);
const searchQuery = localStorage.getItem('searchTerm');

  
  const performSearch = () => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else {
      const filtered = read_products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

const closeModal = () => {
  setIsModalOpen(false);
};
const handleSearchClick = () => {
  if (searchTerm) {
    closeModal();
    performSearch();
    saveSearchResultsToLocalStorage();
    navigate('/ResultProducts');
  }
};

const handleEnterKey = (event) => {
  if (event.key === 'Enter' && searchTerm) {
    closeModal();
    performSearch();
    saveSearchResultsToLocalStorage();
    navigate('/ResultProducts');
  }
};

const saveSearchResultsToLocalStorage = () => {
  const matchingProductIds = searchResults.map((product) => product._id);
  localStorage.setItem('search', JSON.stringify(matchingProductIds));
  localStorage.setItem('searchTerm', JSON.stringify(searchTerm)); // Guardar el término de búsqueda
};

useEffect(() => {
    dispatch(productsActions.read_products());
  }, [dispatch]);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const openVerified = () => {
    setIsVerified(true);
  };

  const closeVerified = () => {
    setIsVerified(false);
  };


 function navigateHomeAppliancePage() {
    navigate(`/homeAppliances`);
  }
  function navigateGamersPage() {
    navigate("/gamersPage");
  }
  function navigateTechPage() {
    navigate("/techsPage");
  }
 function navigateToLoginPage() {
    navigate("/Login");
  }

  function navigateToRegisterPage() {
    navigate("/Register");
  }

  function backHome() {
    navigate("/");
  }

  function navigateToControlPanel() {
    navigate("/ControlPanel");
  }
 

  let user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user;
  };


  function backHome() {
    localStorage.clear();
    navigate("/");
  }

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(apiUrl + endpoints.verify + verificationCode);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Account verified successfully.",
          text: "You can now sign in to your Google account!",
          showConfirmButton: false,
          timer: 3000,
        });
        closeVerified()
        navigate('/')

      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Error.",
          text: "The verification code is invalid. Please check the code and try again.",
        });
      }
    } catch (error) {
      console.error("Verification failed:", error);
      Swal.fire({
        icon: "error",
        title: "Verification failed.",
        text: "The verification code is invalid. Please check the code and try again.",
      });
    }
  }
  const handleInputBlur = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    performSearch();
  }, [searchTerm]);

  
  return (
    <nav className="bg-[#007BFF] w-full min-h-[25vh]">
      <div className="h-[15vh] w-full bg-[#007BFF] flex justify-around items-center px-6">
        <Anchor to={'/'} ><img src="/logonav.png" alt="logo" className="hidden md:block w-[6.8rem] object-contain" /></Anchor>
        <div className="relative flex items-center">
          <input type="text" placeholder="Find what you are looking for" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onBlur={handleInputBlur} onKeyDown={handleEnterKey}  className="md:w-[20rem] lg:w-[30rem] h-[2.5rem] rounded-[5px] pl-[1rem] pr-[3rem] bg-white border-[#007BFF] focus:ring-[#007BFF] focus:shadow-[#007BFF] outline-none"/>
          <span  className="absolute right-[1rem] md:right-[3rem] top-[50%] transform -translate-y-1/2 text-[#007BFF] cursor-pointer" onClick={() => { setIsModalOpen(true); handleSearchClick(); }} >
            <AiOutlineSearch size={24} />
          </span>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md p-2 z-10 modal-content">
              {searchResults.slice(0, 5).map((product) => (
                <Anchor key={product._id} to={`/products/${product._id}`} className="flex items-center gap-2 p-2" onClick={closeModal}>
                  <img
                    src={product.cover_photo[0]}
                    alt={product.title}
                    className="w-12 h-12 object-cover"
                  />
                  <p>{product.title}</p>
                </Anchor>
              ))}
              {searchResults.length > 5 && (
                <div className="text-center mt-3">
                  <Anchor to="/ResultProducts" className="text-blue-500 hover:underline" onClick={saveSearchResultsToLocalStorage}>
                    More Views
                  </Anchor>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='flex ml-[5rem] w-[20rem] justify-around'>
          {!isLoggedIn() ? (
            // Mostrar esto solo cuando el usuario no esté logueado
            <div  className='flex flex-col items-center '>
              <svg className="w-6 h-6 text-[white] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
              </svg>
              <div className='hidden md:flex w-[8rem] justify-around'>
                <button onClick={navigateToLoginPage} className='text-[white]'>Log in</button>|<button onClick={navigateToRegisterPage} className='text-[white]'>Register</button>
              </div>
            </div>
          ) : isLoggedIn() && user.role === 2 ? (
            // Mostrar esto solo cuando el usuario esté logueado
            <div className='flex flex-col items-center me-6'>
              <div className='hidden md:flex flex-col justify-center items-center mt-2'>
                <button onClick={navigateToControlPanel} className='w-[120%] p-3 text-[white] border-2 rounded flex justify-center items-center'>
                  <img src={user?.photo} className="h-10 rounded-full" />
                  <p>{user?.email}</p>
                </button>
                <button onClick={backHome} className='text-[white]'>Sign Out</button>
              </div>
            </div>
          ) : (
            // Mostrar esto solo cuando el usuario esté logueado
            <div className='flex flex-col items-center'>
              <img src={user?.photo} className="h-10 rounded-full" />
              <div className='hidden md:flex flex-col w-[8rem] justify-center items-center mt-2'>
                <p className='text-[white] me-4'>{user?.email}</p>
                <button onClick={backHome} className='text-[white]'>Sign Out</button>
              </div>
            </div>
          )}
          </div>
        <div className='flex flex-col items-center justify-center'>
          <Anchor to={'/carritoPage'} className='flex flex-col items-center'>
          <svg className="w-6 h-6 text-[white]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
          </svg>
          <p className='hidden md:block text-[white] text-center'>My shopping cart</p>
          </Anchor>
          </div>
      </div>
      <div>
        {isLoggedIn() && user && user.verified === false ? (
          <div className='bg-[#ffd782] h-[50px] flex justify-center items-center'>
            <p className='font-semibold'>CLICK <button onClick={openVerified} className='text-sky-700 hover:text-white'> HERE </button> TO VERIFY YOUR ACCOUNT</p>
          </div>
        ) : ''}
      </div>
      {isVerified && (
                <div className="flex flex-col w-full min-h-[25vh] items-center justify-around bg-[#FFFBEB]">
                  <button onClick={closeVerified}>
                    <img src="/close.png" className="h-7 ms-[20%] mt-[-4%] absolute" />
                  </button>
                  <form onSubmit={handleVerificationSubmit} className="flex mt-[-10%]">
                    <label className="text-[color:var(--secondary-gray,#9D9D9D)] text-base not-italic font-normal leading-[normal]">Enter Verification Code:</label>
                    <div className="ms-5 mt-[-20px]">
                        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="bg-[#FFFBEB] border-b-2 border-slate-400 p-2" />
                        <div className="mt-5 flex flex-col w-[200px] gap-2.5 p-2 rounded-[50000px] bg-[#007BFF]">
                            <button type="submit" className="text-white text-center text-lg not-italic font-bold leading-[normal]">Verify</button>
                        </div>
                    </div>
                  </form>
              </div>
          )}
      <div id='segunda seccion' className="bg-[#FFFBEB] h-[10vh] w-full flex items-center p-10">
       <DesplegableCat/>
      <div className='hidden lg:flex justify-around w-full bg-[#FFFBEB]'>
        <button onClick={navigateHomeAppliancePage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/iconAppliances.png" alt="" />
          <p>Home & Appliances</p>
        </button>
        <button onClick={navigateGamersPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/iconGamer.png" alt="" />
          <p>Gamers</p>
        </button>
        <button onClick={navigateTechPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
          <img className='h-[2rem]' src="/techs.png" alt="" />
          <p>Techs</p>
        </button>

        </div>
</div>
</nav>
  );
}

export default NavBar;