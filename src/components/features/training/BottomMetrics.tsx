
import React from 'react';
import { Clock, Database, Cpu, HardDrive, Activity } from 'lucide-react';

const BottomMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      <MetricCard icon={<Clock size={20} />} label="训练用时" value="2d 03h 14m" />
      <MetricCard icon={<Database size={20} />} label="数据集" value="18.7 GB" />
      <MetricCard icon={<Cpu size={20} />} label="GPU 利用率" value="94%" accent="text-amber-500" />
      <MetricCard icon={<HardDrive size={20} />} label="显存占用" value="9.2 / 16 GB" />
      <MetricCard icon={<Activity size={20} />} label="吞吐量" value="1850 EPS" accent="text-emerald-500" />
    </div>
  );
};

const MetricCard = ({ icon, label, value, accent = "text-white" }: any) => (
  <div className="bg-[#111827] rounded-2xl p-6 border border-slate-800 flex items-center gap-6 group hover:border-blue-500/30 transition-all">
    <div className="w-14 h-14 bg-[#0B0F19] rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{label}</span>
      <span className={`text-xl font-black ${accent}`}>{value}</span>
    </div>
  </div>
);

export default BottomMetrics;
