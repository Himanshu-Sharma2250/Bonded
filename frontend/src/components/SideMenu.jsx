import { LayoutDashboard, Users, Mail, MoveLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ProfileOptionModal from './ProfileOptionModal';

const SideMenu = ({ isCollapsed, setIsCollapsed }) => {
    const linkStyle = ({ isActive }) =>
        `flex ${isCollapsed ? 'justify-center' : 'justify-start'} gap-2 px-3 items-center h-14 cursor-pointer transition-colors duration-200 rounded-md ${
            isActive
                ? 'bg-primary text-primary-content'
                : 'text-base-content hover:bg-base-200 hover:text-primary'
        }`;

    return (
        <div
            className={`fixed left-0 top-0 h-screen ${
                isCollapsed ? 'w-[4%]' : 'w-[20%]'
            } border-r-2 border-base-300 bg-base-100 transition-all duration-300 z-50`}
        >
            <div className="h-[10%] w-full flex items-center justify-center border-b-2 border-base-300">
                <h1 className="text-2xl font-bold text-base-content">
                    {isCollapsed ? 'B' : 'Bonded'}
                </h1>
            </div>

            <div className="h-[80%] w-full flex flex-col py-2 px-2">
                <NavLink to="/dashboard" className={linkStyle}>
                    <LayoutDashboard className="w-5" />
                    {!isCollapsed && <span className="text-2xl">Dashboard</span>}
                </NavLink>
                <NavLink to="/groups" className={linkStyle}>
                    <Users className="w-5" />
                    {!isCollapsed && <span className="text-2xl">Groups</span>}
                </NavLink>
                <NavLink to="/applications" className={linkStyle}>
                    <Mail className="w-5" />
                    {!isCollapsed && <span className="text-2xl">Applications</span>}
                </NavLink>
            </div>

            <div className="h-[10%] w-full flex justify-between items-center px-2 border-t-2 border-base-300 relative">
                <div
                    className={`flex ${
                        isCollapsed ? 'justify-center' : 'justify-start w-full'
                    } rounded-md items-center border-2 border-base-300 px-3 py-1.5 cursor-pointer relative bg-base-100`}
                >
                    <ProfileOptionModal isCollapsed={isCollapsed} />
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-4.5 border-2 border-base-300 px-1 py-1 rounded-md cursor-pointer bg-base-100 z-50 hover:bg-base-200 transition-colors"
                >
                    <MoveLeft
                        className={`w-5 transition-transform duration-300 ${
                            isCollapsed ? 'rotate-180' : ''
                        }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default SideMenu;