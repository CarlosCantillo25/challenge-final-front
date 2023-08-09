import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link as Anchor } from 'react-router-dom';
import { useNavigate } from 'react-router';

function NavBar() {

  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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

  function navigateToTVPage() {
    navigate("/TV");
  }
  function navigateToPhonesPage() {
    navigate("/Phones");
  }
  function navigateToFrezeerPage() {
    navigate("/Fridge");
  }
  function navigateToAudioPage() {
    navigate("/SPEAKERS");
  }

  function navigateToAirPage() {
    navigate("/Air");
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
      const response = await axios.get(apiUrl + "auth/verify/" + verificationCode);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Account verified successfully.",
          text: "You can now sign in to your Google account!",
          showConfirmButton: false,
          timer: 3000,
        });

        navigate('/signin')

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

  return (
    <nav className="bg-[#007BFF] w-full min-h-[25vh]">
      <div className="h-[15vh] w-full bg-[#007BFF] flex justify-around items-center px-6">
        <Anchor to={'/'} ><img src="/logo2.png" alt="logo" className="hidden md:block w-[6rem] object-contain" /></Anchor>
        <div className="relative flex items-center">
          <input type="text" placeholder="Find what you are looking for" className="md:w-[20rem] lg:w-[30rem] h-[2.5rem] rounded-[5px] pl-[1rem] pr-[3rem] bg-white border-[#007BFF] focus:ring-[#007BFF] focus:shadow-[#007BFF] outline-none" />
          <span className="absolute right-[1rem] md:right-[3rem] top-[50%] transform -translate-y-1/2 text-[#007BFF]">
            <AiOutlineSearch size={24} />
          </span>
        </div>

        {!isLoggedIn() ? (
          // Mostrar esto solo cuando el usuario no esté logueado
          <div className='flex flex-col items-center'>
            <svg className="w-6 h-6 text-[#ffc548] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
            </svg>
            <div className='hidden md:flex w-[8rem] justify-around'>
              <button onClick={navigateToLoginPage} className='text-[white]'>Log in</button>|<button onClick={navigateToRegisterPage} className='text-[white]'>Register</button>
            </div>
          </div>
        ) : (
          // Mostrar esto solo cuando el usuario esté logueado
          <div className='flex flex-col items-center'>
            <img src={user?.photo} className="h-10 rounded-full" />
            <div className='hidden md:flex flex-col w-[8rem] justify-center items-center mt-2'>
              <button onClick={navigateToLoginPage} className='text-[white] me-4'>{user?.email}</button>
              <button onClick={backHome} className='text-[white]'>Sign Out</button>
            </div>
          </div>
        )}
        <div className='flex flex-col items-center'>
          <svg className="w-6 h-6 text-[#ffc548]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
          </svg>
          <p className='hidden md:block text-[white]'>My shopping cart</p>
        </div>
      </div>
      {isLoggedIn() && user && user.verified === false ? (
        <div className='bg-[#ffd782] h-[50px] flex justify-center items-center'>
          <p className='font-semibold'>CLICK <button onClick={openVerified} className='text-sky-700 hover:text-white'> HERE </button> TO VERIFY YOUR ACCOUNT</p>
        </div>
      ) : ''}
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
            <p>Fridges</p>
          </button>
          <button onClick={navigateToAudioPage} className='p-4 h-[4rem] w-[15%] flex flex-col items-center justify-center'>
            <img className='h-[2rem]' src="/audio.png" alt="" />
            <p>Audio</p>
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