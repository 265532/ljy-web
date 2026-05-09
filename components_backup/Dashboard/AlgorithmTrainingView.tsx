
import React from 'react';
import { Terminal, Brain } from 'lucide-react';

const AlgorithmTrainingView: React.FC = () => {
  return (
    <div className="p-10 space-y-8 animate-in zoom-in-95 duration-500">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-[#0B121E] rounded-3xl p-8 border border-slate-900">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400">
                 <Brain size={24} />
               </div>
               <div>
                 <h2 className="text-xl font-black text-white">模型演化实验室</h2>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Deep Reinforcement Learning Cluster V3.4</p>
               </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-400">当前代数 Epochs</span>
                    <span className="text-white">14,204 / 20,000</span>
                  </div>
                  <div className="w-full h-4 bg-slate-950 rounded-xl p-1 border border-slate-900">
                    <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg w-[71%] shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-900 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">平均奖励值</div>
                    <div className="text-2xl font-black text-emerald-500">+482.4</div>
                  </div>
                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-900 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">探索率</div>
                    <div className="text-2xl font-black text-amber-500">0.05</div>
                  </div>
                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-900 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">GPU 利用率</div>
                    <div className="text-2xl font-black text-cyan-400">94.2%</div>
                  </div>
                </div>
             </div>
          </div>

          <div className="bg-black rounded-3xl p-6 border border-slate-800 h-64 overflow-hidden flex flex-col font-mono text-xs">
            <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
              <Terminal size={14} />
              <span>TRAINING_LOG_STDOUT</span>
            </div>
            <div className="flex-1 space-y-1 text-emerald-500/80 overflow-y-auto scrollbar-hide">
              <p>[09:14:22] - Epoch 14201 complete. Reward: +481.2. Loss: 0.0024</p>
              <p>[09:14:25] - Starting Epoch 14202... Hyperparameters synchronized.</p>
              <p className="text-cyan-400">[09:14:28] - CRITICAL: Policy convergence detected in cluster nodes.</p>
              <p>[09:14:31] - Backpropagating gradients to global weight server...</p>
              <p className="animate-pulse">_</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#0B121E] rounded-3xl p-6 border border-slate-900">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">硬件指标</h3>
              <div className="space-y-6">
                {[
                  { name: '节点 A', val: 92 },
                  { name: '节点 B', val: 88 },
                  { name: '存储缓冲', val: 42 },
                ].map(item => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>{item.name}</span>
                      <span className="text-slate-200">{item.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
           </div>
           <button className="w-full py-5 bg-red-500/10 border border-red-500/20 text-red-500 font-black rounded-2xl hover:bg-red-500/20 transition-all uppercase tracking-widest text-sm">
             终止训练
           </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmTrainingView;
