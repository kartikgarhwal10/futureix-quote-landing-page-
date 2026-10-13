'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { getRolePermissions, PermissionCheck } from '@/lib/permissions';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  permissions: PermissionCheck;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check saved session
    const saved = localStorage.getItem('futureix_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('futureix_user');
      }
    }
  }, []);

  const login = async (email: string, forcedRole?: UserRole): Promise<boolean> => {
    let role: UserRole = forcedRole || 'sales';
    let name = 'Team Member';

    if (email.toLowerCase().includes('admin') || forcedRole === 'admin') {
      role = 'admin';
      name = 'Kartik Garhwal (Admin)';
    } else if (email.toLowerCase().includes('viewer') || forcedRole === 'viewer') {
      role = 'viewer';
      name = 'Internal Auditor (Viewer)';
    } else {
      role = 'sales';
      name = 'Mritunjay Pratap (Sales Lead)';
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
    };

    setUser(newUser);
    localStorage.setItem('futureix_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('futureix_user');
  };

  const currentRole: UserRole = user?.role || 'viewer';
  const permissions = getRolePermissions(currentRole);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        permissions,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
