
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
    const { children } = props;
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoutes;
