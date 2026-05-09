
import React, { useState } from 'react';
import { Leaf, Wind, Sun, Battery, Activity } from 'lucide-react';
import CarbonMetrics from './CarbonMetrics';
import EmissionChart from './EmissionChart';
import EnergySourcePanel from './EnergySourcePanel';
import SustainabilityScore from './SustainabilityScore';
import ESGReportView from './ESGReportView';

interface CarbonMonitoringViewProps {
  onViewChange?: (view: string) => void;
}

const CarbonMonitoringView: React.FC<CarbonMonitoringViewProps> = ({ onViewChange }) => {
  const [isESGReportOpen, setIsESGReportOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [metricsData, setMetricsData] = useState({
    carbon: {
      value: 2.42,
      trend: -12
    },
    energy: {
      value: 12840,
      trend: 5.4
    },
    offset: {
      value: 65.2,
      trend: 18
    },
    pue: {
      value: 1.21,
      trend: -0.02
    }
  });

  // 处理能源优化策略
  const handleOptimizeEnergy = () => {
    setIsOptimizing(true);

    // 模拟优化过程，让数据缓慢动态变化
    let step = 0;
    const totalSteps = 20;
    const interval = setInterval(() => {
      step++;

      // 让数据产生变化，模拟优化过程
      setMetricsData(prev => ({
        carbon: {
          value: Math.max(1.5, Math.min(3.0, prev.carbon.value + (Math.random() - 0.7) * 0.1)),
          trend: Math.max(-20, Math.min(-5, prev.carbon.trend + (Math.random() - 0.5) * 1))
        },
        energy: {
          value: Math.max(10000, Math.min(14000, prev.energy.value + (Math.random() - 0.6) * 200)),
          trend: Math.max(-10, Math.min(10, prev.energy.trend + (Math.random() - 0.5) * 0.5))
        },
        offset: {
          value: Math.max(50, Math.min(80, prev.offset.value + (Math.random() - 0.3) * 0.8)),
          trend: Math.max(10, Math.min(30, prev.offset.trend + (Math.random() - 0.5) * 1))
        },
        pue: {
          value: Math.max(1.1, Math.min(1.3, prev.pue.value + (Math.random() - 0.7) * 0.01)),
          trend: Math.max(-0.1, Math.min(0, prev.pue.trend + (Math.random() - 0.5) * 0.005))
        }
      }));

      // 优化完成
      if (step >= totalSteps) {
        clearInterval(interval);
        setIsOptimizing(false);
      }
    }, 300); // 每300ms更新一次，产生缓慢变化的效果
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 max-w-[1800px] mx-auto w-full">
      {/* 顶部标题与快速动作 */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Leaf size={28} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">碳排放监控中心</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">
                Real-time Environmental Impact & Energy Intelligence
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsESGReportOpen(true)}
            className="px-6 py-3 bg-[#111827] border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-emerald-400 transition-all flex items-center gap-2 group"
          >
            <Wind size={14} className="group-hover:rotate-45 transition-transform" /> 生成ESG报告
          </button>
          <button 
            onClick={handleOptimizeEnergy}
            disabled={isOptimizing}
            className={`px-6 py-3 rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2 hover:scale-105 transition-all ${isOptimizing ? 'bg-slate-700 text-white cursor-not-allowed' : 'bg-emerald-600 text-black'}`}
          >
            {isOptimizing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                优化中...
              </>
            ) : (
              <>
                <Sun size={14} fill="currentColor" />
                优化能源策略
              </>
            )}
          </button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <CarbonMetrics metricsData={metricsData} />

      {/* 中间核心分析区 */}
      <div className="grid grid-cols-12 gap-8 h-[500px]">
        {/* 趋势图 */}
        <div className="col-span-12 lg:col-span-8">
          <EmissionChart />
        </div>
        
        {/* 绿色评分与能源分布 */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <SustainabilityScore />
          <EnergySourcePanel />
        </div>
      </div>

      {/* 底部详细列表 */}
      <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-emerald-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-widest">节点能耗排行</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase">实时同步：120ms</span>
        </div>
        
        <div className="space-y-4">
          {[
            { node: "Shanghai-IDC-01", usage: "42.8 kW", co2: "12.4kg/h", type: "电网" },
            { node: "Nanjing-Edge-04", usage: "15.2 kW", co2: "0.2kg/h", type: "风能" },
            { node: "Global-Hub-Alpha", usage: "124.5 kW", co2: "45.1kg/h", type: "混合" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-[#0B0F19] rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-colors">
                  <Battery size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{item.node}</div>
                  <div className="text-[10px] text-slate-500 font-medium">能源模式: {item.type}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-white">{item.usage}</div>
                <div className="text-[10px] text-emerald-500 font-bold">{item.co2} 排量</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ESG 报告弹窗组件 */}
      <ESGReportView 
        isOpen={isESGReportOpen} 
        onClose={() => setIsESGReportOpen(false)} 
      />
    </div>
  );
};

export default CarbonMonitoringView;
