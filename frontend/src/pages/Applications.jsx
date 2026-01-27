import { Users } from 'lucide-react'
import Button from '../components/Button'

const Applications = () => {
    const createApplicationCards = () => {
        return <div className='flex flex-col px-2 py-2 border-2 w-full h-50 justify-between'>
            {/* div 1 - contains user name and email and if applications is pending or rejected or approved */}
            <div className='flex items-center justify-between'>
                {/* contains user profile and name and email */}
                <div className='flex items-center gap-3'>
                    {/* profile photo */}
                    <div>
                        <span className='border-2 rounded-xs p-2'>
                            U
                        </span>
                    </div>

                    {/* user name and email */}
                    <div className='flex flex-col'>
                        <h1 className='text-xl'>
                            Username
                        </h1>

                        <span className='text-[11px]'>
                            user@email.com
                        </span>
                    </div>
                </div>

                {/* contains if applications pending or rejected or approved */}
                <div>
                    <span className='bg-[#E9F1F5] px-1 py-0.5 rounded-2xl'>
                        pending
                    </span>
                </div>
            </div>

            {/* div 2 - contains groups name and reason to join and application date and time */}
            <div className='flex flex-col'>
                {/* contains group name */}
                <span className='flex gap-1 items-center'>
                    <Users className='w-4.5'/>

                    <span className='font-bold text-[1.1rem]'>
                        Group: 
                    </span>

                    <span>
                        Group Name
                    </span>
                </span>

                {/* contains reason */}
                <span className='flex gap-1 items-center'>
                    <span className='font-bold text-[1.1rem]'>
                        Reason: 
                    </span>

                    <span>
                        reason
                    </span>
                </span>

                {/* contains application date and time */}
                <span className=' font-extralight text-[12px] text-gray-800'>
                    Applied on: [date], [time]
                </span>
            </div>

            {/* div 3 - contains withdraw button */}
            <div>
                <Button name="Withdraw" bgColor="#FF7A59" btnSize="18px" />
            </div>
        </div>
    }

    return (
        <div className='flex-1 flex-col ml-[20%] gap-1 w-[80%] h-screen overflow-y-auto hide-scrollbar'>
            {/* header */}
            <div className='px-3 flex flex-col gap-1 py-1'>
                <h1 className='text-3xl font-bold'>
                    Applications
                </h1>

                <p>
                    View all your group submitted join applications
                </p>
            </div>

            {/* applications hero */}
            <main className='flex flex-col w-full px-3 py-4 mb-6 gap-3'>
                {createApplicationCards()}
                                 
            </main>
        </div>
    )
}

export default Applications
