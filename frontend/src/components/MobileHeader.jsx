import { Menu } from 'lucide-react';

const MobileHeader = ({ onMenuClick }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-b">
            <h1 className="text-2xl font-bold">Bonded</h1>
            <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-gray-100">
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
};

export default MobileHeader;