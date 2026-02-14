import { useRef } from 'react'
import Button from './Button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTeamMemberStore } from '../store/useTeamMemberStore';
import { Loader2 } from 'lucide-react';

const applySchema = z.object({
    name: z.string().trim(),
    email: z.email("Enter valid email"),
    reasonToJoin: z.string().trim()
})

const ApplyToGroupModal = ({teamId}) => {
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(applySchema)
    });

    const {teamJoin, isJoining} = useTeamMemberStore();

    const dialogRef = useRef(null);
    
    const openModal = () => {
        dialogRef.current?.showModal();
    };
    
    const closeModal = () => {
        dialogRef.current?.close();
    };

    const onApplyToJoin = async function(data) {
        teamJoin(teamId, data);
        closeModal();
    }

    return (
        <div>
            <Button 
                name='Apply' 
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
                    <h1 className='text-2xl font-bold'>
                        Want to join?
                    </h1>
                </div>

                <form 
                    className='flex flex-col gap-4' 
                    onSubmit={handleSubmit(onApplyToJoin)}
                >
                    <label className='flex flex-col text-sm font-medium'>
                        Name
                        
                        <input 
                            type='text'
                            name="name" 
                            className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' 
                            placeholder="Enter your name"
                            {...register("name")}
                        />
                    </label>
                    
                    <label className='flex flex-col text-sm font-medium'>
                        Email
                        
                        <input
                            type="text"
                            name="email" 
                            className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10' 
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                    </label>

                    <label className='flex flex-col text-sm font-medium'>
                        Why should we add you to our team?
                        
                        <textarea 
                            name="reason" 
                            className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-15' 
                            placeholder="Give us reason"
                            {...register("reasonToJoin")}
                        ></textarea>
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
                            name={isJoining ? (<Loader2 className='w-4 animate-spin' />) : ("Apply")}
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

export default ApplyToGroupModal
