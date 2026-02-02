import React from 'react'
import Button from '../components/Button'
import { NavLink } from 'react-router-dom'
import { Eye } from 'lucide-react'

const SignUpPage = () => {
    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-127 w-xl px-5 py-5'>
                <div className='flex justify-center h-[20%]'>
                    <h1 className='text-[24px]'>
                        Create Your Account
                    </h1>
                </div>

                <form className='w-full flex flex-col gap-2 h-[80%]'>
                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Username
                        </span>

                        <input type="text" className='border-2 h-10 px-2' name="username" id="username" placeholder='username' />
                    </label>

                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Email
                        </span>

                        <input type="email" className='border-2 h-10 px-2' name="email" id="email" placeholder='you@email.com' />
                    </label>

                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Password
                        </span>

                        <div className='w-full flex items-center justify-between border-2 pr-2'>
                            <input type="password" className='border-0 h-10 px-2 w-[95%] outline-0' name="password" id="password" placeholder='password' />

                             <Eye className='w-5 cursor-pointer'/>
                        </div>
                    </label>

                    <div className='flex flex-col mt-6'>
                        <Button name="Sign Up" bgColor="#2A6E8C" btnSize="16px"/>

                        <p className='text-[16px]'>
                            Already have an account? 
                            <NavLink to={'/signin'} className='text-[#FF7A59]'> sign in</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage
