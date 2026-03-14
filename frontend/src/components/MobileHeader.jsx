import { Menu } from 'lucide-react';

const MobileHeader = ({ onMenuClick }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-b border-base-300">
            <h1 className="text-2xl font-bold text-base-content">Bonded</h1>
            <button
                onClick={onMenuClick}
                className="p-2 rounded-md hover:bg-base-200 transition-colors"
            >
                <Menu className="w-6 h-6 text-base-content" />
            </button>
        </div>
    );
};

export default MobileHeader;