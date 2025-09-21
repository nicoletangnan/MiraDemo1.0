'use client';

import { useState, useEffect } from 'react';
import DiaryList from '@/components/DiaryList';
import DiaryDetail from '@/components/DiaryDetail';
import WriteDiary from '@/components/WriteDiary';
import BottomNavigation from '@/components/BottomNavigation';

interface Diary {
  id: number;
  content: string;
  created_at: string;
  mood: string;
  location: string;
  tags: string;
  ai_feedback: string;
}

export default function Home() {
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [showWriteDiary, setShowWriteDiary] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // 初始化模拟数据
    const initData = async () => {
      try {
        await fetch('/api/init', { method: 'POST' });
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setIsInitialized(true); // 即使失败也继续
      }
    };
    
    initData();
  }, []);

  const handleDiaryClick = (diary: Diary) => {
    setSelectedDiary(diary);
  };

  const handleCloseDiaryDetail = () => {
    setSelectedDiary(null);
  };

  const handleWriteDiary = () => {
    setShowWriteDiary(true);
  };

  const handleCloseWriteDiary = () => {
    setShowWriteDiary(false);
  };

  const handleDiarySaved = () => {
    // 日记保存后刷新列表
    setRefreshTrigger(prev => prev + 1);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#F5F1E9] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">✨</div>
          <div className="text-gray-600">正在初始化 Mira Journal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E9] pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mira Journal</h1>
          <p className="text-gray-600 text-sm">看见自我，发现变化，在 Mira 记录你的点滴。</p>
        </div>

        {/* 日记列表 */}
        <DiaryList onDiaryClick={handleDiaryClick} refreshTrigger={refreshTrigger} />

        {/* 日记详情弹窗 */}
        {selectedDiary && (
          <DiaryDetail
            diary={selectedDiary}
            onClose={handleCloseDiaryDetail}
          />
        )}

        {/* 写日记弹窗 */}
        {showWriteDiary && (
          <WriteDiary
            onClose={handleCloseWriteDiary}
            onDiarySaved={handleDiarySaved}
          />
        )}
      </div>

      {/* 底部导航 */}
      <BottomNavigation onWriteDiary={handleWriteDiary} />
    </div>
  );
}