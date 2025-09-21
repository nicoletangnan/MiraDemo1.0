'use client';

import { useState } from 'react';

interface WriteDiaryProps {
  onClose: () => void;
  onDiarySaved: () => void;
}

interface AIFeedback {
  mood: string;
  highlight: string;
}

export default function WriteDiary({ onClose, onDiarySaved }: WriteDiaryProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/diaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const result = await response.json();
        setAiFeedback(result.aiFeedback);
        setShowFeedback(true);
        setContent('');
        onDiarySaved();
      }
    } catch (error) {
      console.error('Failed to save diary:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    setAiFeedback(null);
    onClose();
  };

  const getMoodEmoji = (mood: string) => {
    const moodEmojis: { [key: string]: string } = {
      '积极': '😄',
      '消极': '😞',
      '平静': '😐'
    };
    return moodEmojis[mood] || '😊';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">写日记</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* 写日记表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                今天发生了什么？
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="记录你的想法、感受和经历..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                取消
              </button>
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '保存中...' : '保存日记'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* AI反馈弹窗 */}
      {showFeedback && aiFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Mira 的反馈
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-lg">{getMoodEmoji(aiFeedback.mood)}</span>
                    <span className="text-sm font-medium text-gray-700">心情分析</span>
                  </div>
                  <p className="text-gray-600">{aiFeedback.mood}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">高光语录</div>
                  <p className="text-gray-600 italic">"{aiFeedback.highlight}"</p>
                </div>
              </div>
              
              <button
                onClick={handleCloseFeedback}
                className="mt-6 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
