
import React from 'react';

const MapWidget: React.FC = () => {
  return (
    <div className="bg-[#151B28] rounded-xl border border-slate-800/50 p-6 relative overflow-hidden h-[450px]">
      <div className="relative z-10 space-y-1">
        <h3 className="text-sm font-bold text-white">全球实时智能</h3>
        <p className="text-[10px] text-cyan-400/80 font-medium">神经网络路径优化已激活</p>
      </div>

      {/* Styled SVG Map Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 mt-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full p-4">
          <path 
            fill="#1E293B" 
            d="M200,150 Q450,100 800,400" 
            fillOpacity="0" 
            stroke="#00F2FF" 
            strokeWidth="2" 
            strokeDasharray="4 2" 
            className="path-glow"
          />
          <path 
            fill="#1E293B" 
            d="M300,350 Q600,200 850,380" 
            fillOpacity="0" 
            stroke="#10B981" 
            strokeWidth="3" 
            className="path-glow"
          />
          
          {/* Animated Dots */}
          <circle cx="200" cy="150" r="4" fill="#00F2FF" className="animate-pulse" />
          <circle cx="300" cy="350" r="4" fill="#00F2FF" />
          <circle cx="800" cy="400" r="4" fill="#10B981" />
          <circle cx="850" cy="380" r="4" fill="#F59E0B" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#151B28] via-transparent to-transparent pointer-events-none" />

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-[#1F2937]/60 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 space-y-3">
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">全球节点图例</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-bold text-slate-200">AI 中心枢纽</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold text-slate-200">已优化节点</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-slate-200">风险评估</span>
          </div>
        </div>
      </div>
      
      {/* Decorative World Map Grid/Background */}
      <img 
        src="https://www.transparenttextures.com/patterns/dark-matter.png" 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        alt="Texture" 
      />
    </div>
  );
};

export default MapWidget;
