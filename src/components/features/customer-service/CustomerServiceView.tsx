
import React, { useState } from 'react';
import AIChatPanel from './AIChatPanel';
import OrderSyncPanel from './OrderSyncPanel';
import FeedbackForm from './FeedbackForm';
import ProgressTracking from './ProgressTracking';
import FeedbackStatusTable from './FeedbackStatusTable';
import UpdatesFeed from './UpdatesFeed';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
}

interface FeedbackData {
  id: string;
  type: string;
  urgency: string;
  description: string;
  files: UploadedFile[];
  status: string;
  progress: number;
  submittedAt: string;
}

const CustomerServiceView: React.FC = () => {
  // 共享的反馈数据状态
  const [feedbackList, setFeedbackList] = useState<FeedbackData[]>([]);

  // 处理添加新反馈
  const handleAddFeedback = (newFeedback: FeedbackData) => {
    setFeedbackList([newFeedback, ...feedbackList]);
  };

  // 处理更新反馈进度
  const handleUpdateFeedbackProgress = (feedbackId: string, progress: number, status: string) => {
    setFeedbackList(prevList => 
      prevList.map(item => 
        item.id === feedbackId 
          ? { ...item, progress, status } 
          : item
      )
    );
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 max-w-[1800px] mx-auto w-full">
      {/* 第一行：智能在线聊天 & 订单同步 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <AIChatPanel />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <OrderSyncPanel />
        </div>
      </div>

      {/* 第二行：反馈提交 & 进度跟踪 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-6">
          <FeedbackForm 
            onAddFeedback={handleAddFeedback}
            onUpdateFeedbackProgress={handleUpdateFeedbackProgress}
          />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <ProgressTracking feedbackList={feedbackList} />
        </div>
      </div>

      {/* 第三行：状态列表 & 更新公示 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-6">
          <FeedbackStatusTable />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <UpdatesFeed />
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceView;
