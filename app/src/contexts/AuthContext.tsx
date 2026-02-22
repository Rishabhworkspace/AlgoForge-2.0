import { createContext, useContext, useEffect, useState } from 'react';

// User type matching backend response
interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  xp_points?: number;
  streak_days?: number;
  solvedProblems?: any[];
  activityLog?: any[];
}

interface AuthContextType {
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signInWithGoogle: (credential?: string) => Promise<{ error: any; isNewUser?: boolean }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const userData = await res.json();
        const userObj = {
          id: userData._id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          xp_points: userData.xp_points,
          streak_days: userData.streak_days,
          solvedProblems: userData.solvedProblems,
          activityLog: userData.activityLog
        };

        setUser(userObj);
        setProfile({ ...userData, id: userData._id });
      }
    } catch (error) {
      console.error('Profile refresh failed', error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await refreshProfile();
      } catch (error) {
        console.error('Session check failed', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.message || 'Login failed' };
      }

      localStorage.setItem('token', data.token);

      const userObj = {
        id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
        xp_points: data.xp_points,
        streak_days: data.streak_days,
        solvedProblems: data.solvedProblems,
        activityLog: data.activityLog
      };

      setUser(userObj);
      setProfile({ ...data, id: data._id });

      return { error: null };
    } catch (err) {
      return { error: 'Network error. Ensure backend is running.' };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.message || 'Signup failed' };
      }

      localStorage.setItem('token', data.token);

      const userObj = {
        id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
        xp_points: data.xp_points,
        streak_days: data.streak_days,
        solvedProblems: data.solvedProblems,
        activityLog: data.activityLog
      };

      setUser(userObj);
      setProfile({ ...data, id: data._id });

      return { error: null };
    } catch (err) {
      return { error: 'Network error. Ensure backend is running.' };
    }
  };

  const signInWithGoogle = async (credential?: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/google`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credential })
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.message || 'Google Auth failed' };
      }

      // Success
      localStorage.setItem('token', data.token);

      const userObj = {
        id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
        xp_points: data.xp_points,
        streak_days: data.streak_days,
        solvedProblems: data.solvedProblems,
        activityLog: data.activityLog
      };

      setUser(userObj);
      setProfile({ ...data, id: data._id });

      return { error: null, isNewUser: data.isNewUser };
    } catch (err) {
      return { error: 'Network error during Google Auth' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Record<string, unknown>) => {
    if (!profile) return { error: new Error('Not authenticated') };
    // This assumes specific update logic will be added to backend later
    setProfile({ ...profile, ...updates });
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
