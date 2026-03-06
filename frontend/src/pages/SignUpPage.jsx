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
                    <h1 className="text-2xl font-bold text-[#0F172A]">Create Your Account</h1>
                </div>

                <form onSubmit={handleSubmit(onSignUp)} className="w-full flex flex-col gap-4">
                    <label className="flex flex-col">
                        <span className="text-sm text-[#334155] mb-1">Full Name</span>
                        <input
                            type="text"
                            {...register('name')}
                            className={`border-2 h-10 px-2 rounded-sm ${
                                errors.name ? 'border-red-500' : 'border-[#CBD5E1]'
                            } focus:outline-[#2A6E8C]`}
                            placeholder="full name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm text-[#334155] mb-1">Email</span>
                        <input
                            type="email"
                            {...register('email')}
                            className={`border-2 h-10 px-2 rounded-sm ${
                                errors.email ? 'border-red-500' : 'border-[#CBD5E1]'
                            } focus:outline-[#2A6E8C]`}
                            placeholder="you@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </label>

                    <label className="flex flex-col">
                        <span className="text-sm text-[#334155] mb-1">Password</span>
                        <div
                            className={`flex items-center border-2 rounded-sm pr-2 ${
                                errors.password ? 'border-red-500' : 'border-[#CBD5E1]'
                            }`}
                        >
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
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </label>

                    <div className="flex flex-col mt-4">
                        <Button
                            name={loading ? <Loader className="w-4 animate-spin" /> : 'Sign Up'}
                            bgColor="#2A6E8C"
                            btnSize="16px"
                            type="submit"
                            className="w-full justify-center"
                        />

                        <p className="text-sm text-center text-[#64748B] mt-4">
                            Already have an account?{' '}
                            <NavLink to="/signin" className="text-[#FF7A59] hover:underline">
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