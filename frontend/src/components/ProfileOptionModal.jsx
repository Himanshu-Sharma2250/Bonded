import { NavLink } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { User, Moon, Sun, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const ProfileOptionModal = ({ isCollapsed }) => {
    const dialogRef = useRef(null);
    const { user, logout } = useAuthStore();

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
    };

    // Close on outside click
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
                <User className="w-5" />
                {!isCollapsed && <span className="text-[17px]">{user?.name}</span>}
            </button>

            <dialog
                ref={dialogRef}
                className="open:flex flex-col gap-2 min-w-48 p-2 rounded-sm absolute top-full left-5 mb-2 bg-[#F8FAFC] shadow-xl z-50 max-w-[90vw] max-h-[80vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center pb-2 mb-1">
                    <span className="text-sm">
                        Signed in as <span className="font-bold">{user?.email}</span>
                    </span>
                    <button
                        onClick={closeModal}
                        className="text-xl leading-5 px-1 hover:bg-gray-200 rounded"
                    >
                        <X className='w-4' />
                    </button>
                </div>

                <NavLink
                    to="/profile"
                    onClick={closeModal}
                    className="hover:bg-gray-200 px-2 py-1 rounded"
                >
                    My Profile
                </NavLink>

                <button
                    onClick={closeModal}
                    className="hover:bg-gray-200 px-2 py-1 rounded flex justify-between items-center w-full text-left"
                >
                    Toggle theme
                    <Moon className="w-4" />
                </button>

                <button
                    onClick={onLogout}
                    className="hover:bg-red-200 px-2 py-1 rounded text-left"
                >
                    Log Out
                </button>
            </dialog>
        </div>
    );
};

export default ProfileOptionModal;