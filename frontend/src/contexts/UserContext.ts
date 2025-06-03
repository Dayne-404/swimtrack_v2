import { useContext } from 'react';

// UserProvider.ts
import { createContext } from 'react';
interface UserContextType {
    user: User;
    setUser: (newUser: User) => void;
}

// Default context value (optional)
export const defaultUser = { _id: '', firstName: '', lastName: '', avatarColor: '', role: '' };

export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    setUser: () => {},
});


export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
