import { create } from 'zustand';
import { User, loginUser, logoutUser, getCurrentUser } from '@/lib/localStorage';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  
  login: (email: string, password: string) => {
    const user = loginUser(email, password);
    if (user) {
      set({ user });
      return true;
    }
    return false;
  },
  
  logout: () => {
    logoutUser();
    set({ user: null });
  },
  
  checkAuth: () => {
    const user = getCurrentUser();
    set({ user });
  },
}));
