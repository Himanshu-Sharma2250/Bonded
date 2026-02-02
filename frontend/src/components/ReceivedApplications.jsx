import { Users } from 'lucide-react'
import React from 'react'
import Button from './Button'

const ReceivedApplications = () => {
    const createApplicationCards = () => {
        return <div className='flex flex-col px-2 py-2 border-2 w-full gap-3 justify-between'>
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
                    <Button name={'View Profile'} bgColor={'#2A6E8C'} btnSize={'16px'} />
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
            <div className='flex gap-3'>
                <Button name="Accept" bgColor="#FF7A59" btnSize="15px" />
                <Button name="Reject" bgColor="#FF7A59" btnSize="15px" />
            </div>
        </div>
    }

    return (
        <div>
            {createApplicationCards()}
        </div>
    )
}

export default ReceivedApplications
