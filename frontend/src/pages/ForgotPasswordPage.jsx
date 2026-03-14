import { Loader } from 'lucide-react';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import z from 'zod';

const forgotPasswordSchema = z.object({
    email: z.string().email('Enter a valid email'),
});

const ForgotPasswordPage = () => {
    const { forgotPassword, loading } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        const success = await forgotPassword(data);
        if (success) {
            toast.success('Password reset link sent to your email', { position: 'top-center' });
        } else {
            toast.error('Failed to send reset email. Try again.', { position: 'top-center' });
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-base-200 p-4'>
            <div className='w-full max-w-md bg-base-100 border border-base-300 rounded-lg shadow-lg p-8'>
                <div className='flex justify-center mb-6'>
                    <h1 className='text-2xl font-bold text-base-content'>Forgot Password</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                    <label className='flex flex-col'>
                        <span className='text-sm text-base-content/80 mb-1'>Email</span>
                        <input
                            type='email'
                            {...register('email')}
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                            placeholder='you@email.com'
                        />
                        {errors.email && (
                            <p className='text-error text-xs mt-1'>{errors.email.message}</p>
                        )}
                    </label>

                    <Button
                        name={loading ? <Loader className='w-4 animate-spin' /> : 'Send Reset Link'}
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

export default ForgotPasswordPage;