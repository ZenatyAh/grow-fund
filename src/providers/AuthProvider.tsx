'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginUserDto, useUserById } from '@/lib/api/hooks/useAuth';

type AuthContextValue = {
  user: LoginUserDto | null;
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  role: LoginUserDto['role'] | null;
  setAuthData: (params: { token: string; userId: string; user?: LoginUserDto }) => void;
  clearAuthData: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [bootstrapUser, setBootstrapUser] = useState<LoginUserDto | null>(null);

  // Bootstrap from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');

    setToken(storedToken);
    setUserId(storedUserId);

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as LoginUserDto;
        setBootstrapUser(parsed);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const { data: fetchedUser, isError } = useUserById(userId);

  // If token is invalid/expired, log out
  useEffect(() => {
    if (isError) {
      clearAuthData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const setAuthData = ({
    token: nextToken,
    userId: nextUserId,
    user,
  }: {
    token: string;
    userId: string;
    user?: LoginUserDto;
  }) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', nextToken);
    localStorage.setItem('userId', nextUserId);
    setToken(nextToken);
    setUserId(nextUserId);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setBootstrapUser(user);
    }
  };

  const clearAuthData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
    }
    setToken(null);
    setUserId(null);
    setBootstrapUser(null);
    router.push('/auth/login');
  };

  const resolvedUser = fetchedUser ?? bootstrapUser;

  const value: AuthContextValue = useMemo(
    () => ({
      user: resolvedUser ?? null,
      token,
      userId,
      isAuthenticated: !!token && !!resolvedUser,
      role: resolvedUser?.role ?? null,
      setAuthData,
      clearAuthData,
    }),
    [resolvedUser, token, userId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

