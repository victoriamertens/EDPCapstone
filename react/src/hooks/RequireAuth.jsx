import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthorizationContext'; 

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    console.log("USER in req auth:", auth?.user);

    if (!auth?.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;