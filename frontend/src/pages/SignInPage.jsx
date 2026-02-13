import { Eye, EyeOff, Loader } from 'lucide-react';
import Button from '../components/Button'
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import z from 'zod';
import { useState } from 'react';

const signInSchema = z.object({
    email: z.email("Enter valid email"),
    password: z.string().min(8, "Password must contain min 8 characters").max(13)
})

const SignInPage = () => {
    const [seePassword, setSeePassword] = useState(false);
    const {login, loading, user} = useAuthStore();
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(signInSchema)
    });

    const onLogin = async (data) => {
        const success = await login(data);
        
        if (success)
            toast.success("User logged in")
        else {
            toast.error("Login failed")
        }
    }

    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-127 w-xl px-5 py-5'>
                <div className='flex justify-center h-[20%]'>
                    <h1 className='text-[24px]'>
                        Welcome Back
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onLogin)} className='w-full flex flex-col gap-2 h-[80%]'>
                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Email
                        </span>

                        <input type="email" {...register('email')} className='border-2 h-10 px-2' name="email" id="email" placeholder='you@email.com' />
                    </label>

                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Password
                        </span>

                        <div className='w-full flex items-center justify-between border-2 pr-2'>
                            <input type={seePassword ? "text" : "password"} {...register('password')} className='border-0 h-10 px-2 w-[95%] outline-0' name="password" id="password" placeholder='password' />

                            {seePassword ? 
                                (<EyeOff className='w-5 cursor-pointer' onClick={() => setSeePassword(!seePassword)} />) 
                                : 
                                (<Eye className='w-5 cursor-pointer' onClick={() => setSeePassword(!seePassword)} />)
                            }
                        </div>
                    </label>

                    <div className='flex flex-col mt-6'>
                        <Button name={loading ? (<Loader className="w-4 animate-spin" />) : ('Sign Up')} type="submit" bgColor="#2A6E8C" btnSize="16px"/>

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
