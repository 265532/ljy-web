
import React from 'react';
import { HardDrive } from 'lucide-react';

const EndpointsList: React.FC = () => {
  const endpoints = [
    { label: "Primary Storage Cluster (OSS-HK-01)", url: "oss-ap-hongkong.pathoptix.io", status: "Connected" },
    { label: "Archive Glacier Node (US-W-04)", url: "glacier.us-west-2.amazonaws.com", status: "Standby" },
    { label: "Edge Buffer (SH-09)", url: "edge.shanghai.pathoptix.io", status: "Active" },
  ];

  return (
    <div className="bg-[#0B121E] border border-slate-800 rounded-[32px] p-8 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <HardDrive size={18} className="text-slate-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">后端数据端点 (Endpoints)</h3>
        </div>
        <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">管理存储池</button>
      </div>
      <div className="space-y-4">
        {endpoints.map((ep, idx) => (
          <div key={idx} className="flex items-center justify-between p-5 bg-slate-950/40 border border-slate-800 rounded-[24px] hover:border-blue-500/30 transition-all group shadow-sm">
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest group-hover:text-slate-300 transition-colors">{ep.label}</div>
              <div className="text-xs font-mono text-slate-400 italic tracking-tighter">{ep.url}</div>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border border-white/5 transition-all ${
              ep.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
              ep.status === 'Active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse' :
              'bg-slate-900 text-slate-600'
            }`}>{ep.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndpointsList;
