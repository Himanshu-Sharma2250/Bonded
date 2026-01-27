import React from 'react'

const GroupHistory = () => {
    const createHistories = () => {
        return <div className='flex items-center justify-between px-2 py-1 shadow-gray-800 shadow-xs rounded-xs'>
            {/* history's title and reason */}
            <div className='flex gap-2 items-center'>
                <span className='text-4xl text-fuchsia-700'>
                    •
                </span>

                <div className='flex flex-col'>
                    <span className='font-bold'>
                        History Title
                    </span>

                    <span className='text-sm text-gray-700'>
                        History Reason
                    </span>
                </div>
            </div>

            <div>
                <span className='text-sm text-gray-700'>
                    [date - time]
                </span>
            </div>
        </div>
    }

    return (
        <div className='flex flex-col px-5 py-4 gap-2 border-2 rounded-xs border-gray-600'>
            {/* histories */}
            {createHistories()}
 
        </div>
    )
}

export default GroupHistory
