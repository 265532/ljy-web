
import React from 'react';
import { Shield, Bell, Database, Globe, User } from 'lucide-react';

const SettingsView: React.FC = () => {
  const sections = [
    { icon: <User size={20} />, title: '个人账户', desc: '管理您的个人信息和登录安全' },
    { icon: <Globe size={20} />, title: '全球区域配置', desc: '设置主要运营港口和优先调度区域' },
    { icon: <Database size={20} />, title: '数据同步', desc: '配置本地与云端模型的同步频率' },
    { icon: <Bell size={20} />, title: '预警系统', desc: '管理延迟、拥堵及风险的通知阈值' },
    { icon: <Shield size={20} />, title: '模型权限', desc: '配置团队成员对模型训练的访问级别' },
  ];

  return (
    <div className="p-10 space-y-10 animate-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-white">系统设置</h2>
        <p className="text-slate-500 mt-2 font-medium">全局配置您的 PATHOPTIX 优化引擎</p>
      </div>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-[#0B121E] border border-slate-900 rounded-3xl p-6 flex items-center justify-between group hover:border-cyan-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all">
                {section.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{section.title}</h4>
                <p className="text-sm text-slate-500">{section.desc}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400">
              →
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 border-t border-slate-900 flex justify-between items-center">
        <div className="text-xs text-slate-600 font-bold uppercase tracking-widest">Version Build: 2.4.8-Stable</div>
        <button className="px-10 py-4 bg-cyan-500 text-black font-black rounded-2xl shadow-xl shadow-cyan-500/20 active:scale-95 transition-all">保存全部更改</button>
      </div>
    </div>
  );
};

export default SettingsView;
