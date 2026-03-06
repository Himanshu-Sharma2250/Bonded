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
        <div className="bg-[#F8FAFC] flex justify-center items-center h-screen relative">
            {/* Back button outside card */}
            <NavLink
                to="/"
                className="absolute top-6 left-6 flex items-center gap-1 text-[#64748B] hover:text-[#2A6E8C] transition-colors text-sm"
            >
                <MoveLeft className="w-4 h-4" />
                <span>Back to Home</span>
            </NavLink>

            <div className="bg-white flex flex-col w-xl px-5 py-5 rounded-md shadow-sm">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-[#0F172A]">Welcome Back</h1>
                </div>

                <form onSubmit={handleSubmit(onLogin)} className="w-full flex flex-col gap-4">
                    <label className="flex flex-col">
                        <span className="text-sm text-[#334155] mb-1">Email</span>
                        <input
                            type="email"
                            {...register('email')}
                            className="border-2 border-[#CBD5E1] h-10 px-2 rounded-sm focus:outline-[#2A6E8C]"
                            placeholder="you@email.com"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm text-[#334155] mb-1">Password</span>
                        <div className="flex items-center border-2 border-[#CBD5E1] rounded-sm pr-2">
                            <input
                                type={seePassword ? 'text' : 'password'}
                                {...register('password')}
                                className="h-10 px-2 flex-1 outline-none"
                                placeholder="password"
                            />
                            {seePassword ? (
                                <EyeOff
                                    className="w-5 cursor-pointer text-[#64748B]"
                                    onClick={() => setSeePassword(!seePassword)}
                                />
                            ) : (
                                <Eye
                                    className="w-5 cursor-pointer text-[#64748B]"
                                    onClick={() => setSeePassword(!seePassword)}
                                />
                            )}
                        </div>
                    </label>

                    <div className="flex flex-col mt-4">
                        <Button
                            name={loading ? <Loader className="w-4 animate-spin" /> : 'Sign In'}
                            type="submit"
                            bgColor="#2A6E8C"
                            btnSize="16px"
                            className="w-full justify-center"
                        />

                        <p className="text-sm text-center text-[#64748B] mt-4">
                            Need an account?{' '}
                            <NavLink to="/signup" className="text-[#FF7A59] hover:underline">
                                Sign up
                            </NavLink>
                        </p>

                        <p className="text-sm text-center text-[#64748B]">
                            Forgot your password?{' '}
                            <NavLink to="/forgot-password" className="text-[#FF7A59] hover:underline">
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