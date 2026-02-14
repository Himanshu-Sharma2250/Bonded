import React from 'react'
import { useTeamMemberStore } from '../store/useTeamMemberStore';

const LeaveGroupModal = ({teamId}) => {
    const {teamLeft, isLefting} = useTeamMemberStore();

    const dialogRef = useRef(null);
    
    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
    };

    return (
        <div>
            <Button name={'Leave Group'} bgColor={'#FF7A59'} btnSize={'16px'} onClick={openModal} />

            {/* IMPORTANT: Use 'open:flex' so it only becomes flex when open.
               The backdrop: class styles the dimmed background behind the modal.
            */}
            <dialog 
                ref={dialogRef} 
                className='open:flex flex-col gap-8 w-90 px-4 py-5 rounded-sm bg-[#F8FAFC] border-t-4 border-t-[#2A6E8C] shadow-xl m-auto backdrop:bg-black/60'
            >
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-2xl font-bold'>
                        Are you sure?
                    </h1>
                </div>

                <form 
                    className='flex flex-col gap-3' 
                    onSubmit={async (e) => {
                        e.preventDefault();

                        teamLeft(teamId);
                        
                        closeModal();
                    }}
                >
                    <label className='flex flex-col text-sm font-medium'>
                        <input 
                            type="text" 
                            className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' 
                            placeholder="Enter Group's Name to leave" 
                        />
                    </label>

                    <div className='flex gap-2 justify-center items-center w-full mt-5'>
                        <Button 
                            name='Cancel' 
                            txtColor='#64748B' 
                            bgColor={'transparent'}
                            btnSize='16px' 
                            type="button" 
                            onClick={closeModal} 
                        />
                        <Button 
                            name='Leave' 
                            bgColor='#FF7A59' 
                            btnSize='16px' 
                            type="submit" 
                        />
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default LeaveGroupModal
