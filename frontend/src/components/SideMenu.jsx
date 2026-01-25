import { User, LayoutDashboard, Megaphone, Users, Mail, MoveLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';

const SideMenu = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const currentPageRef = useRef(currentPage);

    useEffect(() => {
        currentPageRef.current = currentPage;
        setBgColor();
    }, [currentPage])

    const setBgColor = () => {
        const id = currentPageRef.current;
        const element = document.getElementById(id);

        if (element) {
            element.style.backgroundColor = '#2A6E8C'
            element.style.color = '#F8FAFC'
        }
    }

    const resetBgColor = () => {
        const id = currentPageRef.current;
        const element = document.getElementById(id);

        if (element) {
            element.style.backgroundColor = '#F8FAFC'
            element.style.color = '#000000'
        }
    }

    const changePage = (e) => {
        resetBgColor();

        const element = e.currentTarget;
        const id = element.getAttribute("id");

        setCurrentPage(id);
    }

    return (
        <div className='h-screen w-[20%] border-r-2 bg-[#F8FAFC]'>
            {/* div 1 - contains logo */}
            <div className='h-[10%] w-full flex items-center justify-center border-b-2'>
                <h1 className='text-[26px]'>
                    Bonded
                </h1>
            </div>

            {/* div 2 - contains menu */}
            <div className='h-[80%] w-full flex flex-col py-2 px-2'>
                <div className='flex justify-start gap-2 px-3 items-center h-14 cursor-pointer hover:bg-[#E9F1F5] hover:text-[#2A6E8C]' id='Dashboard' onClick={changePage}>
                    <LayoutDashboard className='w-5' />
                    <h1 className='text-2xl'>
                        Dashboard
                    </h1>
                </div>
                
                <div className='flex justify-start gap-2 px-3 items-center h-14 cursor-pointer hover:bg-[#E9F1F5] hover:text-[#2A6E8C]' id='Announcements' onClick={changePage}>
                    <Megaphone className='w-5' />
                    <h1 className='text-2xl'>
                        Announcements
                    </h1>
                </div>
                
                <div className='flex justify-start gap-2 px-3 items-center h-14 cursor-pointer hover:bg-[#E9F1F5] hover:text-[#2A6E8C]' id='Groups' onClick={changePage}>
                    <Users className='w-5' />
                    <h1 className='text-2xl'>
                        Groups
                    </h1>
                </div>
                
                <div className='flex justify-start gap-2 px-3 items-center h-14 cursor-pointer hover:bg-[#E9F1F5] hover:text-[#2A6E8C]' id='Applications' onClick={changePage}>
                    <Mail className='w-5' />
                    <h1 className='text-2xl'>
                        Applications
                    </h1>
                </div>
            </div>

            {/* div 3 - contains user profile */}
            <div className='h-[10%] w-full flex justify-between items-center px-2 border-t-2'>
                <div className='flex justify-start rounded-xs items-center gap-2 border-2 px-3 py-1.5 w-[80%] cursor-pointer'>
                    <User className='w-5'/>
                    <span className='text-[17px]'>
                        Username
                    </span>
                </div>

                <button className='border-2 px-1 py-1 rounded-xs cursor-pointer'>
                    <MoveLeft className='w-5' />
                </button>
            </div>
        </div>
    )
}

export default SideMenu
