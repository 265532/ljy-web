
import React, { useState, useEffect } from 'react';
import { Settings, Zap, Shield, Cpu, Share2, Activity, Radio, Globe } from 'lucide-react';
import SystemPulse from './SystemPulse';
import NodeGrid from './NodeGrid';

const ConsoleModule: React.FC = () => {
  const [latency, setLatency] = useState(0.024);
  const [nodes, setNodes] = useState(1204);
  const [throughput, setThroughput] = useState(84.2);
  const [reward, setReward] = useState(142);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [autoTraining, setAutoTraining] = useState(true);
  const [crossDomainSync, setCrossDomainSync] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro-fluctuations in performance metrics
      setLatency(prev => Math.max(0.015, Math.min(0.045, prev + (Math.random() - 0.5) * 0.005)));
      
      // Occasional node count changes
      if (Math.random() > 0.8) {
        setNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }

      // Throughput fluctuations
      setThroughput(prev => Math.max(82.0, Math.min(88.5, prev + (Math.random() - 0.5) * 0.8)));

      // Reward fluctuations
      setReward(prev => Math.max(130, Math.min(160, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // 处理全局优化同步
  const handleGlobalOptimization = () => {
    setIsOptimizing(true);

    // 模拟优化过程，让数据缓慢动态变化
    let step = 0;
    const totalSteps = 20;
    const interval = setInterval(() => {
      step++;

      // 让数据产生更大的波动，模拟优化过程
      setLatency(prev => Math.max(0.015, Math.min(0.045, prev + (Math.random() - 0.5) * 0.01)));
      setNodes(prev => prev + (Math.random() > 0.5 ? 2 : -1));
      setThroughput(prev => Math.max(80.0, Math.min(90.0, prev + (Math.random() - 0.5) * 1.5)));
      setReward(prev => Math.max(120, Math.min(170, prev + (Math.random() > 0.5 ? 3 : -2))));

      // 优化完成
      if (step >= totalSteps) {
        clearInterval(interval);
        setIsOptimizing(false);
      }
    }, 300); // 每300ms更新一次，产生缓慢变化的效果
  };

  return (
    <div className="bg-[#0B121E]/80 backdrop-blur-2xl rounded-[40px] border border-slate-800/60 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group border-t-white/5">
      {/* 极光背景装饰 */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -z-10 group-hover:bg-cyan-500/15 transition-all duration-1000" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col xl:flex-row gap-12 items-stretch">
        {/* 左侧：系统动力中心 */}
        <div className="flex-[1.5] space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <Radio size={24} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-[0.2em]">综合指挥控制台</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Optimization Engine v2.4.8-STABLE</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">系统响应延迟</div>
                <div className="text-sm font-mono font-black text-cyan-400 transition-all duration-500 tabular-nums">
                  {latency.toFixed(3)}ms
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-right">
                <div className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">同步节点数</div>
                <div className="text-sm font-mono font-black text-white transition-all duration-500 tabular-nums">
                  {nodes.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <SystemPulse />
          
          <div className="grid grid-cols-4 gap-4">
            <QuickStat icon={<Zap size={14} />} label="瞬时吞吐量" value={throughput.toFixed(1)} unit="k" color="text-cyan-400" />
            <QuickStat icon={<Activity size={14} />} label="强化学习奖励" value={`+${reward}`} unit="avg" color="text-emerald-400" />
            <QuickStat icon={<Shield size={14} />} label="冗余因子" value="1.42" unit="x" color="text-blue-400" />
            <QuickStat icon={<Globe size={14} />} label="全球连通度" value="99.9" unit="%" color="text-slate-300" />
          </div>
        </div>

        {/* 垂直分割线 */}
        <div className="hidden xl:block w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent mx-2" />

        {/* 右侧：集群矩阵与核心指令 */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/50 pb-4">
              <div className="flex items-center gap-3">
                <Cpu size={18} className="text-slate-500" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">计算集群健康阵列</span>
              </div>
              <button 
                onClick={() => alert('管理集群功能已触发')}
                className="text-[10px] font-black text-blue-500 hover:text-blue-400 transition-colors active:scale-95"
              >
                管理集群
              </button>
            </div>
            <NodeGrid />
          </div>

          <div className="grid grid-cols-2 gap-4">
        <ControlToggle 
          icon={<Zap size={14} />} 
          label="自动训练模式" 
          active={autoTraining}
          onClick={() => setAutoTraining(!autoTraining)}
        />
        <ControlToggle 
          icon={<Share2 size={14} />} 
          label="跨域数据同步" 
          active={crossDomainSync}
          onClick={() => setCrossDomainSync(!crossDomainSync)}
        />
      </div>

          <button 
            onClick={handleGlobalOptimization}
            disabled={isOptimizing}
            className={`w-full py-5 text-white text-xs font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(6,182,212,0.3)] uppercase tracking-[0.3em] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${isOptimizing ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'}`}
          >
            {isOptimizing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                优化中...
              </>
            ) : (
              <>
                <Zap size={16} fill="currentColor" />
                执行全局优化同步
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ icon, label, value, unit, color }: any) => (
  <div className="bg-[#0B0F19]/60 border border-slate-800/50 rounded-2xl p-4 group/stat hover:border-cyan-500/30 transition-all">
    <div className="flex items-center gap-2 mb-2">
       <span className="text-slate-600 group-hover/stat:text-cyan-500 transition-colors">{icon}</span>
       <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest">{label}</div>
    </div>
    <div className="flex items-baseline gap-1">
      <div className={`text-xl font-black ${color} tracking-tight tabular-nums`}>{value}</div>
      <div className="text-[8px] text-slate-700 font-black uppercase">{unit}</div>
    </div>
  </div>
);

const ControlToggle = ({ icon, label, active = false, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group/toggle ${active ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-slate-900/30 border-slate-800'} active:scale-95`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-200' : 'text-slate-500'}`}>{label}</span>
    </div>
    <div 
      className={`w-7 h-4 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${active ? 'bg-cyan-500' : 'bg-slate-700'}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-3' : ''}`} />
    </div>
  </div>
);

export default ConsoleModule;
