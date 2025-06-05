import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import type { ReactNode } from "react";

export const ProtectedPage = ({ children }: { children: ReactNode }) => {
    const { accessToken, loading } = useAuth();
    const { user } = useUser();
    
    if (loading) {
        console.log("Loading user data...");
        return null;
    }

    if (!accessToken || !user) {
        console.error("Access token or user data is missing.");
        console.log("Redirecting to login page...");
        return <Navigate to="/login" replace />;
    }

    return children;
};