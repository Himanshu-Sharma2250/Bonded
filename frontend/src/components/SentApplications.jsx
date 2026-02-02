import { Users } from 'lucide-react'
import React from 'react'
import Button from './Button'

const SentApplications = () => {
    const createApplicationCards = () => {
        return <div className='flex flex-col px-2 py-2 border-2 w-full gap-3 justify-between'>
            {/* div 1 - contains group name and if applications is pending or rejected or approved */}
            <div className='flex items-center justify-between'>
                {/* contains group name */}
                <div className='flex items-center gap-1'>
                    <Users className='w-4.5'/>

                    <span className='font-bold text-[1.1rem]'>
                        Group: 
                    </span>

                    <span>
                        Group Name
                    </span>
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
                <Button name="Withdraw" bgColor="#FF7A59" btnSize="15px" />
            </div>
        </div>
    }

    return (
        <div>
            {createApplicationCards()}
        </div>
    )
}

export default SentApplications
