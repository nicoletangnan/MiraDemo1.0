'use client';

import { useState, useEffect } from 'react';

interface WeeklyReport {
  id: number;
  week_start: string;
  content: string;
  generated_at: string;
}

interface MiraTabProps {
  onGenerateReport: () => void;
  refreshTrigger?: number;
}

export default function MiraTab({ onGenerateReport, refreshTrigger }: MiraTabProps) {
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [refreshTrigger]);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/weekly-reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="text-center py-8">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mira</h1>
        <p className="text-gray-600 mb-6">看见自我，发现变化，在 Mira 记录你的点滴。</p>
        
        <button
          onClick={onGenerateReport}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          生成周报
        </button>
      </div>

      {/* 周报列表 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">往期周报</h2>
        
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">还没有周报</div>
            <div className="text-sm text-gray-400">写几篇日记后生成你的第一份周报吧</div>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">
                    第 {report.week_start} 周周报
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(report.generated_at)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {report.content.substring(0, 100)}...
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  点击查看完整周报
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 功能介绍 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mira 能为你做什么？</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>分析你的心情变化趋势</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>记录你的人际关系网络</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>追踪你的目标进展</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>发现你的行为模式</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>生成诗意的高光语录</span>
          </div>
        </div>
      </div>
    </div>
  );
}
