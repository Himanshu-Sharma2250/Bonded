import React from 'react'
import SideMenu from '../components/SideMenu'
import { Megaphone, Users } from 'lucide-react'

const Dashboard = () => {
    return (
        <div className='flex bg-[#F8FAFC]'>
            <SideMenu />

            {/* contains the dashboard */}
            <div className='flex-1 flex-col ml-[20%] gap-1 w-[80%] h-screen overflow-y-auto hide-scrollbar'>
                {/* header */}
                <div className='px-3 flex flex-col gap-1 py-1'>
                    <h1 className='text-3xl font-bold'>
                        Dashboard
                    </h1>

                    <p>
                        Overview of your progress
                    </p>
                </div>

                {/* dashboard hero */}
                <main className='flex w-full h-60 px-3 py-4 gap-3'>
                    {/* div 1 - shows group detail */}
                    <div className='flex flex-col border-2 w-[30%] px-2 py-3 justify-between rounded-xs'>
                        <div className='flex justify-between'>
                            <span className='text-xl'>
                                Groups
                            </span>

                            <Users className='w-5' />
                        </div>

                        <span className='text-4xl font-bold'>
                            number
                        </span>

                        <div className='flex flex-col'>
                            <span className='text-[15px]'>[number] Joined</span>
                            <span className='text-[15px]'>[number] Available</span>
                        </div>
                    </div>

                    {/* div 2 - shows application detail */}
                    <div className='flex flex-col border-2 w-[30%] px-2 py-3 justify-between rounded-xs'>
                        <div className='flex justify-between'>
                            <span className='text-xl'>
                                Applications
                            </span>

                            <Megaphone className='w-5' />
                        </div>

                        <span className='text-4xl font-bold'>
                            number
                        </span>

                        <div className='flex flex-col'>
                            <span className='text-[15px]'>[number] Joined</span>
                            <span className='text-[15px]'>[number] Applied</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
