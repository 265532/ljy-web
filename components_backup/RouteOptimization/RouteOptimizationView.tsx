
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import NormalView from './Scenarios/NormalScenario/NormalView';
import StressView from './Scenarios/StressScenario/StressView';

const RouteOptimizationView: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState('normal');
  const [weights, setWeights] = useState({
    cost: 40,
    time: 25,
    stability: 30,
    carbon: 5
  });

  const handleWeightChange = (key: keyof typeof weights, val: number) => {
    setWeights(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setWeights({
      cost: 40,
      time: 25,
      stability: 30,
      carbon: 5
    });
  };

  const renderActiveScenario = () => {
    switch (activeScenario) {
      case 'normal': return <NormalView />;
      case 'stress': return <StressView />;
      default: return <NormalView />;
    }
  };

  return (
    <div className="p-10 space-y-8 bg-[#05080F] min-h-full font-inter animate-in fade-in duration-700">
      {/* Top Header & Weights Panel */}
      <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] italic">仿真运行场景 (CURRENT SIMULATION)</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-lg text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <RefreshCw size={12} className="text-slate-600" /> 更新于: 12 分钟前
            </div>
          </div>
          
          <div className="flex p-1 bg-[#0B121E] border border-slate-900 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveScenario('normal')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeScenario === 'normal' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              常规运营基准
            </button>
            <button 
              onClick={() => setActiveScenario('stress')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeScenario === 'stress' ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              极端拥堵压力测试
            </button>
          </div>
        </div>

        {/* Weights Panel - Matches Image Top Right */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 min-w-[420px] shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">决策偏好权重</h4>
            <button 
              onClick={handleReset}
              className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest"
            >
              重置
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <WeightSlider label="成本" value={weights.cost} onChange={(v) => handleWeightChange('cost', v)} />
            <WeightSlider label="时效" value={weights.time} onChange={(v) => handleWeightChange('time', v)} />
            <WeightSlider label="稳定" value={weights.stability} onChange={(v) => handleWeightChange('stability', v)} />
            <WeightSlider label="碳排" value={weights.carbon} onChange={(v) => handleWeightChange('carbon', v)} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="transition-all duration-500">
        {renderActiveScenario()}
      </div>
    </div>
  );
};

const WeightSlider = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="space-y-3 group/slider">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="text-slate-500">[{label}]</span>
        <span className="text-slate-200 transition-colors group-hover/slider:text-blue-400">{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-900 rounded-full relative flex items-center">
        {/* Visual Track */}
        <div className="absolute h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-150" style={{ width: `${value}%` }} />
        
        {/* Real Input Range (Invisible but capturing events) */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Visual Knob */}
        <div 
          className="absolute w-3.5 h-3.5 bg-white border-2 border-blue-500 rounded-full shadow-lg pointer-events-none transition-all duration-150" 
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }} 
        />
      </div>
    </div>
  );
};

export default RouteOptimizationView;
