import React from 'react'
import Button from '../components/Button'

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

                        <input type="password" className='border-2 h-10 px-2' name="password" id="password" placeholder='password' />
                    </label>

                    <div className='flex flex-col mt-6'>
                        <Button name="Sign Up" bgColor="#2A6E8C" btnSize="16px"/>

                        <p className='text-[16px]'>
                            Already have an account? 
                            <a href="#" className='text-[#FF7A59]'> sign in</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage
