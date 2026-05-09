
import React, { useState, useRef } from 'react';
import { MessageSquare, ChevronDown, Paperclip, Send, FileText, FileImage, X, Upload, CheckCircle } from 'lucide-react';

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

interface FeedbackFormProps {
  onAddFeedback: (feedback: FeedbackData) => void;
  onUpdateFeedbackProgress: (feedbackId: string, progress: number, status: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onAddFeedback, onUpdateFeedbackProgress }) => {
  const [feedbackType, setFeedbackType] = useState('投诉处理');
  const [urgency, setUrgency] = useState('普通');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // 不再需要本地状态，使用父组件传递的回调函数

  // 处理反馈类型变更
  const handleTypeChange = (type: string) => {
    setFeedbackType(type);
  };

  // 处理紧急程度变更
  const handleUrgencyChange = (level: string) => {
    setUrgency(level);
  };

  // 处理详细描述变更
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // 处理点击上传
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      processFiles(Array.from(selectedFiles));
    }
  };

  // 处理拖拽开始
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 处理拖拽进入
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // 处理拖拽离开
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // 处理拖拽释放
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(Array.from(droppedFiles));
    }
  };

  // 处理文件移除
  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  // 处理文件处理
  const processFiles = (fileList: File[]) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const newFiles: UploadedFile[] = [];

    fileList.forEach(file => {
      if (allowedTypes.includes(file.type)) {
        newFiles.push({
          id: Date.now() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size
        });
      }
    });

    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
    }
  };

  // 获取文件图标
  const getFileIcon = (type: string) => {
    if (type.includes('image')) {
      return <FileImage size={16} className="text-green-400" />;
    } else if (type.includes('pdf')) {
      return <FileText size={16} className="text-red-400" />;
    }
    return <FileText size={16} className="text-blue-400" />;
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // 处理提交反馈
  const handleSubmitFeedback = () => {
    // 验证表单
    if (!description.trim()) {
      alert('请填写详细描述');
      return;
    }

    // 创建新的反馈数据
    const newFeedback: FeedbackData = {
      id: 'FB-' + Date.now() + Math.floor(Math.random() * 1000),
      type: feedbackType,
      urgency: urgency,
      description: description,
      files: [...files],
      status: '待处理',
      progress: 0,
      submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    // 调用父组件的回调函数添加新反馈
    onAddFeedback(newFeedback);

    // 清空表单
    setDescription('');
    setFiles([]);
    if (descriptionRef.current) {
      descriptionRef.current.value = '';
    }

    // 显示成功提示
    setShowSuccess(true);

    // 3秒后隐藏提示
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    // 模拟进度更新
    simulateProgressUpdate(newFeedback.id);
  };

  // 模拟进度更新
  const simulateProgressUpdate = (feedbackId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (progress <= 100) {
        const status = progress === 100 ? '已完成' : 
                      progress === 75 ? '处理中' : 
                      progress === 50 ? '已受理' : '待处理';
        
        // 调用父组件的回调函数更新反馈进度
        onUpdateFeedbackProgress(feedbackId, progress, status);
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="bg-[#111827] rounded-[32px] border border-slate-800 p-8 shadow-2xl relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
          <MessageSquare size={20} />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-widest">系统内提交反馈</h3>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black py-2 px-4 rounded-full flex items-center gap-2 shadow-lg shadow-green-500/10 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle size={14} />
          提交成功
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest">反馈类型</label>
          <div className="bg-[#0B121E] border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <span>{feedbackType}</span>
            <ChevronDown size={14} className="text-slate-600" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest">紧急程度</label>
          <div className="bg-[#0B121E] border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <span>{urgency}</span>
            <ChevronDown size={14} className="text-slate-600" />
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest">详细描述</label>
        <textarea 
          ref={descriptionRef}
          placeholder="请描述您遇到的问题或建议..."
          className="w-full h-32 bg-[#0B121E] border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-all resize-none"
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest">附加凭证</label>
        
        {/* 文件上传区域 */}
        <div 
          className={`border-2 border-dashed ${isDragging ? 'border-blue-500' : 'border-slate-800'} rounded-2xl p-8 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-500/40 transition-all ${isDragging ? 'bg-blue-500/10' : 'bg-slate-900/20'}`}
          onClick={handleClickUpload}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            multiple 
            accept=".jpg,.jpeg,.png,.pdf" 
            className="hidden"
            onChange={handleFileChange}
          />
          <Paperclip size={24} className="text-slate-600 group-hover:text-blue-400 transition-colors mb-2" />
          <div className="text-xs font-bold text-slate-400">点击或拖拽文件上传凭证</div>
          <div className="text-[9px] text-slate-600 mt-1 uppercase">(JPG, PNG, PDF)</div>
        </div>

        {/* 上传文件列表 */}
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">已上传文件</div>
            <div className="bg-[#0B121E] border border-slate-800 rounded-xl p-4 space-y-3">
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <div className="text-xs font-bold text-slate-300 truncate max-w-[200px]">{file.name}</div>
                      <div className="text-[9px] text-slate-500">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="p-1.5 bg-slate-800/60 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleSubmitFeedback}
        className="w-full py-5 bg-white text-slate-900 text-sm font-black rounded-2xl shadow-xl hover:scale-[1.01] transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <Send size={16} />
        提交反馈
      </button>
    </div>
  );
};

export default FeedbackForm;
