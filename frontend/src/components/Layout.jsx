import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import { useState } from 'react';

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className='flex bg-[#F8FAFC]'>
            <SideMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            
            {/* Outlet is where the specific page content (Groups, Applications, etc.) will render */}
            <div className={`flex-1 ${isCollapsed ? 'ml-[4%] w-[96%]' : 'ml-[20%] w-[80%]'} px-10 h-screen overflow-y-auto hide-scrollbar transition-all duration-300`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;