
import React from 'react';

const SystemPulse: React.FC = () => {
  return (
    <div className="h-24 w-full bg-slate-950 rounded-2xl border border-slate-900/50 relative overflow-hidden group">
      {/* 装饰性网格 */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-slate-600" />
        ))}
      </div>
      
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <path 
          d="M0,48 L40,48 L50,10 L60,86 L70,48 L120,48 L130,20 L140,70 L150,48 L200,48 L210,5 L220,90 L230,48 L280,48 L290,15 L300,80 L310,48 L360,48 L370,10 L380,86 L390,48 L440,48" 
          fill="none" 
          stroke="#06B6D4" 
          strokeWidth="2" 
          className="animate-pulse opacity-80"
          strokeLinecap="round"
        />
        <path 
          d="M0,48 L40,48 L50,10 L60,86 L70,48 L120,48 L130,20 L140,70 L150,48 L200,48 L210,5 L220,90 L230,48 L280,48 L290,15 L300,80 L310,48 L360,48 L370,10 L380,86 L390,48 L440,48" 
          fill="none" 
          stroke="#06B6D4" 
          strokeWidth="6" 
          className="blur-md opacity-20"
          strokeLinecap="round"
        />
      </svg>
      
      {/* 实时移动的光点效果可以通过 CSS 动画模拟，但这里保持简洁 */}
      <div className="absolute top-2 right-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Active Processing</span>
      </div>
    </div>
  );
};

export default SystemPulse;
