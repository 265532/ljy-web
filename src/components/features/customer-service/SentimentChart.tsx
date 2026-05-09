
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Smile } from 'lucide-react';

const SentimentChart: React.FC = () => {
  const data = [
    { name: '正面正面', value: 65, color: '#10b981' },
    { name: '中性', value: 25, color: '#3b82f6' },
    { name: '负面', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="bg-[#0B121E] border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Smile size={18} className="text-emerald-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">客户情感实时极性</h3>
        </div>
      </div>

      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
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
              contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid #1f2937', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-black text-white">65%</span>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">满意</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center p-2 bg-[#05080F] rounded-xl border border-slate-800/50">
             <div className="text-[10px] font-black text-white">{item.value}%</div>
             <div className={`text-[8px] font-bold uppercase tracking-tighter ${
               item.name === '负面' ? 'text-red-500' : 
               item.name === '正面正面' ? 'text-emerald-500' : 'text-blue-400'
             }`}>
               {item.name}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentChart;
