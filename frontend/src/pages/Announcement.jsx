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
        <div className='flex-1 flex-col gap-1'>
            {/* header */}
            <div className='flex flex-col gap-1 py-1'>
                <h1 className='text-3xl font-bold'>
                    Announcements
                </h1>

                <p>
                    Full view of all announcements and important notices.
                </p>
            </div>

            <Searchbar />

            {/* announcement hero */}
            <main className='flex flex-col w-full py-4 gap-3'>
                {createAnnouncements()}
                {createAnnouncements()}
            </main>
        </div>
    )
}

export default Announcement
