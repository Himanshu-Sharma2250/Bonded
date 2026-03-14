import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const Searchbar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(input);
        }, 300); // debounce 300ms

        return () => clearTimeout(timer);
    }, [input, onSearch]);

    return (
        <div className="w-full">
            <label className="flex items-center gap-2 w-full h-12 px-3 rounded-lg border border-base-300 bg-base-100 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Search className="w-5 h-5 text-base-content/70" />
                <input
                    type="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-full bg-transparent text-base-content placeholder-base-content/50 focus:outline-none"
                    placeholder="Search groups..."
                />
            </label>
        </div>
    );
};

export default Searchbar;