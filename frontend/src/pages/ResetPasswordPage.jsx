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
            navigate('/signin');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Reset failed. Try again.');
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-base-200 p-4'>
            <div className='w-full max-w-md bg-base-100 border border-base-300 rounded-lg shadow-lg p-8'>
                <div className='flex justify-center mb-6'>
                    <h1 className='text-2xl font-bold text-base-content'>Set New Password</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                    {/* Password field */}
                    <label className='flex flex-col'>
                        <span className='text-sm text-base-content/80 mb-1'>New Password</span>
                        <div className={`flex items-center border ${errors.password ? 'border-error' : 'border-base-300'} rounded-lg pr-2 bg-base-100`}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className='h-10 px-2 flex-1 outline-none bg-transparent'
                                placeholder='••••••••'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-base-content/60'
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className='text-error text-xs mt-1'>{errors.password.message}</p>
                        )}
                    </label>

                    {/* Confirm password field */}
                    <label className='flex flex-col'>
                        <span className='text-sm text-base-content/80 mb-1'>Confirm Password</span>
                        <div className={`flex items-center border ${errors.confirmPassword ? 'border-error' : 'border-base-300'} rounded-lg pr-2 bg-base-100`}>
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className='h-10 px-2 flex-1 outline-none bg-transparent'
                                placeholder='••••••••'
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirm(!showConfirm)}
                                className='text-base-content/60'
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className='text-error text-xs mt-1'>{errors.confirmPassword.message}</p>
                        )}
                    </label>

                    <Button
                        name={loading ? <Loader className='w-4 animate-spin' /> : 'Reset Password'}
                        type='submit'
                        bgColor='primary'
                        btnSize='16px'
                        disabled={loading}
                        className='w-full justify-center mt-2'
                    />

                    <p className='text-sm text-center text-base-content/60 mt-4'>
                        Remember your password?{' '}
                        <NavLink to='/signin' className='text-accent hover:underline'>
                            Log in
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;