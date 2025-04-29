import React from 'react'
import { FaBookmark, FaHome, FaSave } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className='fixed top-0 left-0 right-0 text-white bg-gray-800  h-[50px] flex justify-center items-center gap-6 z-20 shadow-2xl border-b-2 border-gray-400'> 
            <NavLink to={'/'} className='flex justify-center items-center gap-2'><FaHome />  Home</NavLink>
            <NavLink to='/saved' className='flex justify-center items-center gap-2' ><FaBookmark /> Saved</NavLink>

        </div>
    )
}

export default Header