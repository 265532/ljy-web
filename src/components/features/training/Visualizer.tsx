
import React, { useState, useMemo } from 'react';
import { Compass, Search, ZoomIn, RefreshCw } from 'lucide-react';

const Visualizer: React.FC = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showObstacles, setShowObstacles] = useState(true);

  // 模拟生成Q值热力图数据
  const heatmapData = useMemo(() => {
    return Array.from({ length: 144 }).map((_, i) => {
      // 模拟一些高价值区域（Q值）
      const row = Math.floor(i / 12);
      const col = i % 12;
      // 这里的逻辑让中间和路径附近的Q值看起来更高
      const distToCenter = Math.sqrt(Math.pow(row - 6, 2) + Math.pow(col - 6, 2));
      const value = Math.max(0, 0.8 - (distToCenter / 10) + (Math.random() * 0.2));
      return value;
    });
  }, []);

  return (
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 shadow-2xl flex-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
            <Compass size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">路径可视化</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">物流枢纽环境模拟</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-[#0B0F19] p-1 rounded-lg border border-slate-800">
             <button 
                onClick={() => setShowObstacles(!showObstacles)}
                className={`px-4 py-2 text-[10px] font-bold rounded-md transition-all ${showObstacles ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}
             >
               显示障碍物
             </button>
             <button 
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-4 py-2 text-[10px] font-bold rounded-md transition-all ${showHeatmap ? 'bg-slate-800 text-slate-200 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
             >
               Q值热力图
             </button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-cyan-400 transition-colors"><Search size={16} /></button>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-cyan-400 transition-colors"><ZoomIn size={16} /></button>
            <button className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"><RefreshCw size={16} /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#0B0F19] rounded-2xl border border-slate-800 relative overflow-hidden group/viz">
        {/* 背景网格 */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-r border-b border-slate-400/30" />
          ))}
        </div>

        {/* Q值热力图层 */}
        <div className={`absolute inset-0 grid grid-cols-12 grid-rows-12 transition-opacity duration-500 ${showHeatmap ? 'opacity-40' : 'opacity-0 pointer-events-none'}`}>
          {heatmapData.map((val, i) => (
            <div 
              key={i} 
              className="transition-colors duration-1000"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${val})`,
                boxShadow: val > 0.6 ? 'inset 0 0 10px rgba(59, 130, 246, 0.2)' : 'none'
              }} 
            />
          ))}
        </div>

        {/* 模拟障碍物 */}
        {showObstacles && (
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-[30%] left-[40%] w-16 h-24 bg-slate-800/60 rounded-lg border border-slate-700/50 backdrop-blur-sm animate-in fade-in duration-500" />
             <div className="absolute top-[60%] left-[20%] w-32 h-12 bg-slate-800/60 rounded-lg border border-slate-700/50 backdrop-blur-sm animate-in fade-in duration-500" />
             <div className="absolute top-[10%] left-[70%] w-20 h-20 bg-slate-800/60 rounded-lg border border-slate-700/50 backdrop-blur-sm animate-in fade-in duration-500" />
          </div>
        )}

        {/* 模拟路径线 */}
        <svg className="absolute inset-0 w-full h-full p-10 overflow-visible">
          <path 
            d="M50,100 L150,150 L300,200 L450,450 L650,550" 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="4" 
            strokeDasharray="8 4" 
            className="animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            strokeLinecap="round"
          />
          <path 
            d="M50,100 L150,150 L300,200 L450,450 L650,550" 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="12" 
            strokeOpacity="0.1" 
            className="blur-xl"
          />
          <circle cx="50" cy="100" r="8" fill="#10B981" />
          <circle cx="50" cy="100" r="15" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
        </svg>

        {/* 右上角坐标卡片 */}
        <div className="absolute top-6 right-6 bg-[#1F2937]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700 space-y-3 min-w-[180px] shadow-2xl z-10">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-bold uppercase">坐标:</span>
            <span className="text-blue-400 font-mono font-black">X: 284, Y: 156, Z: 0</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-bold uppercase">单步奖励:</span>
            <span className="text-emerald-400 font-black tracking-tighter">+24.50</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-bold uppercase">累计奖励:</span>
            <span className="text-emerald-400 font-black tracking-tighter">4,821.2</span>
          </div>
          {showHeatmap && (
            <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-bold uppercase italic">状态价值 (V):</span>
              <span className="text-cyan-400 font-black">0.824</span>
            </div>
          )}
        </div>

        {/* 图例 */}
        <div className="absolute bottom-6 left-6 flex items-center gap-6 bg-black/60 px-5 py-2.5 rounded-full border border-slate-800 shadow-xl z-10">
           <div className="flex items-center gap-2"><div className="w-3 h-1 bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]" /><span className="text-[10px] text-slate-300 font-black uppercase tracking-tight">最优路径</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-1 bg-slate-600 border border-slate-500" /><span className="text-[10px] text-slate-500 font-black uppercase tracking-tight">探索路径</span></div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" /><span className="text-[10px] text-slate-300 font-black uppercase tracking-tight">起点</span></div>
           {showHeatmap && (
             <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
               <div className="w-12 h-2 bg-gradient-to-r from-blue-900 to-blue-400 rounded-sm" />
               <span className="text-[10px] text-cyan-400 font-black uppercase tracking-tight">Q-Value</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
