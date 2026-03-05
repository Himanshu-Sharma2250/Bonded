import { useRef } from 'react'
import Button from './Button'
import { Loader2, Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z, { trim } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../store/useAuthStore'

const editProfileSchema = z.object({
    name: z.string().trim(),
    fullName: z.string().trim(),
    bio: z.string().trim(),
    website: z.string().trim(),
    linkedln: z.string().trim(),
    twitter: z.string().trim(),
    hashnode: z.string().trim(),
    medium: z.string().trim(),
    leetcode: z.string().trim(),
    github: z.string().trim()
})

const EditProfileModal = ({initialValue}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            fullName: initialValue.fullName || "",
            name: initialValue.name || "",
            bio: initialValue.bio || "",
            github: initialValue.github || "",
            hashnode: initialValue.hashnode || "",
            leetcode: initialValue.leetcode || "",
            linkedln: initialValue.linkedln || "",
            medium: initialValue.medium || "",
            twitter: initialValue.twitter || "",
            website:initialValue.website || ""
        }
    })

    const {editProfile, isEditing, user} = useAuthStore();

    const dialogRef = useRef(null);
        
    const openModal = () => {
        dialogRef.current?.showModal();
    };
        
    const closeModal = () => {
        dialogRef.current?.close();
    };

    const onEditProfile = async (data) => {
        editProfile(data)
        closeModal();
        console.log(data)
    }
    
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
                    onSubmit={handleSubmit(onEditProfile)}
                >
                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Full Name
                            
                            <input 
                                type='text'
                                name="fullname" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="Full Name"
                                {...register("fullName")}
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Username
                            
                            <input 
                                type='text'
                                name="username" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="Username"
                                {...register("name")}
                            />
                        </label>
                    </div>


                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Bio
                                
                            <textarea 
                                name="bio" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="Tell us about yourself"
                                {...register("bio")}
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Website
                            
                            <input 
                                type='text'
                                name="website" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.yoursite.com"
                                {...register("website")}
                            />
                        </label>
                    </div>
                    
                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Leetcode
                            
                            <input 
                                type='text'
                                name="leetcode" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.leetcode.com"
                                {...register("leetcode")}
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Github
                            
                            <input 
                                type='text'
                                name="github" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.github.com/username"
                                {...register("github")}
                            />
                        </label>
                    </div>

                    <div className='flex gap-5'>
                        <label className='flex flex-col text-sm font-medium'>
                            Linkedin
                            
                            <input 
                                type='text'
                                name="Linkedln" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.linkedln.com/username"
                                {...register("linkedln")}
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Twitter/X
                            
                            <input 
                                type='text'
                                name="Twitter/X" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.x.com/username"
                                {...register("twitter")}
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
                                {...register("hashnode")}
                            />
                        </label>
                        
                        <label className='flex flex-col text-sm font-medium'>
                            Medium
                            
                            <input 
                                type='text'
                                name="Medium" 
                                className='border-2 border-[#CBD5E1] w-70 focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                                placeholder="www.medium.com/username"
                                {...register("medium")}
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
                            name={isEditing ? (<Loader2 className='w-4 animate-spin' />) : ("Save Changes")}
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
