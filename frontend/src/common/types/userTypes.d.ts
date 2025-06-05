import type { Roles } from "./authorizationTypes";

declare global {
    export interface User {
        _id: string;
        firstName: string;
        lastName?: string;
        avatarColor: string;
        role: Roles;
    }
    
    export interface PrivateUserData extends User {
        email: string;
        password?: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
    }
}

export {}