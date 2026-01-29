import { Search } from 'lucide-react'
import React from 'react'

const Searchbar = () => {
    return (
        <div className=''>
            <label className='w-full h-12 px-2 rounded-xs flex items-center border-2'>
                <Search className='w-5' />
                <input type="search" name="search" id="search" className='h-full w-full px-2 focus:outline-0' placeholder='Search' />
            </label>
        </div>
    )
}

export default Searchbar
