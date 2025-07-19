import { useLoadUserQuery } from "@/redux/ApiController/authApi";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { data: user, isLoading, isError } = useLoadUserQuery();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />; 
}
