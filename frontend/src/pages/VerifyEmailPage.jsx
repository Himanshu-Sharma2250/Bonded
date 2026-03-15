import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useVerifyEmail } from '../hooks/useAuthQueries';

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const verifyEmailMutation = useVerifyEmail(); 
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                await verifyEmailMutation.mutateAsync(token);
                setStatus('success');
                setMessage('Email verified successfully!');
                setTimeout(() => navigate('/signin'), 3000);
            } catch (error) {
                setStatus('error');
                setMessage('Verification failed. The link may be invalid or expired.');
            }
        };
        if (token) verify();
    }, [token, verifyEmailMutation, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="max-w-md w-full bg-base-100 border border-base-300 rounded-lg shadow-lg p-8 text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-base-content">Verifying your email...</h2>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-base-content mb-2">Success!</h2>
                        <p className="text-base-content/80 mb-4">{message}</p>
                        <p className="text-sm text-base-content/60">Redirecting to login...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle className="w-12 h-12 text-error mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-base-content mb-2">Verification failed</h2>
                        <p className="text-base-content/80 mb-6">{message}</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="text-primary hover:underline"
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