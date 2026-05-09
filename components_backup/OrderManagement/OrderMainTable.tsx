
import React, { useState, useEffect } from 'react';
import { MoreVertical, ChevronRight, RefreshCw } from 'lucide-react';
import CapacityMatchingModal from './CapacityMatchingModal';
import CapacityAnalysisModal from './CapacityAnalysisModal';
import CarbonMonitoringModal from './CarbonMonitoringModal';
import { orderApi } from '../../src/services';
import type { Order, OrderFilters } from '../../src/services';

interface OrderMainTableProps {
  searchKeyword?: string;
  isSearching?: boolean;
  filterStatus?: string | null;
  filterDateRange?: string | null;
  isFiltering?: boolean;
}

const OrderMainTable: React.FC<OrderMainTableProps> = ({ 
  searchKeyword = '', 
  isSearching = false, 
  filterStatus = null, 
  filterDateRange = null, 
  isFiltering = false 
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isCarbonModalOpen, setIsCarbonModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteMenu, setShowDeleteMenu] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters: OrderFilters = {};
      if (searchKeyword.trim()) {
        filters.keyword = searchKeyword;
      }
      if (isFiltering) {
        if (filterStatus) filters.status = filterStatus;
        if (filterDateRange) filters.dateRange = filterDateRange;
      }

      const response = await orderApi.getOrders(filters);
      setOrders(response.orders.slice(0, 10));
    } catch (err) {
      console.error('获取订单数据时发生错误:', err);
      setError('获取订单数据失败，请稍后重试');

      let defaultOrders: Order[] = [
        { id: 'ORD-94021', customer_name: 'Global Logi Co.', date: '2024-03-24', amount: '$14,204.00', status: '运输中', status_color: 'blue' },
        { id: 'ORD-94018', customer_name: 'TechHub Nanjing', date: '2024-03-24', amount: '$5,820.00', status: '已处理', status_color: 'green' },
        { id: 'ORD-93998', customer_name: 'EuroCargo Ltd', date: '2024-03-23', amount: '$22,400.50', status: '异常延误', status_color: 'orange' },
        { id: 'ORD-93982', customer_name: 'APAC Retailers', date: '2024-03-23', amount: '$1,240.00', status: '已妥投', status_color: 'gray' },
        { id: 'ORD-93977', customer_name: 'Z-Global Hub', date: '2024-03-22', amount: '$8,940.00', status: '待分配', status_color: 'purple' },
      ];

      if (searchKeyword.trim()) {
        defaultOrders = defaultOrders.filter(order =>
          order.id.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      if (isFiltering && filterStatus) {
        defaultOrders = defaultOrders.filter(order => order.status === filterStatus);
      }

      setOrders(defaultOrders);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取订单数据，当搜索关键词、搜索状态或过滤器条件变化时重新获取
  useEffect(() => {
    fetchOrders();
  }, [searchKeyword, isSearching, filterStatus, filterDateRange, isFiltering]);

  // 根据状态颜色获取对应的CSS类
  const getStatusStyles = (statusColor: string) => {
    switch (statusColor) {
      case 'blue':
        return { color: 'text-blue-400', bg: 'bg-blue-500/10' };
      case 'green':
        return { color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
      case 'orange':
        return { color: 'text-amber-500', bg: 'bg-amber-500/10' };
      case 'gray':
        return { color: 'text-slate-500', bg: 'bg-slate-900' };
      case 'purple':
        return { color: 'text-purple-400', bg: 'bg-purple-500/10' };
      default:
        return { color: 'text-slate-400', bg: 'bg-slate-800/50' };
    }
  };

  const handleOpenMatching = (id: string) => {
    setSelectedOrderId(id);
    setIsMatchingModalOpen(true);
  };

  const handleOpenAnalysis = (id: string) => {
    setSelectedOrderId(id);
    setIsAnalysisModalOpen(true);
  };

  const handleOpenCarbon = (id: string) => {
    setSelectedOrderId(id);
    setIsCarbonModalOpen(true);
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('确定要删除这个订单吗？')) {
      return;
    }

    try {
      await orderApi.deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      setShowDeleteMenu(null);
    } catch (err) {
      alert('删除订单失败，请稍后重试');
      console.error('Error deleting order:', err);
    }
  };

  return (
    <div className="bg-[#0B121E] border border-slate-800 rounded-3xl p-8 shadow-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">活跃订单列表</h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            <RefreshCw size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">刷新</span>
          </button>
          <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">全部导出</button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-500 text-sm font-medium">加载订单数据中...</div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-red-400 text-sm font-medium">{error}</div>
            <button 
              onClick={fetchOrders}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              重试
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">订单 ID</th>
                <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">客户名称</th>
                <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">日期</th>
                <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">金额</th>
                <th className="pb-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">当前状态</th>
                <th className="pb-4 text-right pr-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">快速操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/20">
              {orders.map((order, idx) => {
                const statusStyles = getStatusStyles(order.status_color);
                return (
                  <tr key={idx} className="group hover:bg-slate-800/10 cursor-pointer transition-colors">
                    <td className="py-6 font-mono text-xs text-blue-400 font-black">{order.id}</td>
                    <td className="py-6 text-sm font-bold text-slate-200">{order.customer_name}</td>
                    <td className="py-6 text-xs text-slate-500 font-medium tracking-tighter">{order.date}</td>
                    <td className="py-6 text-xs font-black text-white">{order.amount}</td>
                    <td className="py-6">
                      <span className={`px-3 py-1 ${statusStyles.bg} border border-slate-800/50 rounded-full text-[10px] font-black ${statusStyles.color}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <div className="flex items-center justify-end gap-2 pr-2">
                        <button 
                          onClick={() => handleOpenMatching(order.id)}
                          className="flex flex-col items-center justify-center w-[54px] h-[54px] border border-amber-500/40 rounded-xl text-amber-500 hover:bg-amber-500/10 transition-all group/btn"
                        >
                          <span className="text-[10px] font-black leading-tight tracking-tighter">匹配运</span>
                          <span className="text-[10px] font-black leading-tight tracking-tighter">力</span>
                        </button>
                        
                        <button 
                          onClick={() => handleOpenAnalysis(order.id)}
                          className="flex flex-col items-center justify-center w-[54px] h-[54px] border border-blue-500/40 rounded-xl text-blue-400 hover:bg-blue-500/10 transition-all"
                        >
                          <span className="text-[10px] font-black leading-tight tracking-tighter">运力分</span>
                          <span className="text-[10px] font-black leading-tight tracking-tighter">析</span>
                        </button>
                        
                        <button 
                          onClick={() => handleOpenCarbon(order.id)}
                          className="flex flex-col items-center justify-center w-[54px] h-[54px] border border-slate-700 rounded-xl text-slate-400 hover:bg-slate-800 transition-all"
                        >
                          <span className="text-[10px] font-black leading-tight tracking-tighter">碳排监</span>
                          <span className="text-[10px] font-black leading-tight tracking-tighter">测</span>
                        </button>

                        <div className="relative group">
                          <button 
                            onClick={() => setShowDeleteMenu(showDeleteMenu === order.id ? null : order.id)}
                            className="p-2 ml-2 text-slate-600 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                          >
                            <MoreVertical size={18} />
                          </button>
                          {showDeleteMenu === order.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden">
                              <button 
                                onClick={() => deleteOrder(order.id)}
                                className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all flex items-center gap-2"
                              >
                                <span className="w-4 h-4 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                </span>
                                <span className="font-medium">删除订单</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <CapacityMatchingModal 
        isOpen={isMatchingModalOpen} 
        onClose={() => setIsMatchingModalOpen(false)} 
        orderId={selectedOrderId || 'ORD-2024-001'}
      />

      <CapacityAnalysisModal 
        isOpen={isAnalysisModalOpen} 
        onClose={() => setIsAnalysisModalOpen(false)} 
        orderId={selectedOrderId || 'ORD-2024-001'}
      />

      <CarbonMonitoringModal 
        isOpen={isCarbonModalOpen} 
        onClose={() => setIsCarbonModalOpen(false)} 
        orderId={selectedOrderId || 'ORD-2024-001'}
      />
    </div>
  );
};

export default OrderMainTable;
