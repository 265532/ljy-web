
import React, { useState, useEffect } from 'react';
import FileManagement from './FileManagement';
import SecurityMonitoring from './SecurityMonitoring';
import AuditChange from './AuditChange';
import ReportExport from './ReportExport';
import RegionalCompliance from './RegionalCompliance';

const ComplianceSecurityView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-700 bg-[#05080F]">
      {/* 第一行：文件管理、监测引擎、监控得分 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <FileManagement />
        </div>
        <div className="lg:col-span-6">
          <SecurityMonitoring />
        </div>
        <div className="lg:col-span-3">
          <div className="h-full bg-[#0B121E] border border-slate-800/60 rounded-3xl p-6 relative overflow-hidden group shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-indigo-400"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">智能监控与得分</h3>
            </div>
            <SecurityScoreGauge />
          </div>
        </div>
      </div>

      {/* 第二行：数据变更审计、报告生成 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <AuditChange />
        </div>
        <div className="lg:col-span-6">
          <ReportExport />
        </div>
      </div>

      {/* 第三行：区域合规数据报告 */}
      <RegionalCompliance />
    </div>
  );
};

const SecurityScoreGauge = () => {
  const [score, setScore] = useState(92);
  const [keyword, setKeyword] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [progress, setProgress] = useState(80);
  const [showSuccess, setShowSuccess] = useState(false);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    let auditInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isAuditing) {
      // 重置进度
      setProgress(0);
      
      // 模拟审计过程，缓慢更新分数
      let currentScore = score;
      auditInterval = setInterval(() => {
        // 随机波动分数
        const change = Math.random() * 4 - 2; // -2 到 2 之间的随机数
        let newScore = Math.max(70, Math.min(98, currentScore + change));
        setScore(Math.round(newScore));
        currentScore = newScore;
      }, 300);

      // 更新进度条，确保10秒内完成
      let currentProgress = 0;
      // 10秒 = 10000毫秒，每次更新10%，需要10次更新
      const interval = 10000 / 10; // 1000毫秒
      progressInterval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(auditInterval);
          clearInterval(progressInterval);
          setIsAuditing(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
      }, interval);
    }

    return () => {
      if (auditInterval) clearInterval(auditInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isAuditing]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleStartAudit = () => {
    if (keyword.trim() && !isAuditing) {
      setIsAuditing(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 优化后的仪表盘容器 */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* 背景光晕 */}
        <div className="absolute inset-8 bg-emerald-500/5 blur-[35px] rounded-full opacity-60" />
        
        <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90 overflow-visible drop-shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          {/* 背景轨道 */}
          <circle 
            cx="80" cy="80" r={radius} 
            stroke="#1e293b" strokeWidth="10" 
            fill="transparent" 
            strokeOpacity="0.3"
          />
          {/* 进度轨道 */}
          <circle 
            cx="80" cy="80" r={radius} 
            stroke="#10b981" strokeWidth="10" 
            fill="transparent" 
            className="transition-all duration-1000 ease-out" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
          />
        </svg>
        
        {/* 文字排版 - 匹配系统高标准 UI */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span className="text-5xl font-black text-white tracking-tighter italic drop-shadow-lg">
              {score}
            </span>
            <span className="text-lg font-bold text-emerald-500 ml-0.5">%</span>
          </div>
          <div className="flex flex-col items-center mt-2">
            <div className="h-px w-6 bg-slate-800 mb-2 opacity-60" />
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] whitespace-nowrap">安全合规</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="监控关键词..." 
            value={keyword}
            onChange={handleKeywordChange}
            className="w-full bg-[#05080F] border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        <button 
          onClick={handleStartAudit}
          disabled={isAuditing || !keyword.trim()}
          className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all ${
            isAuditing 
              ? 'bg-[#10b981]/5 border border-[#10b981]/10 text-[#10b981]/50 cursor-not-allowed' 
              : !keyword.trim()
              ? 'bg-[#10b981]/5 border border-[#10b981]/10 text-[#10b981]/50 cursor-not-allowed' 
              : 'bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/20 shadow-emerald-500/5'
          }`}
        >
          {isAuditing ? '审计中...' : '开启自动审计'}
        </button>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <span>实时扫描进度</span>
            <span className="text-slate-300">{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
            <div 
              className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {showSuccess && (
          <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="text-[10px] font-bold text-emerald-400">提交成功</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceSecurityView;
