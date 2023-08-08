import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { gapi } from "gapi-script"
import { api, apiUrl, endpoints } from '../utils/api.js';

export default function Register() {

    const clientId = "770842422626-r3ft5ak40jijipm6elelj7dt5r3p6s31.apps.googleusercontent.com"

    const [verificationSuccess, setVerificationSuccess] = useState(false)

    let inputEmail = useRef();
    let inputPassword = useRef();
    let navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        let data = {
            email: inputEmail.current.value,
            password: inputPassword.current.value
        }


        axios.post(apiUrl + endpoints.register, data)
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

    useEffect(() => {
        gapi.load("client:auth2", ()=> {
          gapi.auth2.init({ clientId: clientId })
        })
      }, [])

    const responseSuccess = (res) => {
        let data = {
          email: res.profileObj.email,
          photo: res.profileObj.imageUrl,
          password: res.profileObj.googleId
        }
    
        axios.post(apiUrl + endpoints.register, data)
          .then(res => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'New user creation successful!',
              showConfirmButton: false,
              timer: 1500
          })
          setVerificationSuccess(true)
          navigate('/Login')
          })
          .catch(error => {
          const err = error.response.data.messages
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err || 'This email is already registered'
          })
        })
      }

        const responseGoogle = (res) => {
            if (res.error === "popup_closed_by_user") {
              // Mostrar una notificación o mensaje al usuario informando que el inicio de sesión fue cancelado.
              Swal.fire({
                icon: "info",
                title: "Login canceled",
                text: "The login process with Google was canceled by the user.",
              });
            } else {
              console.log("Failed to sign in with Google:", res.error);
            }
          }   


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
                        {/* <label className="text-sm  pt-[1.5rem] font-bold">Name</label>
                        <input
                            type="text"
                            placeholder="Name and Surname"
                            ref={inputName}
                            name="name"
                            className="p-3 mb-1 border-2 border-[#448cdf] h-[2.4rem] rounded-lg"
                        /> */}
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
                    <GoogleLogin
                  className='w-[70%] md:w-[60%] flex justify-center'
                  clientId={clientId}
                  buttonText="Sign up with Google"
                  onSuccess={responseSuccess}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  />
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
