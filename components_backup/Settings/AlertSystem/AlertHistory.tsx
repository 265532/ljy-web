
import React from 'react';
import { History, Eye, VolumeX } from 'lucide-react';

const AlertHistory: React.FC = () => {
  const alerts = [
    { time: "14:22:04", event: "亚太集群同步超时", level: "CRITICAL", node: "HK-01" },
    { time: "12:15:30", event: "异常地缘风险波动", level: "WARNING", node: "MIDDLE-EAST" },
    { time: "09:42:11", event: "数据库备份任务失败", level: "MINOR", node: "CLOUD-OSS" },
  ];

  return (
    <div className="bg-[#0B121E] border border-slate-800 rounded-[32px] p-8 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3 text-slate-400">
          <History size={18} />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">最近触发预警日志</h3>
        </div>
        <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">查看全部</button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800 rounded-[20px] hover:border-blue-500/30 transition-all group">
            <div className="flex items-center gap-5">
               <div className="text-[10px] font-mono text-slate-600 font-bold">{alert.time}</div>
               <div className="space-y-0.5">
                  <div className="text-xs font-black text-slate-200">{alert.event}</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">源节点: {alert.node}</div>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border border-white/5 ${
                alert.level === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                alert.level === 'WARNING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                'bg-slate-800 text-slate-500'
              }`}>{alert.level}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button title="查看详情" className="p-1.5 bg-slate-900 rounded-lg text-slate-400 hover:text-white"><Eye size={14} /></button>
                 <button title="静默 24h" className="p-1.5 bg-slate-900 rounded-lg text-slate-400 hover:text-red-400"><VolumeX size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertHistory;
