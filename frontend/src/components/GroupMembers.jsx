import React from 'react'
import Button from './Button'

const GroupMembers = () => {
    const createLeaderCard = () => {
        return <div className='flex items-center justify-between mx-2 px-2 py-1 border-2 rounded-xs'>
            {/* leader's profile, name and email */}
            <div className='flex gap-2 items-center'>
                {/* leader's profile */}
                <div>
                    <span className='p-3 rounded-xs bg-amber-500'>
                        L
                    </span>
                </div>
                        
                {/* leader's name and email */}
                <div className='flex flex-col'>
                    <span className='text-xl'>
                        Leader Name
                    </span>

                    <span>
                        leader@email.com
                    </span>
                </div>
            </div>

            {/* Leader tag */}
            <span className='px-1 text-[#FF7A59]'>
                Leader
            </span>
        </div>
    }

    const createMemberCards = () => {
        return <div className='flex items-center justify-between px-2 mx-2 border-2 py-1 rounded-xs'>
            {/* Member's profile, name and email */}
            <div className='flex gap-2 items-center'>
                {/* member's profile */}
                <div>
                    <span className='p-3 rounded-xs bg-amber-500'>
                        M
                    </span>
                </div>
                        
                {/* leader's name and email */}
                <div className='flex flex-col'>
                    <span className='text-xl'>
                        Member Name
                    </span>

                    <span>
                        member@email.com
                    </span>
                </div>
            </div>

            {/* view profile btn */}
            <div>
                <Button name={'View Profile'} btnSize={'16px'} bgColor={'#2A6E8C'} />
            </div>
        </div>
    }

    return (
        <div className='px-2 flex flex-col gap-2 border-2 py-2 pb-3 rounded-xs'>
            {/* div 1 - show Group Leader */}
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>
                    Group Leader
                </h1>

                {createLeaderCard()}
            </div>

            {/* div 2 - shows Group Members */}
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>
                    Members [Number]
                </h1>

                {createMemberCards()}
                {createMemberCards()}
                {createMemberCards()}
            </div>
        </div>
    )
}

export default GroupMembers
