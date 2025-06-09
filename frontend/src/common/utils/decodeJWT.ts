import { jwtDecode } from 'jwt-decode';

export function decodeJWT<User> (token?: string): User | null {
    const jwt = token ?? localStorage.getItem('accessToken');
    if (jwt) {
        const decoded = jwtDecode<User>(jwt);
        return decoded;
    }
    return null;
}