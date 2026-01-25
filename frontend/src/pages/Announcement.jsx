import React from 'react'
import SideMenu from '../components/SideMenu'
import Searchbar from '../components/Searchbar'
import { User } from 'lucide-react'

const Announcement = () => {
    const createAnnouncements = () => {
        return <div className='flex flex-col border-2 px-1.5 py-1 gap-1 rounded-xs'>
            <h1 className='text-2xl'>
                Announcement Name
            </h1>

            <p>
                announcement description
            </p>

            <div className='flex gap-2'>
                <span className='flex items-center gap-1'>
                    <User className='w-3.5'/>
                    Announcement creator
                </span>

                <span>
                    •
                </span>

                <span>
                    Announcement Date and Time
                </span>
            </div>
        </div>
    }

    return (
        <div className='flex bg-[#F8FAFC]'>
            <SideMenu />

            {/* contains the dashboard */}
            <div className='flex flex-col gap-1 w-[80%] h-full'>
                {/* header */}
                <div className='px-3 flex flex-col gap-1 py-1'>
                    <h1 className='text-3xl font-bold'>
                        Announcements
                    </h1>

                    <p>
                        Full view of all announcements and important notices.
                    </p>
                </div>

                <Searchbar />

                {/* announcement hero */}
                <main className='flex flex-col w-full h-full px-3 py-4 gap-3'>
                    
                </main>
            </div>
        </div>
    )
}

export default Announcement
