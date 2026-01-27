import React, { useRef } from 'react'
import Button from './Button'

const CreateGroupModal = () => {
    // Create a reference to the dialog element
    const dialogRef = useRef(null);

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
    };

    return (
        <div>
            <Button 
                name='Create Group' 
                bgColor='#2A6E8C' 
                btnSize='16px' 
                onClick={openModal}
            />

            {/* IMPORTANT: Use 'open:flex' so it only becomes flex when open.
               The backdrop: class styles the dimmed background behind the modal.
            */}
            <dialog 
                ref={dialogRef} 
                className='open:flex flex-col gap-8 w-90 px-4 py-5 rounded-sm bg-[#F8FAFC] border-t-4 border-t-[#2A6E8C] shadow-xl m-auto backdrop:bg-black/60'
            >
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-2xl font-bold'>Create Group</h1>
                </div>

                <form 
                    className='flex flex-col gap-3' 
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Add your form submission logic here
                        closeModal();
                    }}
                >
                    <label className='flex flex-col text-sm font-medium'>
                        Name
                        <input type="text" className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' placeholder="Group's Name" />
                    </label>
                    
                    <label className='flex flex-col text-sm font-medium'>
                        Description
                        <input type="text" className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' placeholder="Group's Description" />
                    </label>

                    <label className='flex flex-col text-sm font-medium'>
                        Total Members
                        <input type="number" className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' placeholder="0" />
                    </label>

                    <label className='flex flex-col text-sm font-medium'>
                        Tech Stack Using
                        <input type="text" className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' placeholder="Group's Tech Stack" />
                    </label>

                    <div className='flex gap-2 justify-center items-center w-full mt-3'>
                        <Button 
                            name='Cancel' 
                            txtColor='#64748B' 
                            bgColor={'transparent'}
                            btnSize='16px' 
                            type="button" 
                            onClick={closeModal} 
                        />
                        <Button 
                            name='Create' 
                            bgColor='#2A6E8C' 
                            btnSize='16px' 
                            type="submit" 
                        />
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default CreateGroupModal