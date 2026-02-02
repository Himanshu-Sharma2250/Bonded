import { CirclePlus, EllipsisVertical } from 'lucide-react'
import React from 'react'

const GroupNotes = () => {
    const createNoteCards = () => {
        return <div className='flex flex-col px-2 py-1 border-2 gap-2'>
            {/* shows title, date and options if Group Leader */}
            <div className='flex items-center justify-between'>
                <span className='flex gap-3 items-center'>
                    <span className='text-xl'>
                        Title
                    </span>

                    <span>
                        [date]
                    </span>
                </span>

                <button className='cursor-pointer'>
                    <EllipsisVertical className='w-5' />
                </button>
            </div>

            {/* shows description */}
            <div>
                <p>
                    description
                </p>
            </div>
        </div>
    }

    return (
        <div className='px-2 py-3 border-2 relative'>
            <div className='flex flex-col gap-2'>
                <span className='text-2xl text-[#FF7A59] m-auto'>
                    Only Members can access notes
                </span>
            </div>

            {/* this shows only if the user is leader of group */}
            <button className='fixed bottom-10 right-10 cursor-pointer'>
                <CirclePlus className='w-10 h-10' />
            </button>
        </div>
    )
}

export default GroupNotes
