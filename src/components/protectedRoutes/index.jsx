
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotPermitted from './notPermitted';


const RoleBaseRoutes = (props) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const user = useSelector(state => state.account.user);
    const isRole = user.role;

    if (isAdminRoute && isRole !== "ADMIN") {
        return <NotPermitted />;
    } else {
        return <>{props.children}</>;
    }
};


const ProtectedRoutes = (props) => {
    const { children } = props;
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace />;
    }

    return <>
        <RoleBaseRoutes>
            {children}
        </RoleBaseRoutes>
    </>;
}


export default ProtectedRoutes;
