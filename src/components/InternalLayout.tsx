'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  LayoutDashboard,
  Calculator,
  Database,
  FileSpreadsheet,
  Users,
  Settings,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  User,
} from 'lucide-react';

export const InternalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout } = useAuth();
  const { t } = useLanguage();

  const links = [
    { href: '/internal/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/internal/pricing-calculator', label: 'Pricing Calculator', icon: <Calculator className="w-4 h-4" /> },
    { href: '/internal/price-catalogue', label: 'Master Catalogue', icon: <Database className="w-4 h-4" /> },
    { href: '/internal/quotes', label: 'Saved Quotations', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { href: '/internal/customers', label: 'Enquiries & Customers', icon: <Users className="w-4 h-4" /> },
    { href: '/internal/settings', label: 'Workspace Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    router.push('/internal/login');
  };

  const getRoleBadge = () => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <ShieldCheck className="w-3 h-3 mr-1 text-amber-400" />
          Admin (Full)
        </span>
      );
    }
    if (role === 'sales') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-electric-500/20 text-brand-electric-300 border border-brand-electric-500/30">
          <User className="w-3 h-3 mr-1 text-brand-electric-400" />
          Sales / Estimator
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">
        <ShieldAlert className="w-3 h-3 mr-1 text-slate-400" />
        Viewer (Read-only)
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#030A16] text-slate-100 flex flex-col font-sans">
      {/* Sub-header navigation bar for internal workspace */}
      <div className="bg-brand-navy-950 border-b border-white/10 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Workspace:
          </span>
          {getRoleBadge()}
          <span className="text-xs text-slate-400 hidden sm:inline">
            {user?.name || 'Authorized Member'}
          </span>
        </div>

        {/* Links Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1 text-xs">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-brand-electric-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors ml-2 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">{children}</div>
    </div>
  );
};
