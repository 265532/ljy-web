import React from 'react';
import { Activity, Cpu } from 'lucide-react';

const clusters = [
  { name: "亚太集群 (APAC)", nodes: 120, status: "Online", color: "text-emerald-500", bg: "bg-emerald-500/10", active: true },
  { name: "北美集群 (NA)", nodes: 42, status: "Backup", color: "text-blue-500", bg: "bg-blue-500/10", active: true },
  { name: "欧非集群 (EMEA)", nodes: 0, status: "Offline", color: "text-red-500", bg: "bg-red-500/10", active: false },
  { name: "南美节点 (LATAM)", nodes: 12, status: "Idle", color: "text-slate-500", bg: "bg-slate-800", active: false },
];

const ComputingClusters: React.FC = () => {
  return (
    <div className="bg-[#0B121E] border border-slate-800 rounded-[32px] p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-3 text-slate-400">
        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
          <Cpu size={18} />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-widest">算力集群分布</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {clusters.map((cluster, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-between p-5 rounded-2xl border transition-all group ${
              cluster.active ? 'bg-slate-950/40 border-slate-800 hover:border-slate-700' : 'bg-slate-950/10 border-slate-900 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cluster.bg} ${cluster.color} border border-white/5 shadow-lg group-hover:scale-110 transition-transform`}>
                <Activity size={18} />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-black text-slate-200">{cluster.name}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">活跃: <span className="text-white">{cluster.nodes}</span></div>
              </div>
            </div>
            <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border border-white/5 bg-slate-900 shadow-sm ${cluster.color}`}>
              {cluster.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComputingClusters;