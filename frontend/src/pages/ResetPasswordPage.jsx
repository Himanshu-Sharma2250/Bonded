import { Loader } from 'lucide-react';
import Button from '../components/Button';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import z from 'zod';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters').max(13),
    confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword, loading } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            await resetPassword(token, { password: data.password });
            toast.success('Password reset successfully!');
            navigate('/login');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Reset failed. Try again.');
        }
    };

    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-auto w-xl px-5 py-8 rounded-md shadow-sm'>
                <div className='flex justify-center mb-6'>
                    <h1 className='text-2xl font-bold text-[#0F172A]'>Set New Password</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                    {/* Password field */}
                    <label className='flex flex-col'>
                        <span className='text-sm text-[#334155] mb-1'>New Password</span>
                        <div className={`flex items-center border-2 ${
                                errors.password ? 'border-red-500' : 'border-[#CBD5E1]'
                            } rounded-sm pr-2`}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className='h-10 px-2 flex-1 outline-none'
                                placeholder='••••••••'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-[#64748B]'
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
                        )}
                    </label>

                    {/* Confirm password field */}
                    <label className='flex flex-col'>
                        <span className='text-sm text-[#334155] mb-1'>Confirm Password</span>
                        <div className={`flex items-center border-2 ${
                                errors.confirmPassword ? 'border-red-500' : 'border-[#CBD5E1]'
                            } rounded-sm pr-2`}>
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className='h-10 px-2 flex-1 outline-none'
                                placeholder='••••••••'
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirm(!showConfirm)}
                                className='text-[#64748B]'
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</p>
                        )}
                    </label>

                    <Button
                        name={loading ? <Loader className='w-4 animate-spin' /> : 'Reset Password'}
                        type='submit'
                        bgColor='#2A6E8C'
                        btnSize='16px'
                        disabled={loading}
                        className='w-full justify-center mt-2'
                    />

                    <p className='text-sm text-center text-[#64748B] mt-4'>
                        Remember your password?{' '}
                        <NavLink to='/signin' className='text-[#FF7A59] hover:underline'>
                            Log in
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;