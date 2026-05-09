
import React, { useState } from 'react';
import { Ship, Train, Truck, Zap, ChevronRight, FileText, Info, RefreshCw } from 'lucide-react';

interface OptimizationData {
  deliveryTime: string;
  cost: string;
  redundancy: number;
  stability: number;
  overallScore: number;
  pathId: string;
  modelVersion: string;
}

const RobustDetail: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationData, setOptimizationData] = useState<OptimizationData>({
    deliveryTime: '18 - 21 Days',
    cost: '$4,920',
    redundancy: 45,
    stability: 88,
    overallScore: 92,
    pathId: 'RR-904-STA',
    modelVersion: 'v4.2.1-Robust'
  });

  // 生成随机优化数据
  const generateOptimizationData = (): OptimizationData => {
    const deliveryDays = Math.floor(Math.random() * 5) + 18;
    const deliveryRange = Math.floor(Math.random() * 4) + 2;
    const cost = Math.floor(Math.random() * 1000) + 4500;
    const redundancy = Math.floor(Math.random() * 30) + 35;
    const stability = Math.floor(Math.random() * 15) + 80;
    const overallScore = Math.floor(Math.random() * 10) + 85;
    const pathId = `RR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-STA`;
    const modelVersion = `v4.2.${Math.floor(Math.random() * 5) + 1}-Robust`;

    return {
      deliveryTime: `${deliveryDays} - ${deliveryDays + deliveryRange} Days`,
      cost: `$${cost.toLocaleString()}`,
      redundancy,
      stability,
      overallScore,
      pathId,
      modelVersion
    };
  };

  // 处理重新运行全局优化
  const handleRerunOptimization = () => {
    setIsOptimizing(true);

    // 模拟优化过程（2秒）
    setTimeout(() => {
      const newData = generateOptimizationData();
      setOptimizationData(newData);
      setIsOptimizing(false);
    }, 2000);
  };
  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight italic">鲁棒性备选路径分析</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-relaxed">
            系统已完成 5000 次蒙特卡洛压力模拟，推荐以下高稳定性方案
          </p>
        </div>
        <button 
          onClick={handleRerunOptimization}
          disabled={isOptimizing}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-xl shadow-lg shadow-blue-500/20 transition-all uppercase tracking-[0.15em] transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isOptimizing ? (
            <>
              <RefreshCw size={14} fill="currentColor" className="animate-spin" /> 优化中...
            </>
          ) : (
            <>
              <Zap size={14} fill="currentColor" /> 重新运行全局优化
            </>
          )}
        </button>
      </div>

      <div className="bg-[#0B121E]/60 backdrop-blur-3xl rounded-[32px] border border-slate-800 p-8 flex flex-col xl:flex-row gap-10 relative overflow-hidden shadow-2xl">
        {/* Left Side: Path Visualizer & Metrics */}
        <div className="flex-1 space-y-10">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <TransportIcon icon={<Ship size={20} />} active />
                <ChevronRight size={16} className="text-slate-800" />
                <TransportIcon icon={<Train size={20} />} active />
                <ChevronRight size={16} className="text-slate-800" />
                <TransportIcon icon={<Truck size={20} />} active />
             </div>
             <div>
                <div className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1 italic">路径编号 / 模型版本</div>
                <div className="flex items-baseline gap-3">
                   <span className="text-2xl font-black text-white tracking-[0.05em]">{optimizationData.pathId}</span>
                   <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{optimizationData.modelVersion}</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            <MetricBlock 
              label="预期交期" 
              value={optimizationData.deliveryTime} 
              sub="(P90 RANGE)" 
              color="text-emerald-400"
            />
            <MetricBlock 
              label="总计成本" 
              value={optimizationData.cost} 
              sub="(ESTIMATED)" 
              color="text-white"
            />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info size={12} className="text-slate-600" />
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">AI 解释性分析</span>
              </div>
              <div className="space-y-4">
                <ProgressItem label="冗余度" percent={optimizationData.redundancy} color="bg-blue-500" />
                <ProgressItem label="抗波动" percent={optimizationData.stability} color="bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Score Gauge */}
        <div className="w-full xl:w-[360px] bg-slate-950/40 rounded-[28px] p-8 border border-slate-800/50 flex flex-col items-center justify-between relative group">
          {/* Status Badges */}
          <div className="flex gap-2 w-full justify-center mb-6">
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black rounded-lg flex items-center gap-1.5 uppercase tracking-widest">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> 低碳推荐
            </span>
            <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black rounded-lg flex items-center gap-1.5 uppercase tracking-widest">
              <FileText size={10} /> 政策合规
            </span>
          </div>

          {/* High Fidelity Score Gauge */}
          <div className="relative w-52 h-52 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
            {/* Ambient Background Glow */}
            <div className="absolute inset-6 bg-blue-500/10 blur-[40px] rounded-full opacity-50" />
            
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 overflow-visible">
              <defs>
                <filter id="gaugeGlow">
                   <feGaussianBlur stdDeviation="2.5" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Track (Dashed) */}
              <circle cx="100" cy="100" r="85" stroke="#1e293b" strokeWidth="10" fill="transparent" strokeOpacity="0.4" strokeDasharray="2 3" />
              
              {/* Outer Segmented Cyan Ring */}
              <circle 
                cx="100" cy="100" r="85" 
                stroke="#00F2FF" strokeWidth="10" fill="transparent" 
                strokeDasharray="2.5 1.5" 
                strokeDashoffset={(2 * Math.PI * 85) * (1 - optimizationData.overallScore / 100)}
                strokeOpacity="0.8"
                filter="url(#gaugeGlow)"
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Inner Emerald Smooth Ring */}
              <circle 
                cx="100" cy="100" r="68" 
                stroke="#10b981" strokeWidth="4" fill="transparent" 
                strokeDasharray={2 * Math.PI * 68} 
                strokeDashoffset={(2 * Math.PI * 68) * (1 - optimizationData.stability / 100)} 
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
            </svg>
            
            {/* Centered Typography - Numerical size reduced to 5xl */}
            <div className="absolute flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tighter italic leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">{optimizationData.overallScore}</span>
                <span className="text-lg font-bold text-blue-500 mb-1">%</span>
              </div>
              <div className="flex flex-col items-center mt-3">
                <div className="h-[1px] w-8 bg-slate-800 mb-2 opacity-60" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em] whitespace-nowrap">综合评分</span>
              </div>
            </div>
          </div>
          
          <button className="mt-10 w-full py-3.5 bg-[#0B121E] border border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 hover:text-blue-400 hover:border-blue-500/40 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 group-hover:bg-slate-900 group-hover:text-slate-300">
            <Zap size={14} className="text-blue-500 group-hover:scale-125 transition-transform" /> 
            查看完整路径失效模拟
          </button>
        </div>
      </div>
    </div>
  );
};

const TransportIcon = ({ icon, active }: any) => (
  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${active ? 'bg-blue-600/10 border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/5' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
    {icon}
  </div>
);

const MetricBlock = ({ label, value, sub, color }: any) => (
  <div className="space-y-2">
    <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{label}</span>
    <div className={`text-2xl font-black ${color} tracking-tighter tabular-nums leading-none`}>{value}</div>
    <div className="text-[8px] text-slate-700 font-black uppercase tracking-widest">{sub}</div>
  </div>
);

const ProgressItem = ({ label, percent, color }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-300 tabular-nums">{percent}%</span>
    </div>
    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900 shadow-inner">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

export default RobustDetail;
