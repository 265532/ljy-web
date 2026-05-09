
import React, { useState, useEffect } from 'react';
import { Play, Pause, Save, LineChart as ChartIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';

const dummyData = Array.from({ length: 20 }, (_, i) => ({
  step: i,
  reward: 20 + Math.sin(i * 0.5) * 10 + Math.random() * 5,
  loss: 80 - i * 3 + Math.random() * 5
}));

const Monitor: React.FC = () => {
  const maxSteps = 1500;
  const [progress, setProgress] = useState(750);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTraining) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= maxSteps) {
            setIsTraining(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 100); // 模拟训练步进速度
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  const handleStart = () => {
    if (progress >= maxSteps) setProgress(0);
    setIsTraining(true);
  };

  const handlePause = () => {
    setIsTraining(false);
  };

  const handleSaveBest = () => {
    alert(`[系统通知] 成功捕获并保存当前最优权重！\n当前回合: ${progress}\n评估奖励: +482.4`);
  };

  const percent = ((progress / maxSteps) * 100).toFixed(1);

  return (
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white">训练监控</h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">实时奖励/损失同步</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleStart}
            disabled={isTraining}
            className={`px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              isTraining ? 'bg-blue-600/50 text-white/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95'
            }`}
          >
            <Play size={14} fill="currentColor" /> 开始
          </button>
          <button 
            onClick={handlePause}
            disabled={!isTraining}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              !isTraining ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 active:scale-95'
            }`}
          >
            <Pause size={14} fill="currentColor" /> 暂停
          </button>
          <button 
            onClick={handleSaveBest}
            className="px-6 py-2.5 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-black flex items-center gap-2 transition-all hover:bg-emerald-600/20 active:scale-95"
          >
            <Save size={14} /> 保存最优
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-2">
            <span>回合训练进度</span>
            <span className="text-slate-300 font-mono">({progress} / {maxSteps})</span>
          </div>
          <span className="text-blue-400 font-mono">{percent}%</span>
        </div>
        <div className="w-full h-3 bg-slate-900 rounded-full p-0.5 border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all duration-300 ease-linear" 
            style={{ width: `${percent}%` }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 h-48">
        <ChartBox title="奖励曲线" data={dummyData} dataKey="reward" color="#3B82F6" />
        <ChartBox title="损失函数" data={dummyData} dataKey="loss" color="#EF4444" />
      </div>
    </div>
  );
};

const ChartBox = ({ title, data, dataKey, color }: any) => (
  <div className="bg-[#0B0F19] rounded-2xl p-4 border border-slate-800 flex flex-col relative overflow-hidden group">
    <span className="text-[10px] text-slate-500 font-black uppercase mb-2 absolute top-4 left-4 z-10">{title}</span>
    <div className="flex-1 opacity-60 group-hover:opacity-100 transition-opacity mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Monitor;
