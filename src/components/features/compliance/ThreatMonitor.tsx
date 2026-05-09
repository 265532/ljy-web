
import React from 'react';
import { Activity, ShieldAlert, Globe, Radar } from 'lucide-react';

const ThreatMonitor: React.FC = () => {
  return (
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 h-full flex flex-col shadow-2xl relative overflow-hidden group">
      {/* 装饰性背景网格 */}
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
      
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <Radar size={18} className="text-indigo-400 animate-spin-slow" />
            <h3 className="text-sm font-black text-white uppercase tracking-widest">威胁实时监测引擎</h3>
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Active threat mitigation via ML heuristics</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded border border-emerald-500/20 uppercase">系统加固中</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8 relative z-10">
        <div className="bg-black/40 rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center gap-4 group/box hover:border-indigo-500/30 transition-all">
          <div className="w-20 h-20 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
             <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
             <ShieldAlert size={32} className="text-indigo-400" />
          </div>
          <div className="text-center">
             <div className="text-2xl font-black text-white">0</div>
             <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">当前活跃威胁</div>
          </div>
        </div>

        <div className="space-y-4">
          <ThreatBar label="指令注入防御" status="Secure" percent={100} color="bg-emerald-500" />
          <ThreatBar label="异常地理位置尝试" status="Blocked" percent={100} color="bg-indigo-500" />
          <ThreatBar label="敏感数据出口过滤" status="Active" percent={92} color="bg-cyan-500" />
          <ThreatBar label="策略完整性校验" status="Verifying" percent={100} color="bg-purple-500" />
        </div>
      </div>

      <div className="mt-8 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Globe size={16} className="text-indigo-400" />
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">全球 IP 过滤黑名单</span>
        </div>
        <span className="text-xs font-black text-white">1,424,902 封禁中</span>
      </div>
    </div>
  );
};

const ThreatBar = ({ label, status, percent, color }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
      <span className="text-slate-400">{label}</span>
      <span className={status === 'Secure' ? 'text-emerald-400' : 'text-slate-300'}>{status}</span>
    </div>
    <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

export default ThreatMonitor;
