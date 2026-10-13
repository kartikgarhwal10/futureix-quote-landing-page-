'use client';

import React, { useState, useEffect } from 'react';
import { InternalLayout } from '@/components/InternalLayout';
import { useAuth } from '@/context/AuthContext';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import { SiteSettings } from '@/lib/types';
import { Settings, Save, ShieldAlert, CheckCircle2, Building, Percent, Phone } from 'lucide-react';

export default function WorkspaceSettingsPage() {
  const { user, permissions } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('futureix_site_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!permissions.canManageSettings) {
      alert(`Access Restricted: Only Administrators can modify commercial tax rates and workspace settings.`);
      return;
    }

    localStorage.setItem('futureix_site_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <InternalLayout>
      <div className="max-w-4xl space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-brand-electric-400" />
              <h1 className="font-heading text-2xl font-bold text-white">
                Commercial & Workspace Settings
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Configure agency contact channels, GST rates, proposal defaults, and sales discount limits.
            </p>
          </div>

          {!permissions.canManageSettings && (
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" />
              <span>Admin Access Required to Edit</span>
            </span>
          )}
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
            <span>Settings saved successfully. Changes will reflect across quotations.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Agency Identity */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center text-brand-electric-400">
              <Building className="w-4 h-4 mr-2" />
              <span>Agency Brand & Founders Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Agency Brand Name</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.agencyName}
                  onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Official Website</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.website}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Founder</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.founders.founder}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      founders: { ...settings.founders, founder: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Co-founder</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.founders.coFounder}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      founders: { ...settings.founders, coFounder: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-medium mb-1">Registered Address</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Tax & Commercial Limits */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center text-brand-gold-400">
              <Percent className="w-4 h-4 mr-2" />
              <span>Tax Configuration & Discount Approvals</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Applicable GST Rate (%)</label>
                <input
                  type="number"
                  disabled={!permissions.canManageSettings}
                  value={settings.gstRate}
                  onChange={(e) => setSettings({ ...settings, gstRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">GSTIN Number</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.gstin}
                  onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Max Sales Discount Limit (%)</label>
                <input
                  type="number"
                  disabled={!permissions.canManageSettings}
                  value={settings.maxSalesDiscount}
                  onChange={(e) => setSettings({ ...settings, maxSalesDiscount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Discounts above this require Administrator override approval.
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp & Contact */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center text-emerald-400">
              <Phone className="w-4 h-4 mr-2" />
              <span>WhatsApp Integration Channel</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">WhatsApp Business Digits (without +)</label>
                <input
                  type="text"
                  disabled={!permissions.canManageSettings}
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Used by all public &quot;Chat on WhatsApp&quot; buttons and customer inquiry triggers.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Primary Email</label>
                <input
                  type="email"
                  disabled={!permissions.canManageSettings}
                  value={settings.primaryEmail}
                  onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400 disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {permissions.canManageSettings && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                <span>Save Workspace Settings</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </InternalLayout>
  );
}
