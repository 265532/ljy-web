
import React, { useState } from 'react';
import { RefreshCw, Download, Layers, CheckCircle } from 'lucide-react';

const OrderSyncPanel: React.FC = () => {
  const [activeOrder, setActiveOrder] = useState({
    id: 'CN82991022',
    status: 'IN TRANSIT',
    shipper: '智联电子制造',
    receiver: '环球商贸 (北京)',
    item: '工业级精密传感器 x12'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // 生成随机订单号
  const generateOrderId = () => {
    const prefix = 'CN';
    const suffix = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `${prefix}${suffix}`;
  };

  // 生成随机发货方
  const generateShipper = () => {
    const shippers = ['智联电子制造', '环球科技有限公司', '未来物流集团', '星辰供应链', '速达运输服务'];
    return shippers[Math.floor(Math.random() * shippers.length)];
  };

  // 生成随机收货方
  const generateReceiver = () => {
    const receivers = ['环球商贸 (北京)', '科技前沿 (上海)', '创新企业 (深圳)', '未来发展 (广州)', '智慧物流 (杭州)'];
    return receivers[Math.floor(Math.random() * receivers.length)];
  };

  // 生成随机物品描述
  const generateItem = () => {
    const items = ['工业级精密传感器 x12', '智能设备配件 x20', '电子元件套件 x50', '机械零部件 x8', '通信设备 x15'];
    return items[Math.floor(Math.random() * items.length)];
  };

  // 处理同步按钮点击
  const handleSync = () => {
    // 生成新的活动订单数据
    const newOrder = {
      id: generateOrderId(),
      status: 'IN TRANSIT',
      shipper: generateShipper(),
      receiver: generateReceiver(),
      item: generateItem()
    };
    
    // 更新活动订单
    setActiveOrder(newOrder);
    
    // 显示同步成功提示
    setShowSuccess(true);
    
    // 3秒后隐藏提示
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-[#111827] rounded-[32px] border border-slate-800 p-8 h-[600px] flex flex-col shadow-2xl relative">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Layers size={20} className="text-blue-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">订单信息同步</h3>
        </div>
        <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 hover:text-blue-400">
          <RefreshCw size={12} /> 刷新
        </button>
      </div>

      {/* 同步成功提示 */}
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black py-2 px-4 rounded-full flex items-center gap-2 shadow-lg shadow-green-500/10 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle size={14} />
          同步成功
        </div>
      )}

      <div className="flex-1 space-y-6">
        {/* Active Order Card */}
        <div className="bg-[#0B121E] border border-slate-800 rounded-3xl p-6 relative group hover:border-blue-500/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">当前活动订单</span>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded border border-emerald-500/20">{activeOrder.status}</span>
          </div>
          <div className="text-2xl font-black text-white tracking-tighter mb-4">{activeOrder.id}</div>
          <div className="space-y-2">
            <InfoItem label="发货方" value={activeOrder.shipper} />
            <InfoItem label="收货方" value={activeOrder.receiver} />
            <InfoItem label="物品描述" value={activeOrder.item} />
          </div>
        </div>

        {/* Historical Orders */}
        <div className="space-y-4">
          <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest pl-2">历史关联订单</h4>
          <HistoryCard id="CN77218841" date="2023-11-20" />
          <HistoryCard id="CN76550012" date="2023-11-15" />
        </div>
      </div>

      <button 
        onClick={handleSync}
        className="w-full mt-8 py-5 bg-blue-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-blue-600/30 uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
      >
        <Download size={16} /> 同步到工单系统
      </button>
    </div>
  );
};

const InfoItem = ({ label, value }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] text-slate-500 font-bold uppercase">{label}</span>
    <span className="text-xs text-slate-200 font-medium">{value}</span>
  </div>
);

const HistoryCard = ({ id, date }: any) => (
  <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors">
    <span className="text-xs font-black text-slate-300 group-hover:text-white">{id}</span>
    <span className="text-[10px] text-slate-600 font-bold font-mono">{date}</span>
  </div>
);

export default OrderSyncPanel;
