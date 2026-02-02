import { User, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const MyGroupTab = () => {
    return (
        <div>
            <NavLink to={'/groups/group-id'} className='flex flex-col justify-between gap-2 border-2 px-2 py-1 min-h-56 w-72 rounded-xs cursor-pointer'>
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
        </div>
    )
}

export default MyGroupTab
