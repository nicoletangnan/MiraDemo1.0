'use client';

import { useState, useEffect } from 'react';

interface Diary {
  id: number;
  content: string;
  created_at: string;
  mood: string;
  location: string;
  tags: string;
  ai_feedback: string;
}

interface DiaryListProps {
  onDiaryClick: (diary: Diary) => void;
  refreshTrigger?: number;
}

export default function DiaryList({ onDiaryClick, refreshTrigger }: DiaryListProps) {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiaries();
  }, [refreshTrigger]);

  const fetchDiaries = async () => {
    try {
      const response = await fetch('/api/diaries');
      const data = await response.json();
      setDiaries(data);
    } catch (error) {
      console.error('Failed to fetch diaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getMoodEmoji = (mood: string) => {
    const moodEmojis: { [key: string]: string } = {
      '开心': '😊',
      '沮丧': '😔',
      '充实': '😌',
      '积极': '😄',
      '消极': '😞',
      '平静': '😐'
    };
    return moodEmojis[mood] || '😊';
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {diaries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">还没有日记</div>
          <div className="text-sm text-gray-400">开始记录你的点滴吧</div>
        </div>
      ) : (
        diaries.map((diary) => (
          <div
            key={diary.id}
            onClick={() => onDiaryClick(diary)}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getMoodEmoji(diary.mood)}</span>
                <span className="text-sm font-medium text-gray-700">{diary.mood}</span>
                {diary.location && (
                  <span className="text-xs text-gray-500">📍 {diary.location}</span>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {formatDate(diary.created_at)}
              </span>
            </div>
            
            <div className="text-gray-800 mb-3 leading-relaxed">
              {truncateContent(diary.content)}
            </div>
            
            {diary.tags && (
              <div className="flex flex-wrap gap-1 mb-2">
                {diary.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-xs text-gray-400">
              点击查看详情
            </div>
          </div>
        ))
      )}
    </div>
  );
}
