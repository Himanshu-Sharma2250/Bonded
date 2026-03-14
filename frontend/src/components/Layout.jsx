import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';
import { useState } from 'react';

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='flex bg-[#F8FAFC] min-h-screen'>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <SideMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>

            {/* Mobile Header */}
            <div className="block lg:hidden fixed top-0 left-0 w-full bg-[#F8FAFC] border-b z-40">
                <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    isCollapsed ? 'lg:ml-[4%]' : 'lg:ml-[20%]'
                } px-4 sm:px-8 py-6 h-screen overflow-y-auto hide-scrollbar ${
                    mobileMenuOpen ? 'overflow-hidden' : ''
                } lg:pt-0 pt-16`}
            >
                <Outlet />
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </div>
    );
};

export default Layout;