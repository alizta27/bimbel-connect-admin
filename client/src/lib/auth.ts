// Simple auth state management
// todo: integrate with Supabase Auth or backend API

export interface User {
  id: string;
  name: string;
  email: string;
  role: "freelancer" | "employer";
  tokenBalance?: number;
  avatar?: string;
}

const AUTH_STORAGE_KEY = "kerjaaja_auth";

export const authService = {
  getCurrentUser(): User | null {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  login(email: string, password: string, role?: "freelancer" | "employer"): Promise<User> {
    //todo: integrate with backend API or Supabase Auth
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: "user-" + Date.now(),
          name: email.split("@")[0],
          email,
          role: role || "freelancer",
          tokenBalance: 25,
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      }, 500);
    });
  },

  signup(data: {
    name: string;
    email: string;
    password: string;
    role: "freelancer" | "employer";
  }): Promise<User> {
    //todo: integrate with backend API or Supabase Auth
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: "user-" + Date.now(),
          name: data.name,
          email: data.email,
          role: data.role,
          tokenBalance: data.role === "freelancer" ? 10 : 0, // Welcome bonus
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      }, 500);
    });
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  updateUser(updates: Partial<User>): void {
    const current = this.getCurrentUser();
    if (current) {
      const updated = { ...current, ...updates };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    }
  },
};
