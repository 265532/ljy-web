
import React from 'react';
import { ShieldCheck, Lock, Fingerprint, Search } from 'lucide-react';

const SecurityHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <ShieldCheck size={28} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">合规与安全中心</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">
              Zero-Trust Architecture & Governance Control
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="flex items-center gap-6 px-6 py-3 bg-[#0B121E] border border-slate-800 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-black uppercase">最后安全扫描</span>
            <span className="text-xs font-bold text-slate-200">14:22:04 (今日)</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-black uppercase">安全防御等级</span>
            <span className="text-xs font-bold text-emerald-400 tracking-widest">PRO-ULTRA</span>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20 flex items-center gap-2 hover:scale-105 transition-all uppercase tracking-widest">
          <Search size={14} /> 全域安全扫描
        </button>
      </div>
    </div>
  );
};

export default SecurityHeader;
