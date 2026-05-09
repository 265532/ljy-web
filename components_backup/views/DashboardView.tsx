
import React from 'react';
import StatCard from '../StatCard';
import ChartCard from '../ChartCard';
import MapWidget from '../MapWidget';
import AlertPanel from '../AlertPanel';

const DashboardView: React.FC = () => {
  return (
    <div className="p-10 space-y-10 max-w-[2000px] mx-auto w-full animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="目标达成率" value="93.1%" trend="+2.1%" type="line" color="#00F2FF" />
        <StatCard label="拥堵节点" value="14" subtitle="主要国际枢纽" type="bar" color="#F59E0B" status="warning" />
        <StatCard label="模型引擎" value="v2.4" badge="稳定版" type="none" status="success" />
        <StatCard label="平均交付周期" value="14.2d" subtitle="全球平均" type="none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ChartCard title="运输方式" type="donut" data={[{ name: '海运', value: 45, color: '#00F2FF' }, { name: '空运', value: 55, color: '#1E293B' }]} centerLabel="45%" centerSub="海运" />
        <ChartCard title="区域任务分布" type="pie" data={[{ name: '东亚', value: 40, color: '#00F2FF' }, { name: '华南', value: 30, color: '#10B981' }, { name: '华北', value: 20, color: '#F59E0B' }, { name: '全球', value: 10, color: '#8B5CF6' }]} />
        <ChartCard title="成本结构" type="donut" data={[{ name: '运输', value: 55, color: '#00F2FF' }, { name: '仓储', value: 30, color: '#F59E0B' }, { name: '其他', value: 15, color: '#1E293B' }]} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3"><MapWidget /></div>
        <div className="xl:col-span-1"><AlertPanel /></div>
      </div>
    </div>
  );
};

export default DashboardView;
