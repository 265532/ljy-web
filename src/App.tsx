
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LoginView from './components/features/auth/LoginView';

import DashboardView from './components/features/dashboard/DashboardView';
import RouteOptimizationView from './components/features/routing/RouteOptimizationView';
import TrainingOptimizationView from './components/features/training/TrainingOptimizationView';
import CarbonMonitoringView from './components/features/carbon/CarbonMonitoringView';
import SettingsView from './components/features/settings/SettingsView';
import ComplianceSecurityView from './components/features/compliance/ComplianceSecurityView';
import OrderManagementView from './components/features/orders/OrderManagementView';
import CustomerServiceView from './components/features/customer-service/CustomerServiceView';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    setActiveView('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView onViewChange={setActiveView} />;
      case 'route': return <RouteOptimizationView />;
      case 'opti': return <TrainingOptimizationView />;
      case 'carbon': return <CarbonMonitoringView onViewChange={setActiveView} />;
      case 'compliance': return <ComplianceSecurityView />;
      case 'orders': return <OrderManagementView />;
      case 'customer_service': return <CustomerServiceView />;

      case 'settings': return <SettingsView onLogout={handleLogout} />;
      default: return <DashboardView onViewChange={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#05080F] text-slate-200 overflow-hidden font-inter">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header onLogout={handleLogout} onViewChange={setActiveView} />
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
      </main>
    </div>
  );
};

export default App;
