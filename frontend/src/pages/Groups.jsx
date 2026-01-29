import { NavLink } from 'react-router-dom';
import Searchbar from '../components/Searchbar'
import { User, Users } from 'lucide-react'
import CreateGroupModal from '../components/CreateGroupModal'

const Groups = () => {
    const createGroupCards = () => {
        return <NavLink to={'/groups/group-id'} className='flex flex-col justify-between gap-2 border-2 px-2 py-1 min-h-56 w-72 rounded-xs cursor-pointer'>
            <div className='flex flex-col'>
                <h1 className='text-xl'>
                    Group Name
                </h1>

                <p>
                    Groups descriptions
                </p>
            </div>

            <div className='flex flex-col'>
                <div className='flex gap-1'>
                    <span className='px-0.5 rounded-xl bg-gray-100'>
                        tag1
                    </span>
                                
                    <span className='px-0.5 rounded-xl bg-gray-100'>
                        tag2
                    </span>
                </div>

                <span className='flex gap-1 items-center'>
                    <User className='w-3.5'/>
                    Team Leader
                </span>

                <span className='flex gap-1 items-center'>
                    <Users className='w-3.5' />
                    [number] members
                </span>

                <span>
                    active or not
                </span>
            </div>
        </NavLink>
    }

    return (
        <div className='flex-1 flex-col gap-1'>
            {/* header */}
            <div className='px-3 flex justify-between items-center py-1'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-3xl font-bold'>
                        Groups
                    </h1>

                    <p>
                        Full view of your groups and other groups.
                    </p>
                </div>

                <div>
                    {/* for the create group button to open a dialog */}
                    <CreateGroupModal />
                </div>
            </div>

            <Searchbar />

            {/* announcement hero */}
            <main className='flex flex-wrap w-full  px-3 py-4 gap-3'>
                {createGroupCards()}
            </main>
        </div>
    )
}

export default Groups
