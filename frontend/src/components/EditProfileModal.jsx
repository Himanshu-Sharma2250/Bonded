import { useRef } from 'react'
import Button from './Button'
import { Pencil } from 'lucide-react'

const EditProfileModal = () => {
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
                name={<span className='flex gap-2 items-center'>
                    <Pencil className='w-4' />
                    Edit
                </span>} 
                bgColor={'#2A6E8C'} 
                btnSize={'16px'}
                onClick={openModal}
            />

            <dialog 
                ref={dialogRef} 
                className='open:flex flex-col gap-8 px-4 py-5 rounded-sm bg-[#F8FAFC] border-t-4 border-t-[#2A6E8C] shadow-xl m-auto backdrop:bg-black/60'
            >
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-2xl font-bold'>
                        Edit Profile
                    </h1>
                </div>

                <form 
                    className='flex flex-col gap-3' 
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Add your form submission logic here
                        closeModal();
                    }}
                >
                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Full Name
                            
                            <input 
                                type='text'
                                name="fullname" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="Full Name"
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Username
                            
                            <input 
                                type='text'
                                name="username" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="Username"
                            />
                        </label>
                    </div>

                    <label className='flex flex-col text-sm font-medium'>
                        Bio
                            
                        <textarea 
                            name="bio" 
                            className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                            placeholder="Tell us about yourself"
                        />
                    </label>

                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Website
                            
                            <input 
                                type='text'
                                name="website" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.yoursite.com"
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Github
                            
                            <input 
                                type='text'
                                name="github" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.github.com/username"
                            />
                        </label>
                    </div>

                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Linkedln
                            
                            <input 
                                type='text'
                                name="Linkedln" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.linkedln.com/username"
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Twitter/X
                            
                            <input 
                                type='text'
                                name="Twitter/X" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.x.com/username"
                            />
                        </label>
                    </div>

                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Hashnode
                            
                            <input 
                                type='text'
                                name="Hashnode" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.hashnode.com/username"
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Medium
                            
                            <input 
                                type='text'
                                name="Medium" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.medium.com/username"
                            />
                        </label>
                    </div>

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
                            name='Save Changes' 
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

export default EditProfileModal
