import { Search } from 'lucide-react'
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
        <div className=''>
            <label className='w-full h-12 px-2 rounded-xs flex items-center border-2'>
                <Search className='w-5' />
                <input 
                    type="search" 
                    name="search" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    id="search" 
                    className='h-full w-full px-2 focus:outline-0' 
                    placeholder='Search' 
                />
            </label>
        </div>
    )
}

export default Searchbar
