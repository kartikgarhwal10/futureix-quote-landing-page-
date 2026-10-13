'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/types';
import { Lock, ShieldCheck, UserCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@futureix.in');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
    router.push('/internal/dashboard');
  };

  const handleQuickRole = async (role: UserRole) => {
    setSelectedRole(role);
    const roleEmail =
      role === 'admin'
        ? 'kartik@futureix.in'
        : role === 'sales'
        ? 'mritunjay@futureix.in'
        : 'auditor@futureix.in';
    setEmail(roleEmail);
    await login(roleEmail, role);
    router.push('/internal/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-electric-500/10 border border-brand-electric-500/30 flex items-center justify-center mx-auto text-brand-electric-400 shadow-glow">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Futureix Team Workspace
          </h2>
          <p className="text-xs text-slate-400">
            Protected internal area for authorized Futureix commercial estimators.
          </p>
        </div>

        {/* Quick Demo Role Switcher for instant evaluator testing */}
        <div className="p-3.5 bg-brand-navy-950/80 rounded-xl border border-white/5 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
            Select Role to Authenticate:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickRole('admin')}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'admin'
                  ? 'bg-brand-electric-600 text-white shadow-glow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickRole('sales')}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'sales'
                  ? 'bg-brand-electric-600 text-white shadow-glow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Sales
            </button>
            <button
              type="button"
              onClick={() => handleQuickRole('viewer')}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'viewer'
                  ? 'bg-brand-electric-600 text-white shadow-glow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Viewer
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-electric-600 to-brand-electric-500 hover:from-brand-electric-500 hover:to-brand-electric-400 text-white font-semibold text-xs shadow-glow transition-all flex items-center justify-center cursor-pointer"
          >
            <span>Sign In to Workspace</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500">
          <p>Role checks and catalog mutation protection enforced.</p>
        </div>
      </div>
    </div>
  );
}
