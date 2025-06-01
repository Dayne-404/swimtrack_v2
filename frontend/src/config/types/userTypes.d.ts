import type { Roles } from "./authorizationTypes";

declare global {
    export interface User {
        _id: string;
        firstName: string;
        lastName?: string;
        avatarColor: string;
    }
    
    export interface PrivateUserData extends User {
        email: string;
        password?: string;
        role: Roles;
        active: boolean;
        createdAt: string;
        updatedAt: string;
    }
}

export {}