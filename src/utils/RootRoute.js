import { Navigate, Outlet } from 'react-router-dom';

export const RootRoute = ({ isLoggedIn, isProtected = false }) => {
    let redirectPath = isProtected ? '/login' : '/dashboard';

    const isProtectedRouteNotLoggedIn = isProtected && !isLoggedIn;
    const isPublicRouteLoggedIn = !isProtected && isLoggedIn;

    if (isProtectedRouteNotLoggedIn || isPublicRouteLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}