import { apiRequest } from "./apiRequest";

export const login = async (userCredentials: { email: string; password: string} ): Promise<unknown> => {
    return apiRequest({
        method: 'POST',
        endpoint: '/auth/login',
        body: JSON.stringify(userCredentials),
        isTokenRequired: false,
    })
}