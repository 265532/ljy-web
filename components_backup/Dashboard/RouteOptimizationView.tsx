
import React from 'react';
import MapWidget from './MapWidget';
import { Navigation } from 'lucide-react';

const RouteOptimizationView: React.FC = () => {
  return (
    <div className="p-10 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white">实时路径分析</h2>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-widest text-xs">AI 赋能的多维度物流调度系统</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold hover:border-cyan-500/50 transition-all">全域视图</button>
          <button className="px-6 py-3 bg-cyan-500 text-black rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20">添加新路径</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 h-[600px]">
        <div className="col-span-3 bg-[#0B121E] rounded-3xl border border-slate-900 overflow-hidden relative">
          <MapWidget />
        </div>
        <div className="col-span-1 space-y-4 overflow-y-auto pr-2">
          <h3 className="text-sm font-bold text-slate-400 mb-4 px-2 uppercase tracking-widest">活跃任务 (4)</h3>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-[#0B121E] p-5 rounded-2xl border border-slate-900 hover:border-cyan-500/30 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center text-cyan-400">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">CN-SH → DE-HAM</div>
                    <div className="text-[10px] text-slate-500 font-medium">预计耗时: 22天</div>
                  </div>
                </div>
                <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black rounded-full uppercase">优化中</div>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[65%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationView;
