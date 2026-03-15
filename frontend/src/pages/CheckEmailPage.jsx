import { Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProfile } from '../hooks/useAuthQueries';
import { useForgotPassword } from '../hooks/useAuthQueries'; 
import toast from 'react-hot-toast';

const CheckEmailPage = () => {
    const location = useLocation();
    const { data: user } = useProfile(); 
    const forgotPasswordMutation = useForgotPassword();
    const [resending, setResending] = useState(false);

    const email = location.state?.email || user?.email || 'your email';

    const handleResend = async () => {
        setResending(true);
        try {
            await forgotPasswordMutation.mutateAsync({ email });
            toast.success('Verification email resent!');
        } catch (error) {
            toast.error('Failed to resend email. Please try again.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="max-w-md w-full bg-base-100 border border-base-300 rounded-lg shadow-lg p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-base-content mb-2">
                    Verify your email
                </h1>

                <p className="text-center text-base-content/80 mb-6">
                    We've sent a verification link to{' '}
                    <span className="font-semibold text-primary">{email}</span>.
                    Please check your inbox and click the link to activate your account.
                </p>

                <div className="bg-base-200 border border-base-300 rounded-lg p-3 mb-6 text-sm text-base-content/70">
                    <p className="flex items-start gap-2">
                        <span className="text-accent font-bold">!</span>
                        <span>
                            Didn't receive the email? Check your spam folder or click the button below to resend.
                        </span>
                    </p>
                </div>

                <div className="mb-4">
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className="w-full btn btn-primary"
                    >
                        {resending ? 'Sending...' : 'Resend verification email'}
                    </button>
                </div>

                <div className="text-center">
                    <NavLink
                        to="/signin"
                        className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default CheckEmailPage;