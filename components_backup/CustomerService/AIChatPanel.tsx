
import React, { useState, useRef, useEffect } from 'react';
import { Headset, User, Send, Truck, MoreHorizontal } from 'lucide-react';
import { chatApi } from '../../src/services';
import type { ChatMessage } from '../../src/services';

const AIChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '您好！我是您的智能物流管家。您可以直接输入订单号或问题关键词，如"我的快件在哪"、"运费争议"等。',
      timestamp: '10:24 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(inputText);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.response,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        orderId: response.order_id
      };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '抱歉，系统暂时无法响应，请稍后重试。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理回车键发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="bg-[#111827] rounded-[32px] border border-slate-800 p-8 flex flex-col h-[600px] shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Headset size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">7×24h 智能在线</h3>
              <p className="text-xs text-slate-500 font-bold">AI 已就绪，为您实时解答</p>
            </div>
          </div>
        </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${message.sender === 'user' ? 'bg-slate-800 text-slate-400' : 'bg-blue-600/20 border border-blue-500/20 text-blue-400'}`}>
              {message.sender === 'user' ? <User size={16} /> : <Headset size={16} />}
            </div>
            <div className={`space-y-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`p-4 rounded-2xl max-w-lg text-sm leading-relaxed ${message.sender === 'user' ? 'bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 rounded-tr-none inline-block' : 'bg-[#0B121E] border border-slate-800 rounded-tl-none'}`}>
                {message.text}
              </div>
              <div className={`text-[10px] text-slate-600 font-bold ${message.sender === 'user' ? 'mr-1' : 'ml-1'}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Headset size={16} />
            </div>
            <div className="space-y-1">
              <div className="bg-[#0B121E] border border-slate-800 p-4 rounded-2xl rounded-tl-none max-w-lg text-sm text-slate-300 leading-relaxed">
                正在思考...
              </div>
              <div className="text-[10px] text-slate-600 font-bold ml-1">
                {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-8 relative">
        <input 
          type="text" 
          placeholder="输入您的问题..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="w-full bg-[#0B121E] border border-slate-800 rounded-2xl pl-6 pr-16 py-5 text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-all shadow-inner"
        />
        <button 
          onClick={sendMessage}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AIChatPanel;
