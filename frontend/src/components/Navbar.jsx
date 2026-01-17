import React from 'react'
import Button from './Button';

const Navbar = () => {
    return (
        <div className='border-b-2 flex items-center justify-between px-5 py-2'>
            {/* logo */}
            <div>
                <h1 className='text-3xl font-bold'>
                    Bonded
                </h1>
            </div>

            {/* menu */}
            <div>
                <ul className='flex items-center gap-10 '>
                    <li>
                        <a href="#" className='text-[#374151] hover:text-[#1E4A68] text-[18px]'>Home</a>
                    </li>
                    <li>
                        <a href="" className='text-[#374151] hover:text-[#1E4A68] text-[18px]'>Teams</a>
                    </li>
                    <li>
                        <a href="" className='text-[#374151] hover:text-[#1E4A68] text-[18px]'>About Us</a>
                    </li>
                    <li>
                        <a href="" className='text-[#374151] hover:text-[#1E4A68] text-[18px]'>Contact</a>
                    </li>
                </ul>
            </div>

            {/* login signup buttons */}
            <div className='flex items-center gap-2 '>
                <Button name="Log In" bgColor="2A6E8C" btnSize="18px"/>
                <Button name="Sign Up" bgColor="FF7A59" btnSize="18px"/>
            </div>
        </div>
    )
}

export default Navbar;