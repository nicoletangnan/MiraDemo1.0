'use client';

import { useState } from 'react';
import MiraTab from '@/components/MiraTab';
import WeeklyReport from '@/components/WeeklyReport';
import BottomNavigation from '@/components/BottomNavigation';

export default function MiraPage() {
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGenerateReport = () => {
    setShowWeeklyReport(true);
  };

  const handleCloseWeeklyReport = () => {
    setShowWeeklyReport(false);
    // 关闭周报弹窗后刷新周报列表
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <MiraTab onGenerateReport={handleGenerateReport} refreshTrigger={refreshTrigger} />
      </div>

      {/* 周报弹窗 */}
      {showWeeklyReport && (
        <WeeklyReport onClose={handleCloseWeeklyReport} />
      )}

      {/* 底部导航 */}
      <BottomNavigation onWriteDiary={() => {}} />
    </div>
  );
}
