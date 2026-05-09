
import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, Save, Bell, CheckCircle } from 'lucide-react';
import ThresholdConfig from './ThresholdConfig';
import NotificationChannels from './NotificationChannels';
import MonitoringStatus from './MonitoringStatus';
import AlertHistory from './AlertHistory';

interface AlertSystemViewProps {
  onBack: () => void;
}

const AlertSystemView: React.FC<AlertSystemViewProps> = ({ onBack }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 处理保存预警配置
  const handleSaveAlertConfig = () => {
    // 模拟保存过程
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  return (
    <div className="p-10 space-y-10 animate-in slide-in-from-right-4 duration-500 max-w-6xl mx-auto pb-24">
      {/* 顶部工具栏 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2.5 bg-[#0B121E] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all hover:scale-110 shadow-xl"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight italic">系统预警与风险降级中心</h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Grid Monitoring & Alert Routing Suite</p>
          </div>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-[#0B121E] border border-slate-800 text-slate-400 text-xs font-black rounded-xl hover:text-white transition-all uppercase tracking-widest">
             <ShieldCheck size={14} /> 测试报警链路
           </button>
           <button 
             onClick={handleSaveAlertConfig}
             className="px-10 py-3 bg-blue-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest"
           >
             <Save size={14} /> 保存预警配置
           </button>
        </div>
      </div>

      {/* 主布局网格 */}
      <div className="grid grid-cols-12 gap-8">
        {/* 左侧：阈值与通知 */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <ThresholdConfig />
          <NotificationChannels />
        </div>

        {/* 右侧：状态与历史 */}
        <div className="col-span-12 lg:col-span-5 space-y-8 flex flex-col">
          <MonitoringStatus />
          <AlertHistory />
          
          <div className="mt-auto bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
             <div className="p-4 bg-blue-600/10 rounded-3xl text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <Bell size={40} />
             </div>
             <h4 className="text-sm font-black text-white uppercase tracking-widest italic">智能预警降级已就绪</h4>
             <p className="text-[10px] text-slate-500 mt-2 font-bold leading-relaxed max-w-[240px]">
               当预警等级达到 CRITICAL 时，系统将自动触发 <span className="text-blue-400 font-black">故障隔离协议 v4.0</span> 以防止连锁失效。
             </p>
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* 保存成功弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-[#0B121E] border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-emerald-500" fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">保存成功</h3>
            <p className="text-slate-400 text-sm mb-6">预警配置已保存，相关设置已更新</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSystemView;
