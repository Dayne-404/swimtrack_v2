export const getToken = (): string | null => {
    const token = localStorage.getItem('token');
    if(!token) {
        throw new Error('Authentication token is missing. Please log in');
    }
    return token;
};