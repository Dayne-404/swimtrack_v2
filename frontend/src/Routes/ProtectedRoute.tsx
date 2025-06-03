import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { accessToken } = useAuth();
    const { user } = useUser();

    if (!accessToken || !user) {
        console.error("Access token or user data is missing.");
        return <Navigate to="/login" replace />;
    }

    return children;
};