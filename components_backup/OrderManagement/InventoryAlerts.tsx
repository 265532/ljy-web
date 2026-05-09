
import React from 'react';
import { Database, AlertTriangle } from 'lucide-react';

const InventoryAlerts: React.FC = () => {
  return (
    <div className="bg-[#0B121E] border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-amber-500"><Database size={18} /></div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">库存周转预警</h3>
        </div>
      </div>

      <div className="space-y-4">
        <AlertItem label="SKU-8204-CH" warehouse="华东一号仓" level="L-CRITICAL" color="text-red-500" val={8} />
        <AlertItem label="SKU-1022-US" warehouse="LA-EDGE-HUB" level="M-WARNING" color="text-amber-500" val={24} />
        <AlertItem label="SKU-4402-EU" warehouse="ROTTERDAM_04" level="NORMAL" color="text-slate-500" val={72} />
      </div>
    </div>
  );
};

const AlertItem = ({ label, warehouse, level, color, val }: any) => (
  <div className="p-4 bg-[#05080F] border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-1.5 h-8 rounded-full ${color.replace('text', 'bg')}`} />
      <div>
        <div className="text-xs font-black text-white">{label}</div>
        <div className="text-[10px] text-slate-500 font-bold uppercase">{warehouse}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-xs font-black text-white">{val}%</div>
      <div className={`text-[9px] font-black uppercase tracking-widest ${color}`}>{level}</div>
    </div>
  </div>
);

export default InventoryAlerts;
