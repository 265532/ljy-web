
import React from 'react';
import { Award } from 'lucide-react';

const SustainabilityScore: React.FC = () => {
  const score = 84;
  const radius = 45; // 稍微减小半径以确保描边不超出
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800 flex items-center justify-between group shadow-xl">
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2 text-emerald-400">
          <Award size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">绿色算力评分</h3>
        </div>
        <div className="text-2xl font-black text-white italic tracking-tighter">等级: A+</div>
        <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-[140px]">
          您的算法优化策略减少了 <span className="text-emerald-400">22%</span> 的无效计算消耗。
        </p>
      </div>

      {/* 优化后的仪表盘容器 */}
      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
        {/* 背景光晕 */}
        <div className="absolute inset-4 bg-emerald-500/5 blur-[25px] rounded-full opacity-60" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 overflow-visible drop-shadow-[0_0_8px_rgba(16,185,129,0.1)]">
          {/* 背景轨道 */}
          <circle 
            cx="50" cy="50" r={radius} 
            stroke="#1e293b" strokeWidth="7" 
            fill="transparent" 
            strokeOpacity="0.4"
          />
          {/* 进度轨道 */}
          <circle 
            cx="50" cy="50" r={radius} 
            stroke="#10b981" strokeWidth="7" 
            fill="transparent" 
            className="transition-all duration-1000 ease-out" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
          />
        </svg>
        
        {/* 居中文字排版 - 匹配用户提供的参考图 */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-black text-white leading-none tracking-tighter">
            {score}
          </span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em] mt-1.5 border-t border-slate-800 pt-1.5 w-8">
            POINTS
          </span>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityScore;
