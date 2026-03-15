import { Navigate } from 'react-router-dom';
import { useProfile } from '../hooks/useAuthQueries';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { data: user, isLoading } = useProfile();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;