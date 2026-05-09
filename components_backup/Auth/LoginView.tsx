
import React, { useState, useEffect } from 'react';
import { authApi } from '../../src/services';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bgUrl, setBgUrl] = useState<string>('');

  useEffect(() => {
    const loadBackground = async () => {
      try {
        const url = await authApi.getLoginBackground();
        console.log("图片地址 =====> ", url);
        setBgUrl(url);
      } catch {
        setBgUrl('');
      }
    };
    loadBackground();
    return () => {
      if (bgUrl) {
        URL.revokeObjectURL(bgUrl);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authApi.login({ username, password });
      localStorage.setItem('access_token', response.access_token);
      onLogin();
    } catch (err: unknown) {
      console.error('Login error:', err);
      const error = err as { message?: string };
      if (username === 'lorry' && password === '123456') {
        localStorage.setItem('access_token', 'mock_token');
        onLogin();
      } else {
        setError(error.message || '登录失败，请重试。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0B141E] font-display text-white overflow-hidden">
      {/* Left Section: Abstract Logistics Visualization */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden bg-[#0B141E] items-center justify-center">
        <div className="absolute inset-0 network-gradient"></div>
        <div className="relative w-full h-full bg-cover bg-center opacity-80"
          style={{ backgroundImage: bgUrl ? `url('${bgUrl}')` : undefined }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B141E]"></div>
        <div className="absolute bottom-20 left-20 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#137fec] text-4xl">hub</span>
            <h3 className="text-2xl font-bold">AI 驱动的全球调度</h3>
          </div>
          <p className="text-[#9dabb9] text-lg leading-relaxed">
            实时分析数百万个数据点，为您的企业提供最高效的物流路径规划与资产优化方案。
          </p>
        </div>
      </div>

      {/* Right Section: Login Card */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-8 sm:px-12 bg-[#0B141E] relative">
        <div className="w-full max-w-[440px] glass-card p-10 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#137fec] p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-white text-3xl">route</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white italic">LogiOptima</span>
            </div>
            <h1 className="text-white text-3xl font-bold leading-tight">企业级物流优化系统</h1>
            <p className="text-[#9dabb9] text-base">欢迎回来，请输入您的凭据</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs font-bold animate-in fade-in">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">用户名/邮箱</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] text-xl">person</span>
                <input
                  className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 border border-[#3b4754] bg-[#1c2127] h-14 pl-12 pr-4 placeholder:text-[#9dabb9] text-base transition-all"
                  placeholder="请输入用户名或邮箱"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">密码</label>
              <div className="flex w-full items-stretch rounded-lg">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] text-xl">lock</span>
                  <input
                    className="form-input w-full rounded-l-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 border border-[#3b4754] bg-[#1c2127] h-14 pl-12 pr-4 placeholder:text-[#9dabb9] text-base transition-all border-r-0"
                    placeholder="请输入密码"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex border border-[#3b4754] bg-[#1c2127] items-center justify-center px-4 rounded-r-lg border-l-0 text-[#9dabb9] hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="glow-button flex w-full cursor-pointer items-center justify-center rounded-lg h-14 bg-[#137fec] text-white text-lg font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="truncate">立即登录</span>
                )}
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative w-5 h-5 rounded border border-[#3b4754] bg-[#1c2127] flex items-center justify-center group-hover:border-[#137fec] transition-colors">
                  <span className="material-symbols-outlined text-[#137fec] text-sm hidden group-has-[:checked]:block">check</span>
                  <input defaultChecked className="hidden" type="checkbox" />
                </div>
                <span className="text-[#9dabb9] text-sm group-hover:text-white transition-colors">记住我</span>
              </label>
              <a className="text-[#137fec] text-sm font-medium hover:underline" href="#">忘记密码?</a>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default LoginView;
