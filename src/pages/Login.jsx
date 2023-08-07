import React from 'react'
import { Link } from "react-router-dom";
import Button from '../components/Button';

export default function Register() {
    return (
        <div className= /*bg-[#333] */"flex flex-col justify-between min-h-screen ">
            <div className= /*bg-[aqua]*/'p-[1rem] flex justify-center items-center min-h-[10vh] w-fullmax-sx:flex'>
                <img src="/l4.png" alt="logo" className='w-[6rem] max-sx:w-[4.5rem]' />
                <h1 className='text-[#448cdf] text-[2.5rem] font-bold max-sx:text-[1.3rem]'>CGGI TECH</h1>
            </div>

            <div className= /*bg-[#a6de5d]*/ ' py-[1rem] grow flex flex-col items-center '>
                <article className=" rounded-lg p-[1rem] flex flex-col items-center gap-[.5rem] border-[#448cdf] border-2 max-ms:border-hidden">
                    <h2 className="text-[2rem] text-[#448cdf]  font-bold ">Welcome!</h2>
                    <p className=' max-sx:px-8 text-center text-[1rem]  font-bold px-8'>To your most reliable store..</p>

                    <p className=' max-sx:px-8 text-center text-[1rem]  text-[#448cdf] px-8'>  Enter your details to continue..</p>
                    <form className=/*  bg-[#7456] */' flex-col px-8 w-96 flex justify-center max-sx:w-[85%]'>

                        <legend className="text-sm pt-[1.5rem] font-bold">Email</legend>
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            className="p-3 mb-1 border-2  border-[#448cdf] h-[2.4rem]  rounded-lg"
                            name="email"
                        />
                        <legend className="text-sm pt-[1.5rem] font-bold">Password</legend>
                        <input
                            type="password"
                            placeholder="6 characters"
                            className="p-3 mb-1 border-2 border-[#448cdf] h-[2.4rem] rounded-lg"
                            name="password"
                        />

                        <label className='text-center p-[.5rem] '>
                            <input type="checkbox" id="miCheckbox" /> Send notification to my email
                        </label>
                    </form>

                    <Button onClick={(e) => handleForm(e)} text="Log in" />

                    <div className='max-sx:flex max-sx:flex-col flex flex-col justify-center items-center'>
                        <Link to="/Register" className="">
                            Already have an account? <span className="text-blue-500">Sign up</span>
                        </Link>

                        <Link to="/" className="mt-3">
                            Go back to <span className="text-blue-500">home</span>
                        </Link>
                    </div>
                    <img src="/l3.png" alt="logo" className='w-[3rem] max-sx:w-[4.5rem]' />
                    <h4>CGGI TECH</h4>
                </article>
            </div>
        </div>
    )
}
