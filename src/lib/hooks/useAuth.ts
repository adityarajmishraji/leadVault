// src/lib/hooks/useAuth.ts
"use client";

import { useAuthenticationStatus, useUserData } from '@nhost/nextjs';

export function useAuth() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = useUserData();

  // Extract roles from user data
  const roles = user?.roles?.map((r: any) => {
    if (typeof r === 'string') return r;
    if (r.role) return r.role;
    return null;
  }).filter(Boolean) || [];

  const isAdmin = roles.includes('me') || roles.includes('admin');
  const isUser = roles.includes('user');

  return {
    user,
    loading: isLoading,
    isAuthenticated,
    isAdmin,
    isUser,
    roles,
  };
}