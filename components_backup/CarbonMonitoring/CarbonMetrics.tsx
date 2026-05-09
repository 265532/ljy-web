
import React from 'react';
import { Cloud, Zap, Target, Trees } from 'lucide-react';

interface MetricsData {
  carbon: {
    value: number;
    trend: number;
  };
  energy: {
    value: number;
    trend: number;
  };
  offset: {
    value: number;
    trend: number;
  };
  pue: {
    value: number;
    trend: number;
  };
}

interface CarbonMetricsProps {
  metricsData?: MetricsData;
}

const CarbonMetrics: React.FC<CarbonMetricsProps> = ({ metricsData }) => {
  // 默认数据
  const defaultData = {
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
  };

  // 使用传入的数据或默认数据
  const data = metricsData || defaultData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        icon={<Cloud size={24} />} 
        label="总碳排放量" 
        value={data.carbon.value.toFixed(2)} 
        unit="tCO2e" 
        trend={`${data.carbon.trend > 0 ? '+' : ''}${data.carbon.trend}%`} 
        color="text-emerald-400"
        sub="较上月下降"
      />
      <MetricCard 
        icon={<Zap size={24} />} 
        label="实时总能耗" 
        value={data.energy.value.toLocaleString()} 
        unit="kWh" 
        trend={`${data.energy.trend > 0 ? '+' : ''}${data.energy.trend.toFixed(1)}%`} 
        color="text-amber-400"
        sub="训练任务高峰"
      />
      <MetricCard 
        icon={<Trees size={24} />} 
        label="碳中和抵消" 
        value={data.offset.value.toFixed(1)} 
        unit="%" 
        trend={`${data.offset.trend > 0 ? '+' : ''}${data.offset.trend}%`} 
        color="text-teal-400"
        sub="清洁能源占比"
      />
      <MetricCard 
        icon={<Target size={24} />} 
        label="PUE 效能" 
        value={data.pue.value.toFixed(2)} 
        unit="Ratio" 
        trend={`${data.pue.trend > 0 ? '+' : ''}${data.pue.trend.toFixed(2)}`} 
        color="text-cyan-400"
        sub="处于行业最优级"
      />
    </div>
  );
};

const MetricCard = ({ icon, label, value, unit, trend, color, sub }: any) => (
  <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800 flex flex-col gap-4 relative overflow-hidden group">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl bg-[#0B0F19] border border-slate-800 ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-black text-white">{value}</span>
          <span className="text-xs font-bold text-slate-500">{unit}</span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
      <span className="text-[10px] text-slate-500 font-bold uppercase">{sub}</span>
      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${trend.startsWith('-') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
        {trend}
      </span>
    </div>

    {/* 背景微光 */}
    <div className={`absolute -right-4 -bottom-4 w-16 h-16 blur-2xl opacity-10 ${color.replace('text', 'bg')}`} />
  </div>
);

export default CarbonMetrics;
