'use client';

import React, { useState, useEffect } from 'react';
import { InternalLayout } from '@/components/InternalLayout';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { MASTER_PRICING_ITEMS, SERVICE_CATEGORIES } from '@/data/priceCatalogue';
import { PriceItem } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  Database,
  Lock,
  Edit2,
  Check,
  X,
  Search,
  Filter,
  ShieldCheck,
  AlertCircle,
  Plus,
} from 'lucide-react';

export default function PriceCataloguePage() {
  const { user, permissions } = useAuth();
  const { language } = useLanguage();

  const [items, setItems] = useState<PriceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PriceItem>>({});
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('futureix_master_pricing');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(MASTER_PRICING_ITEMS);
      }
    } else {
      setItems(MASTER_PRICING_ITEMS);
    }
  }, []);

  const handleStartEdit = (item: PriceItem) => {
    if (!permissions.canEditCatalogue) {
      alert(`Access Restricted: Your current role (${user?.role || 'viewer'}) is not authorized to edit master pricing. Administrator credentials required.`);
      return;
    }
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    if (!permissions.canEditCatalogue) return;
    const updated = items.map((i) => {
      if (i.id === editingId) {
        return {
          ...i,
          ...editForm,
          lastUpdated: new Date().toISOString().split('T')[0],
        } as PriceItem;
      }
      return i;
    });

    setItems(updated);
    localStorage.setItem('futureix_master_pricing', JSON.stringify(updated));
    setEditingId(null);
    setStatusMessage('Master price item successfully updated and synced.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const filteredItems = items.filter((i) => {
    const matchesSearch =
      i.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.nameHi.includes(searchTerm) ||
      i.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || i.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <InternalLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-brand-electric-400" />
              <h1 className="font-heading text-2xl font-bold text-white">
                Master Service & Price Catalogue
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Central single source of truth for public pricing cards and internal calculation rules.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {!permissions.canEditCatalogue && (
              <div className="flex items-center px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <Lock className="w-3.5 h-3.5 mr-1.5" />
                <span>Read-Only Mode ({user?.role || 'viewer'})</span>
              </div>
            )}
            {permissions.canEditCatalogue && (
              <span className="flex items-center px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                <span>Admin Editing Authorized</span>
              </span>
            )}
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center">
            <Check className="w-4 h-4 mr-2 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by service name, code, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-brand-electric-400"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400"
          >
            <option value="all">All Service Categories ({items.length})</option>
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* Catalogue Items Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-card">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-brand-navy-950/80 text-slate-400 border-b border-white/10">
                  <th className="py-3 px-4">ID & Service Name (EN / HI)</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Billing</th>
                  <th className="py-3 px-4 text-right">Min Price</th>
                  <th className="py-3 px-4 text-right">Max Price</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => {
                  const isEditing = editingId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={editForm.nameEn || ''}
                              onChange={(e) => setEditForm({ ...editForm, nameEn: e.target.value })}
                              className="px-2 py-1 rounded bg-brand-navy-900 border border-white/20 text-white w-full"
                            />
                            <input
                              type="text"
                              value={editForm.nameHi || ''}
                              onChange={(e) => setEditForm({ ...editForm, nameHi: e.target.value })}
                              className="px-2 py-1 rounded bg-brand-navy-900 border border-white/20 text-white w-full"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-semibold text-white">{item.nameEn}</p>
                            <p className="text-[11px] text-slate-400">{item.nameHi}</p>
                            <span className="font-mono text-[10px] text-brand-electric-400">
                              {item.id}
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-400 capitalize">
                        {item.categoryId.replace('_', ' ')}
                      </td>

                      <td className="py-3 px-4 text-slate-300">
                        {isEditing ? (
                          <select
                            value={editForm.billingType}
                            onChange={(e) => setEditForm({ ...editForm, billingType: e.target.value as any })}
                            className="px-2 py-1 rounded bg-brand-navy-900 border border-white/20 text-white"
                          >
                            <option value="one_time">One-time</option>
                            <option value="monthly">Monthly</option>
                            <option value="per_unit">Per Unit</option>
                          </select>
                        ) : (
                          <span className="capitalize">{item.billingType.replace('_', ' ')}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-white">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.minPrice || 0}
                            onChange={(e) => setEditForm({ ...editForm, minPrice: Number(e.target.value) })}
                            className="px-2 py-1 rounded bg-brand-navy-900 border border-white/20 text-white w-24 text-right"
                          />
                        ) : (
                          formatINR(item.minPrice)
                        )}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-brand-gold-400 font-bold">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.maxPrice || 0}
                            onChange={(e) => setEditForm({ ...editForm, maxPrice: Number(e.target.value) })}
                            className="px-2 py-1 rounded bg-brand-navy-900 border border-white/20 text-white w-24 text-right"
                          />
                        ) : (
                          formatINR(item.maxPrice)
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {item.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                              title="Save"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title={permissions.canEditCatalogue ? 'Edit Price Item' : 'Read-only'}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </InternalLayout>
  );
}
