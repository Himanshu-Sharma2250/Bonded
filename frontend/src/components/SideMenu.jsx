import { User, LayoutDashboard, Megaphone, Users, Mail, MoveLeft } from 'lucide-react'
import React, { useState } from 'react'

const SideMenu = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');

    // Helper to determine classes for each menu item
    const getLinkClass = (id) => {
        const baseClasses = 'flex justify-start gap-2 px-3 items-center h-14 cursor-pointer transition-colors duration-200';
        const activeClasses = 'bg-[#2A6E8C] text-[#F8FAFC]';
        const inactiveClasses = 'text-[#000000] hover:bg-[#E9F1F5] hover:text-[#2A6E8C]';

        return `${baseClasses} ${currentPage === id ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className='fixed left-0 top-0 h-screen w-[20%] border-r-2 bg-[#F8FAFC]'>
            {/* div 1 - Logo */}
            <div className='h-[10%] w-full flex items-center justify-center border-b-2'>
                <h1 className='text-[26px] font-bold'>Bonded</h1>
            </div>

            {/* div 2 - Menu */}
            <div className='h-[80%] w-full flex flex-col py-2 px-2'>
                <div className={getLinkClass('Dashboard')} onClick={() => setCurrentPage('Dashboard')}>
                    <LayoutDashboard className='w-5' />
                    <h1 className='text-2xl'>Dashboard</h1>
                </div>
                
                <div className={getLinkClass('Announcements')} onClick={() => setCurrentPage('Announcements')}>
                    <Megaphone className='w-5' />
                    <h1 className='text-2xl'>Announcements</h1>
                </div>
                
                <div className={getLinkClass('Groups')} onClick={() => setCurrentPage('Groups')}>
                    <Users className='w-5' />
                    <h1 className='text-2xl'>Groups</h1>
                </div>
                
                <div className={getLinkClass('Applications')} onClick={() => setCurrentPage('Applications')}>
                    <Mail className='w-5' />
                    <h1 className='text-2xl'>Applications</h1>
                </div>
            </div>

            {/* div 3 - Profile */}
            <div className='h-[10%] w-full flex justify-between items-center px-2 border-t-2'>
                <div className='flex justify-start rounded-xs items-center gap-2 border-2 px-3 py-1.5 w-[80%] cursor-pointer'>
                    <User className='w-5'/>
                    <span className='text-[17px]'>Username</span>
                </div>
                <button className='border-2 px-1 py-1 rounded-xs cursor-pointer'>
                    <MoveLeft className='w-5' />
                </button>
            </div>
        </div>
    )
}

export default SideMenu