import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader, MoveLeft } from 'lucide-react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const signUpSchema = z.object({
    name: z.string().trim().min(1, 'Full name is required'),
    email: z.string().email('Enter valid email'),
    password: z.string().min(8, 'Password must contain min 8 characters').max(13),
});

const SignUpPage = () => {
    const [seePassword, setSeePassword] = useState(false);
    const { signUp, loading } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signUpSchema) });
    const navigate = useNavigate();

    const onSignUp = async (data) => {
        await signUp(data);
        navigate('/verify-email');
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-4 relative">
            <NavLink
                to="/"
                className="absolute top-6 left-6 flex items-center gap-1 text-base-content/60 hover:text-primary transition-colors text-sm"
            >
                <MoveLeft className="w-4 h-4" />
                <span>Back to Home</span>
            </NavLink>

            <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-lg shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-base-content">Create Your Account</h1>
                </div>

                <form onSubmit={handleSubmit(onSignUp)} className="w-full flex flex-col gap-4">
                    <label className="flex flex-col">
                        <span className="text-sm text-base-content/80 mb-1">Full Name</span>
                        <input
                            type="text"
                            {...register('name')}
                            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                            placeholder="full name"
                        />
                        {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm text-base-content/80 mb-1">Email</span>
                        <input
                            type="email"
                            {...register('email')}
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                            placeholder="you@email.com"
                        />
                        {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm text-base-content/80 mb-1">Password</span>
                        <div className={`flex items-center border ${errors.password ? 'border-error' : 'border-base-300'} rounded-lg pr-2 bg-base-100`}>
                            <input
                                type={seePassword ? 'text' : 'password'}
                                {...register('password')}
                                className="h-10 px-2 flex-1 outline-none bg-transparent"
                                placeholder="password"
                            />
                            <button
                                type="button"
                                onClick={() => setSeePassword(!seePassword)}
                                className="text-base-content/60"
                            >
                                {seePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
                    </label>

                    <div className="flex flex-col mt-4">
                        <Button
                            name={loading ? <Loader className="w-4 animate-spin" /> : 'Sign Up'}
                            bgColor="primary"
                            btnSize="16px"
                            type="submit"
                            className="w-full justify-center"
                        />

                        <p className="text-sm text-center text-base-content/60 mt-4">
                            Already have an account?{' '}
                            <NavLink to="/signin" className="text-accent hover:underline">
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;