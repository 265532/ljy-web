
import React from 'react';
import { LayoutDashboard, Route, Terminal, BarChart2, Settings, Box, Zap, Leaf, ShieldCheck, ShoppingCart, MessageSquare, ShieldAlert } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: '仪表盘' },
    { id: 'route', icon: <Route size={20} />, label: '路径优化' },
    { id: 'opti', icon: <Zap size={20} />, label: '训练优化' },
    { id: 'carbon', icon: <Leaf size={20} />, label: '碳排放监控' },
    { id: 'compliance', icon: <ShieldCheck size={20} />, label: '合规与安全' },
    { id: 'orders', icon: <ShoppingCart size={20} />, label: '订单管理' },
    { id: 'customer_service', icon: <MessageSquare size={20} />, label: '客户服务' },
  ];

  return (
    <div className="w-80 bg-[#05080F] border-r border-slate-900 flex flex-col h-full shrink-0 transition-all duration-300">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-4">
        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <Box className="text-black" size={24} />
        </div>
        <span className="text-xl font-black tracking-tighter text-white uppercase italic">PathOptix</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 px-4 space-y-1.5 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
              activeView === item.id 
                ? 'bg-[#0B121E] border border-cyan-500/10 text-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <span className={activeView === item.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}>
              {item.icon}
            </span>
            <span className="font-bold text-base">{item.label}</span>
            {activeView === item.id && (
              <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            )}
          </button>
        ))}

        <div className="mt-10 px-5 pb-3 text-[10px] uppercase tracking-[0.2em] text-slate-600 font-black">系统管理</div>
        
        <button 
          onClick={() => onViewChange('settings')}
          className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 mb-1 ${
            activeView === 'settings' 
              ? 'bg-[#0B121E] border border-cyan-500/10 text-cyan-400' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Settings size={20} className={activeView === 'settings' ? 'text-cyan-400' : 'text-slate-500'} />
          <span className="font-bold text-base">系统设置</span>
          {activeView === 'settings' && (
              <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            )}
        </button>


      </nav>

      {/* Footer Progress */}
      <div className="p-6 mt-auto">
        <div className="bg-[#0B121E] rounded-xl p-5 border border-slate-900 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500">总体优化率</span>
            <span className="text-cyan-400 font-black">78%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full w-[78%] shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
