import { React, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Register() {

    let inputEmail = useRef();
    let inputPassword = useRef();
    let inputPhoto = useRef();
    let inputLocation = useRef();

    let navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', inputEmail.current.value);
        formData.append('photo', inputPhoto.current.files[0]);
        formData.append('password', inputPassword.current.value);
        formData.append('location', inputLocation.current.value);

        axios.post("http://localhost:8082/api/user/register", formData)
            .then((res) => {
                navigate("/Login");
                Swal.fire({
                    icon: "success",
                    title: "User Register"
                });
            })
            .catch((error) => {
                const errorMessage = error.response.data.message?.map(each => `<p>${each}</p>`).join("");
                Swal.fire({
                    icon: "error",
                    html: errorMessage,
                });
            });
    }

    let [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (e) => {
        setSelectedFileName(e.target.files[0]?.name || '');
    };


    return (
        <div className= /*bg-[#333] */"flex flex-col justify-between min-h-screen ">
            <div className= /*bg-[aqua]*/'p-[1rem] flex justify-center items-center min-h-[10vh] w-fullmax-sx:flex'>
                <img src="/L4.png" alt="logo" className='w-[6rem] max-sx:w-[4.5rem]' />
                <h1 className='text-[#448cdf] text-[2.5rem] font-bold max-sx:text-[1.3rem]'>CGGI TECH</h1>
            </div>

            <div className='grow flex flex-col justify-center items-center'>
                <article className=" rounded-lg p-[1rem] flex flex-col items-center gap-[1rem] border-[#448cdf] border-2 max-ms:border-hidden">
                    <h2 className="text-[2rem] text-[#448cdf]  font-bold ">Welcome!</h2>
                    <p className=' max-sx:px-8 text-center text-[1rem]  font-bold px-8'>Create your account and buy from wherever you are..</p>

                    <form onSubmit={(e) => handleFormSubmit(e)} encType='multipart/form-data' className='flex-col px-8 w-96 flex justify-center max-sx:w-[85%]'>

                        <legend className="text-sm pt-[1.5rem] font-bold">Email</legend>
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            ref={inputEmail}
                            className="p-3 mb-1 border-2  border-[#448cdf] h-[2.4rem]  rounded-lg"
                            name="email"
                        />
                        <legend className="text-sm pt-[1.5rem] font-bold">Password</legend>
                        <input
                            type="password"
                            placeholder="6 characters"
                            ref={inputPassword}
                            name="password"
                            className="p-3 mb-1 border-2 border-[#448cdf] h-[2.4rem] rounded-lg"
                        />
                        <legend className="text-sm pt-[1.5rem] font-bold">Photo</legend>
                        <div className="relative">
                            <input
                                type="file"
                                ref={inputPhoto}
                                name="photo"
                                className="absolute inset-0 opacity-0 cursor-pointer w-[25rem] h-full"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                className="w-[100%]  max-sx:w-[100%] p-3 mb-1 h-[2.4rem] rounded-lg bg-gradient-to-r from-[#378df0] to-[#a6cef8] text-white font-bold"
                                onClick={handleFileChange}
                            >
                                Choose Photo
                            </button>

                        </div>
                        <span className="text-center font-bold text-sm">{selectedFileName}</span>
                        <legend className="text-sm pt-[1.5rem] font-bold">Location</legend>
                        <input
                            type="text"
                            placeholder="location"
                            ref={inputLocation}
                            name="location"
                            className="p-3 mb-1 border-2 border-[#448cdf] h-[2.4rem] rounded-lg"
                        />
                        <label className='text-center p-[.5rem] '>
                            <input type="checkbox" id="miCheckbox" /> Send notification to my email
                        </label>

                        <div className='flex justify-center'>
                            <input
                                type="submit"
                                value="Sign up"
                                className="mt-2 w-[15rem] max-sx:w-[11rem] h-[3.5rem] rounded-lg bg-gradient-to-r from-[#448cdf] to-[#1970d4] text-white font-bold text-lg "
                            />
                        </div>
                    </form>
                    <div className='max-sx:flex max-sx:flex-col flex flex-col justify-center items-center'>
                        <Link to="/login" className="">
                            Already have an account? <span className="text-blue-500">Log In</span>
                        </Link>

                        <Link to="/" className="mt-3">
                            Go back to <span className="text-blue-500">home</span>
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
