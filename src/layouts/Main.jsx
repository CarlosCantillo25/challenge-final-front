import React from 'react'
import NavBar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from 'react-router-dom'

export default function Main(){
  return (
    <div className='bg-[#f1f1f1]'>
    <NavBar/>
      <Outlet/> 
    <Footer/>
    </div> 
)
}