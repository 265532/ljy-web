
import React from 'react';
import { Sun, Wind, Zap } from 'lucide-react';

const EnergySourcePanel: React.FC = () => {
  return (
    <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800 flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">能源供应架构</h3>
        <span className="text-[10px] font-bold text-emerald-400">ESG 合规</span>
      </div>

      <div className="space-y-5">
        <SourceBar icon={<Wind size={14} />} label="风能资源" percent={45} color="bg-teal-500" />
        <SourceBar icon={<Sun size={14} />} label="太阳能" percent={20} color="bg-amber-500" />
        <SourceBar icon={<Zap size={14} />} label="城市电网" percent={35} color="bg-slate-700" />
      </div>

      <div className="pt-4 border-t border-slate-800 flex justify-between">
        <div className="text-center">
          <div className="text-xs font-black text-white">65%</div>
          <div className="text-[8px] text-slate-500 uppercase font-bold">可再生总计</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-black text-emerald-400">Low</div>
          <div className="text-[8px] text-slate-500 uppercase font-bold">碳风险等级</div>
        </div>
      </div>
    </div>
  );
};

const SourceBar = ({ icon, label, percent, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-bold">
      <div className="flex items-center gap-2 text-slate-300">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-white">{percent}%</span>
    </div>
    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.2)]`} 
        style={{ width: `${percent}%` }} 
      />
    </div>
  </div>
);

export default EnergySourcePanel;
