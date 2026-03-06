import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { verifyEmail } = useAuthStore(); 
    const [status, setStatus] = useState('loading'); 
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                await verifyEmail(token);
                setStatus('success');
                setMessage('Email verified successfully!');
                // Redirect to login after 3 seconds
                setTimeout(() => navigate('/signin'), 3000);
            } catch (error) {
                setStatus('error');
                setMessage('Verification failed. The link may be invalid or expired.');
            }
        };
        if (token) verify();
    }, [token, verifyEmail, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <div className="max-w-md w-full bg-white border-2 border-[#CBD5E1] rounded-md shadow-sm p-8 text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-12 h-12 animate-spin text-[#2A6E8C] mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-[#0F172A]">Verifying your email...</h2>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">Success!</h2>
                        <p className="text-[#334155] mb-4">{message}</p>
                        <p className="text-sm text-[#64748B]">Redirecting to login...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">Verification failed</h2>
                        <p className="text-[#334155] mb-6">{message}</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="text-[#2A6E8C] hover:underline"
                        >
                            Go to login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;