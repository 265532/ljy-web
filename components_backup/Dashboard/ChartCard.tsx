
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { MoreVertical } from 'lucide-react';

interface ChartCardProps {
  title: string;
  type: 'pie' | 'donut';
  data: Array<{ name: string; value: number; color: string }>;
  centerLabel?: string;
  centerSub?: string;
}

// 自定义活跃扇区：仅增加半径，不添加任何内部滤镜或阴影
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="none"
        className="transition-all duration-300 ease-out cursor-pointer"
      />
    </g>
  );
};

// 复刻图中的工具提示样式
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1B212D]/95 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <p className="text-[12px] font-black text-white italic">
          {payload[0].name} : <span className="text-cyan-400">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data, centerLabel, centerSub }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#151B28]/60 backdrop-blur-2xl rounded-[32px] p-6 border border-slate-800/40 flex flex-col h-[380px] shadow-2xl relative group overflow-hidden transition-all hover:border-slate-700/60">
      {/* 标题部分 */}
      <div className="flex justify-between items-center mb-2 z-10">
        <div className="flex items-center gap-3">
           <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor] ${title === '运输方式' ? 'text-cyan-400 bg-cyan-400' : 'text-emerald-400 bg-emerald-400'}`} />
           <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic opacity-80">{title}</h3>
        </div>
        <button className="text-slate-600 hover:text-white transition-colors p-1"><MoreVertical size={16} /></button>
      </div>

      {/* 饼图主体：在容器层应用外部投影，扇区本身保持扁平 */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-full h-full filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={data}
                innerRadius={type === 'donut' ? '65%' : '0%'}
                outerRadius="85%"
                paddingAngle={0} 
                dataKey="value"
                stroke="none" 
                strokeWidth={0}
                startAngle={90}
                endAngle={450}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="outline-none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="transition-all duration-700 hover:opacity-90"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{centerSub}</span>
            <span className="text-4xl font-black text-white tracking-tighter italic leading-none drop-shadow-md">{centerLabel}</span>
          </div>
        )}
      </div>

      {/* 图例部分 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2 px-2 z-10">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-between transition-all duration-300 ${activeIndex === idx ? 'scale-105 origin-left' : 'opacity-70'}`}
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-sm shadow-[0_0_8px_rgba(0,0,0,0.3)]" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{item.name}</span>
            </div>
            <span className="text-[13px] font-black text-white italic tracking-tighter tabular-nums">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* 背景装饰 */}
      <div className="absolute -bottom-10 -right-10 p-4 opacity-[0.03] pointer-events-none transform rotate-45 scale-150">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>
    </div>
  );
};

export default ChartCard;
