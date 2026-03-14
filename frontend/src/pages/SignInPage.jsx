import { Eye, EyeOff, Loader, MoveLeft } from 'lucide-react';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import z from 'zod';
import { useState } from 'react';

const signInSchema = z.object({
    email: z.string().email('Enter valid email'),
    password: z.string().min(8, 'Password must contain min 8 characters').max(13),
});

const SignInPage = () => {
    const [seePassword, setSeePassword] = useState(false);
    const { login, loading } = useAuthStore();
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(signInSchema),
    });

    const onLogin = async (data) => {
        const success = await login(data);
        if (success) toast.success('User logged in');
        else toast.error('Login failed');
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-4 relative">
            {/* Back button */}
            <NavLink
                to="/"
                className="absolute top-6 left-6 flex items-center gap-1 text-base-content/60 hover:text-primary transition-colors text-sm"
            >
                <MoveLeft className="w-4 h-4" />
                <span>Back to Home</span>
            </NavLink>

            <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-lg shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-base-content">Welcome Back</h1>
                </div>

                <form onSubmit={handleSubmit(onLogin)} className="w-full flex flex-col gap-4">
                    <label className="flex flex-col">
                        <span className="text-sm text-base-content/80 mb-1">Email</span>
                        <input
                            type="email"
                            {...register('email')}
                            className="input input-bordered w-full"
                            placeholder="you@email.com"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm text-base-content/80 mb-1">Password</span>
                        <div className="flex items-center border border-base-300 rounded-lg pr-2 bg-base-100">
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
                    </label>

                    <div className="flex flex-col mt-4">
                        <Button
                            name={loading ? <Loader className="w-4 animate-spin" /> : 'Sign In'}
                            type="submit"
                            bgColor="primary"
                            btnSize="16px"
                            className="w-full justify-center"
                        />

                        <p className="text-sm text-center text-base-content/60 mt-4">
                            Need an account?{' '}
                            <NavLink to="/signup" className="text-accent hover:underline">
                                Sign up
                            </NavLink>
                        </p>

                        <p className="text-sm text-center text-base-content/60">
                            Forgot your password?{' '}
                            <NavLink to="/forgot-password" className="text-accent hover:underline">
                                Reset password
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;