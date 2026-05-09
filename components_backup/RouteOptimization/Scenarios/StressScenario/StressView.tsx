
import React from 'react';
import ComparisonTable from '../../ComparisonTable';
import SensitivityChart from '../../SensitivityChart';
import PressureMap from '../../PressureMap';
import SidebarWeights from '../../SidebarWeights';
import SimulationLog from '../../SimulationLog';

const StressView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-10 animate-in slide-in-from-right-4 duration-500">
      <div className="col-span-12 xl:col-span-9 space-y-10">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black text-white tracking-tighter">策略多维对比: 上海 <span className="text-red-500">→</span> 鹿特丹</h2>
              <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded flex items-center gap-1.5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> 高风险模拟中
              </div>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-3 italic">EXTREME CONGESTION STRESS ANALYSIS</p>
          </div>
        </div>

        {/* Core Components */}
        <ComparisonTable isStress />

        <div className="grid grid-cols-2 gap-8">
          <SensitivityChart isStress />
          <PressureMap isStress />
        </div>
      </div>

      <div className="col-span-12 xl:col-span-3 space-y-10">
        <SidebarWeights />
        <SimulationLog />
      </div>
    </div>
  );
};

export default StressView;
