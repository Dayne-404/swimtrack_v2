import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { defaultUser, UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User>(defaultUser);

    const setUser = useCallback((newUser: User) => {
        setUserState(newUser);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};