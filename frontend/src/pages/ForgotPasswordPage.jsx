import { Loader } from 'lucide-react';
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import z from 'zod';

const forgotPasswordSchema = z.object({
    email: z.email('Enter a valid email'),
});

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { forgotPassword, loading } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        const success = await forgotPassword(data);
        if (success) {
            toast.success('Password reset link sent to your email', {position: 'top-center'});
        } else {
            toast.error('Failed to send reset email. Try again.', {position: 'top-center'});
        }
    };

    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-auto w-xl px-5 py-8 rounded-md shadow-sm'>
                <div className='flex justify-center mb-6'>
                    <h1 className='text-2xl font-bold text-[#0F172A]'>Forgot Password</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                    <label className='flex flex-col'>
                        <span className='text-sm text-[#334155] mb-1'>Email</span>
                        <input
                            type='email'
                            {...register('email')}
                            className={`border-2 h-10 px-2 rounded-sm ${
                                errors.email ? 'border-red-500' : 'border-[#CBD5E1]'
                            } focus:outline-[#2A6E8C]`}
                            placeholder='you@email.com'
                        />
                        {errors.email && (
                            <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
                        )}
                    </label>

                    <Button
                        name={loading ? <Loader className='w-4 animate-spin' /> : 'Send Reset Link'}
                        type='submit'
                        bgColor='#2A6E8C'
                        btnSize='16px'
                        disabled={loading}
                        className='w-full justify-center mt-2'
                    />

                    <p className='text-sm text-center text-[#64748B] mt-4'>
                        Remember your password?{' '}
                        <NavLink to='/login' className='text-[#FF7A59] hover:underline'>
                            Log in
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;