import { Eye } from 'lucide-react';
import Button from '../components/Button'
import { NavLink } from 'react-router-dom';

const SignInPage = () => {
    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-127 w-xl px-5 py-5'>
                <div className='flex justify-center h-[20%]'>
                    <h1 className='text-[24px]'>
                        Welcome Back
                    </h1>
                </div>

                <form className='w-full flex flex-col gap-2 h-[80%]'>
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
                        <Button name="Sign In" bgColor="#2A6E8C" btnSize="16px"/>

                        <p className='text-[16px]'>
                            Need an account
                            <NavLink to={'/signup'} className='text-[#FF7A59]'> sign up</NavLink>
                        </p>
                        
                        <p className='text-[16px]'>
                            Forgot your password?
                            <a href="#" className='text-[#FF7A59]'> reset password</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInPage
