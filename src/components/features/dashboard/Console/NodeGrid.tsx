
import React from 'react';

const NodeGrid: React.FC = () => {
  const nodes = [
    { id: 'HK-01', load: 85, status: 'online' },
    { id: 'SG-04', load: 42, status: 'online' },
    { id: 'SH-09', load: 94, status: 'warning' },
    { id: 'NY-02', load: 12, status: 'idle' },
  ];

  return (
    <div className="space-y-4">
      {nodes.map(node => (
        <div key={node.id} className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase">
            <span className="text-slate-500 tracking-tighter">Node Cluster: {node.id}</span>
            <span className={node.load > 90 ? 'text-amber-500' : 'text-slate-300'}>{node.load}%</span>
          </div>
          <div className="h-1.5 bg-slate-950 rounded-full flex overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                node.load > 90 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                node.load < 20 ? 'bg-slate-700' : 'bg-cyan-500'
              }`} 
              style={{ width: `${node.load}%` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NodeGrid;
