'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WeeklyReportData {
  moodTrend: Array<{ date: string; mood: string; value: number }>;
  relationshipData: Array<{ name: string; value: number; type: string }>;
  behaviorPatterns: {
    likes: string[];
    dislikes: string[];
    thinking: string;
    personality: string;
  };
  weeklyHighlight: string;
  goalProgress: {
    learning: string;
    workLifeBalance: string;
    relationships: string;
  };
  summary: string;
}

interface WeeklyReportProps {
  onClose: () => void;
}

const COLORS = ['#000000', '#666666', '#999999', '#CCCCCC'];

export default function WeeklyReport({ onClose }: WeeklyReportProps) {
  const [reportData, setReportData] = useState<WeeklyReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/weekly-report', {
        method: 'POST',
      });
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMoodValue = (value: number) => {
    const moods = ['', '沮丧', '平静', '开心'];
    return moods[value] || '';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="text-4xl mb-4">✨</div>
          <div className="text-gray-600">Mira 正在分析你的日记...</div>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">生成周报</h3>
          <p className="text-gray-600 mb-6">
            Mira 将分析你的日记，为你生成一份专属的周报
          </p>
          <div className="space-y-3">
            <button
              onClick={generateReport}
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              生成周报
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Mira 周报</h2>
              <p className="text-sm text-gray-500">基于你的日记分析</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-8">
            {/* 高光语录 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">✨ 本周高光语录</h3>
              <p className="text-gray-700 italic text-center text-lg">
                "{reportData.weeklyHighlight}"
              </p>
            </div>

            {/* 心情趋势 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 心情趋势</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData.moodTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 3]} tickFormatter={formatMoodValue} />
                    <Tooltip formatter={(value) => formatMoodValue(Number(value))} />
                    <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 关系图谱 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 关系图谱</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportData.relationshipData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportData.relationshipData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 行为模式 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 行为模式</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">喜欢做的事</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {reportData.behaviorPatterns.likes.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">不喜欢做的事</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {reportData.behaviorPatterns.dislikes.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">思考模式</h4>
                <p className="text-sm text-gray-600">{reportData.behaviorPatterns.thinking}</p>
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">性格特征</h4>
                <p className="text-sm text-gray-600">{reportData.behaviorPatterns.personality}</p>
              </div>
            </div>

            {/* 目标进展 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 目标进展</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">学习成长</h4>
                  <p className="text-sm text-gray-600">{reportData.goalProgress.learning}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">工作生活平衡</h4>
                  <p className="text-sm text-gray-600">{reportData.goalProgress.workLifeBalance}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">人际关系</h4>
                  <p className="text-sm text-gray-600">{reportData.goalProgress.relationships}</p>
                </div>
              </div>
            </div>

            {/* 总结 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💭 Mira 的总结</h3>
              <p className="text-gray-700 leading-relaxed">{reportData.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
