
import React from 'react';
import { Download } from 'lucide-react';

interface ComparisonTableProps {
  isStress?: boolean;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ isStress }) => {
  // 处理PDF导出
  const handleGenerateReport = () => {
    // 创建一个新窗口，用于生成PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // 构建PDF内容
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>策略多维对比报告: 上海 → 鹿特丹</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            background: white;
            color: black;
            margin: 40px;
            padding: 40px;
            border: 1px solid #e5e7eb;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #1e293b;
          }
          h2 {
            font-size: 18px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 20px;
            color: #334155;
          }
          .subtitle {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 30px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .table th,
          .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }
          .table th {
            background-color: #f8fafc;
            font-weight: bold;
          }
          .warning {
            color: #ea580c;
          }
          .success {
            color: #059669;
          }
          .bar {
            height: 8px;
            background-color: #f1f5f9;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 8px;
          }
          .bar-fill {
            height: 100%;
          }
          .blue {
            background-color: #3b82f6;
          }
          .green {
            background-color: #10b981;
          }
          .orange {
            background-color: #f97316;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>策略多维对比报告: 上海 → 鹿特丹</h1>
          <div class="subtitle">蒙特卡洛随机模拟 N=5000 次结果分布</div>
          <div class="subtitle">生成时间: ${new Date().toLocaleString('zh-CN')}</div>
          
          <table class="table">
            <thead>
              <tr>
                <th>决策维度</th>
                <th>成本最优路径 (Base)<br/><small>基于静态历史均值</small></th>
                <th>鲁棒性推荐路径 (Robust)<br/><small>基于动态风险建模</small></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>不确定性成本范围</td>
                <td>$4,200 - $5,900<br/><small>P90 置信区间</small></td>
                <td>$4,850 - $5,150<br/><small>P90 置信区间 (更稳定)</small><br/><small class="success">↑ 优化率 14%</small></td>
              </tr>
              <tr>
                <td>不确定性交付周期</td>
                <td class="warning">22 - 35 天<br/><small>P90 区间 (高波动)</small></td>
                <td>18 - 21 天<br/><small>P90 置信区间</small></td>
              </tr>
              <tr>
                <td>稳定性评分 (Stability)</td>
                <td>62<br/><div class="bar"><div class="bar-fill orange" style="width: 62%"></div></div></td>
                <td class="success">94<br/><div class="bar"><div class="bar-fill green" style="width: 94%"></div></div></td>
              </tr>
            </tbody>
          </table>
          
          <h2>分析结论</h2>
          <p>基于蒙特卡洛随机模拟结果，鲁棒性推荐路径在稳定性和交付周期方面表现更优，虽然成本略有增加，但风险显著降低。</p>
          <p>建议在当前高不确定性环境下采用鲁棒性推荐路径，以确保供应链的稳定性和可靠性。</p>
          
          <div class="footer">
            <p>本报告由AI路径优化系统自动生成，仅供内部参考使用。</p>
            <p>报告生成时间: ${new Date().toLocaleString('zh-CN')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 写入HTML内容并触发打印
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // 等待内容加载完成后打印
    printWindow.onload = () => {
      printWindow.print();
      // 打印完成后关闭窗口
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  };

  return (
    <div className="bg-[#111827]/60 backdrop-blur-xl rounded-[24px] p-6 border border-slate-800 shadow-2xl flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white tracking-tight italic">策略多维对比: 上海 → 鹿特丹</h2>
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black rounded uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> AI 推荐中
            </div>
          </div>
          <p className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-[0.1em]">蒙特卡洛随机模拟 N=5000 次结果分布</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-black rounded-lg hover:bg-slate-800 transition-all uppercase tracking-widest"
        >
          <Download size={12} /> 生成报告
        </button>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-12 border-b border-slate-800/50 pb-4 mb-2">
          <div className="col-span-3 text-[9px] font-black text-slate-600 uppercase tracking-widest">决策维度</div>
          <div className="col-span-4 text-[10px] font-black text-blue-400 uppercase tracking-widest leading-relaxed">
            成本最优路径 (Base) <br/> <span className="text-[8px] text-slate-600 font-bold lowercase tracking-normal">基于静态历史均值</span>
          </div>
          <div className="col-span-5 text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-relaxed">
            鲁棒性推荐路径 (Robust) <br/> <span className="text-[8px] text-slate-600 font-bold lowercase tracking-normal">基于动态风险建模</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <ComparisonRow 
            label="不确定性成本范围" 
            baseValue="$4,200 - $5,900" 
            baseSub="P90 置信区间"
            robustValue="$4,850 - $5,150" 
            robustSub="P90 置信区间 (更稳定)"
            robustActive
          />
          <ComparisonRow 
            label="不确定性交付周期" 
            baseValue="22 - 35 天" 
            baseSub="P90 区间 (高波动)"
            baseWarning
            robustValue="18 - 21 天" 
            robustSub="P90 置信区间"
          />
          <ComparisonRow 
            label="稳定性评分 (Stability)" 
            baseValue="62" 
            baseType="bar"
            baseBarColor="bg-orange-500"
            robustValue="94" 
            robustType="bar"
            robustBarColor="bg-emerald-500"
            robustActive
          />
        </div>
      </div>
    </div>
  );
};

const ComparisonRow = ({ label, baseValue, baseSub, baseWarning, baseType, baseBarColor, robustValue, robustSub, robustActive, robustType, robustBarColor }: any) => (
  <div className="grid grid-cols-12 border-b border-slate-800/20 py-5 items-center group">
    <div className="col-span-3">
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
    
    <div className="col-span-4 px-4 border-r border-slate-800/50">
      <div className={`text-lg font-black ${baseWarning ? 'text-orange-500' : 'text-slate-200'} tracking-tighter`}>{baseValue}</div>
      {baseSub && <div className="text-[9px] text-slate-600 font-black mt-0.5 uppercase tracking-tighter">{baseSub}</div>}
      {baseType === 'bar' && (
        <div className="mt-3 h-1.5 w-32 bg-slate-950 rounded-full overflow-hidden">
          <div className={`h-full ${baseBarColor} w-[62%] opacity-80`} />
        </div>
      )}
    </div>

    <div className={`col-span-5 px-6 py-2 rounded-xl transition-all ${robustActive ? 'bg-emerald-500/5' : ''}`}>
      <div className="flex items-center gap-2">
        <div className="text-lg font-black text-slate-200 tracking-tighter">{robustValue}</div>
        {label === '不确定性成本范围' && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">↑ 优化率 14%</span>}
      </div>
      {robustSub && <div className="text-[9px] text-slate-600 font-black mt-0.5 uppercase tracking-tighter">{robustSub}</div>}
      {robustType === 'bar' && (
        <div className="mt-3 h-1.5 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner">
          <div className={`h-full ${robustBarColor} w-[94%] shadow-[0_0_8px_rgba(16,185,129,0.3)]`} />
        </div>
      )}
    </div>
  </div>
);

export default ComparisonTable;
