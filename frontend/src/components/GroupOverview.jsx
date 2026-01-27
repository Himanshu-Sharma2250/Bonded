import React from 'react'

const GroupOverview = () => {
    return (
        <div className='border-2 px-2 flex flex-col gap-5 rounded-xs py-3'>
            {/* div 1 - about group's creation (reason) */}
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>
                    About
                </h1>

                <p>
                    Group's description
                </p>
            </div>

            {/* div 2 - about the category (tags) */}
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>
                    Categories
                </h1>

                <div className='flex gap-2'>
                    <span className='px-1 rounded-xs bg-blue-300'>
                        tag1
                    </span>

                    <span className='px-1 rounded-xs bg-blue-300'>
                        tag2
                    </span>
                </div>
            </div>

            {/* div 3 - about group details (members) */}
            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold'>
                    Details
                </h1>

                <div className='flex flex-col gap-0 border-2 rounded-xs'>
                    {/* Group's Leader */}
                    <div className='flex justify-between px-2 '>
                        <span>
                            Group Leader
                        </span>

                        <span>
                            Name
                        </span>
                    </div>

                    {/* Total members */}
                    <div className='flex justify-between px-2 '>
                        <span>
                            Total Members
                        </span>

                        <span>
                            [Number]
                        </span>
                    </div>

                    {/* Last updated */}
                    <div className='flex justify-between px-2 '>
                        <span>
                            Last Updated
                        </span>

                        <span>
                            [date - time]
                        </span>
                    </div>

                    {/* Group Id */}
                    <div className='flex justify-between px-2 '>
                        <span>
                            Group Id
                        </span>

                        <span>
                            [id]
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupOverview
