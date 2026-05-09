
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = Array.from({ length: 15 }, (_, i) => ({
  time: `${i + 1}:00`,
  emissions: 200 + Math.random() * 150 + (i > 8 ? 200 : 0),
  target: 250
}));

const EmissionChart: React.FC = () => {
  return (
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 h-full flex flex-col shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">碳排放实时趋势 (kg/h)</h3>
          <p className="text-[10px] text-slate-500 font-bold mt-1">基于 GPU 集群瞬时功耗实时换算</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <span className="text-[10px] font-bold text-emerald-400">当前排量: 342kg</span>
           </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData}>
            <defs>
              <linearGradient id="colorEm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid #1f2937', borderRadius: '12px' }}
              labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
              itemStyle={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="#10b981" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorEm)" 
              animationDuration={2000}
            />
            <Area 
              type="stepAfter" 
              dataKey="target" 
              stroke="#ef4444" 
              strokeWidth={1} 
              strokeDasharray="5 5"
              fill="none"
              animationDuration={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionChart;
