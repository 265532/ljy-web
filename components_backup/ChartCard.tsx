
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical } from 'lucide-react';

interface ChartCardProps {
  title: string;
  type: 'pie' | 'donut';
  data: Array<{ name: string; value: number; color: string }>;
  centerLabel?: string;
  centerSub?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data, centerLabel, centerSub }) => {
  return (
    <div className="bg-[#151B28] rounded-xl p-5 border border-slate-800/50 flex flex-col h-[320px]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${title === '运输方式' ? 'bg-cyan-400' : title === '区域任务分布' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
           <h3 className="text-xs font-bold text-slate-300 tracking-wide">{title}</h3>
        </div>
        <button className="text-slate-500 hover:text-slate-300"><MoreVertical size={16} /></button>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={type === 'donut' ? '65%' : 0}
              outerRadius="90%"
              paddingAngle={type === 'donut' ? 4 : 0}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-500 font-medium">{centerSub}</span>
            <span className="text-2xl font-bold text-white leading-tight">{centerLabel}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-2 mt-4 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-slate-400 w-12">{item.name}</span>
            <span className="text-[10px] font-bold text-slate-200">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;
