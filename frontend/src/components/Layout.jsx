import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';

const Layout = () => {
    return (
        <div className='flex bg-[#F8FAFC]'>
            <SideMenu />
            
            {/* Outlet is where the specific page content (Groups, Applications, etc.) will render */}
            <div className='flex-1 ml-[20%] w-[80%] h-screen overflow-y-auto hide-scrollbar'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;