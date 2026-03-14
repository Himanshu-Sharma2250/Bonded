import { NavLink } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { User, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const ProfileOptionModal = ({ isCollapsed }) => {
    const dialogRef = useRef(null);
    const { user, logout } = useAuthStore();
    const { theme, toggleTheme } = useTheme();

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
    };

    // Close on outside click (backdrop)
    useEffect(() => {
        const dialog = dialogRef.current;
        const handleClickOutside = (e) => {
            if (e.target === dialog) {
                closeModal();
            }
        };
        dialog?.addEventListener('click', handleClickOutside);
        return () => dialog?.removeEventListener('click', handleClickOutside);
    }, []);

    const onLogout = async () => {
        try {
            await logout();
            toast.success('Logout successful');
            closeModal();
        } catch (error) {
            toast.error('Error in logout');
        }
    };

    return (
        <div className="relative">
            <button
                className={`w-full flex gap-2 items-center transition-all duration-200 active:scale-95 hover:opacity-90 cursor-pointer py-1 ${
                    isCollapsed ? 'justify-center' : ''
                }`}
                onClick={openModal}
            >
                <User className="w-5 text-base-content" />
                {!isCollapsed && <span className="text-[17px] text-base-content">{user?.name}</span>}
            </button>

            {createPortal(
                <dialog ref={dialogRef} className="modal">
                    <div className="modal-box w-64 bg-base-100 p-2">
                        <div className="flex justify-between items-center border-b border-base-300 pb-2 mb-1">
                            <span className="text-sm text-base-content">
                                Signed in as <span className="font-bold">{user?.email}</span>
                            </span>
                            <button
                                onClick={closeModal}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>

                        <NavLink
                            to="/profile"
                            onClick={closeModal}
                            className="block px-2 py-1 rounded-md text-base-content hover:bg-base-200 transition-colors"
                        >
                            My Profile
                        </NavLink>

                        <button
                            onClick={() => {
                                toggleTheme();
                                closeModal();
                            }}
                            className="w-full flex justify-between items-center px-2 py-1 rounded-md text-base-content hover:bg-base-200 transition-colors"
                        >
                            Toggle theme
                            {theme === 'bonded' ? <Moon className="w-4" /> : <Sun className="w-4" />}
                        </button>

                        <button
                            onClick={onLogout}
                            className="w-full text-left px-2 py-1 rounded-md text-error hover:bg-error/20 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={closeModal}>close</button>
                    </form>
                </dialog>,
                document.body
            )}
        </div>
    );
};

export default ProfileOptionModal;