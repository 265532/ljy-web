
import React, { useState } from 'react';
import { AlertTriangle, Zap, Terminal, CheckCircle2 } from 'lucide-react';

const AlertPanel: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  // 处理应用策略
  const handleApplyStrategy = () => {
    // 显示成功提示
    setShowSuccess(true);
    
    // 3秒后隐藏提示
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-4 h-full">
      {/* Risk Alert */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
        <div className="bg-red-500/20 p-2 rounded-lg h-fit">
          <AlertTriangle className="text-red-500" size={18} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-red-500 mb-1">高拥堵风险</h4>
          <p className="text-[10px] text-red-400/80 leading-relaxed">上海港延迟比基准预测增加了 <span className="font-bold text-red-400">42%</span>。</p>
        </div>
      </div>

      {/* AI Strategy Info */}
      <div className="bg-[#151B28] border border-cyan-500/30 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="text-cyan-400" size={20} fill="currentColor" />
          <h4 className="text-xs font-bold text-white">AI 优化已就绪</h4>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          北美航线的新强化学习策略可减少 <span className="text-cyan-400 font-bold">2.3%</span> 的延迟。
        </p>
        <button 
          onClick={handleApplyStrategy}
          className="w-full py-2 bg-cyan-500 text-black text-[11px] font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          应用策略
        </button>
        
        {/* 成功提示 */}
        {showSuccess && (
          <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-400">应用成功</span>
          </div>
        )}
      </div>

      {/* RL Score */}
      <div className="bg-[#151B28] rounded-xl border border-slate-800/50 p-5 flex flex-col flex-1 min-h-[150px]">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">强化学习策略评分</span>
        
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="text-3xl font-bold text-white">78%</span>
            <p className="text-[10px] text-slate-500">置信度</p>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                className="text-cyan-500" 
                strokeDasharray={175} 
                strokeDashoffset={175 * (1 - 0.78)} 
                strokeLinecap="round" 
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-cyan-400">高</span>
          </div>
        </div>

        <button className="mt-auto flex items-center justify-center gap-2 py-2 border border-slate-700 rounded-lg text-[10px] font-bold text-slate-300 hover:bg-slate-800 transition-colors">
          <Terminal size={14} className="text-slate-500" />
          训练日志
        </button>
      </div>
    </div>
  );
};

export default AlertPanel;
