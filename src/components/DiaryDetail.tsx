'use client';

interface Diary {
  id: number;
  content: string;
  created_at: string;
  mood: string;
  location: string;
  tags: string;
  ai_feedback: string;
}

interface DiaryDetailProps {
  diary: Diary;
  onClose: () => void;
}

export default function DiaryDetail({ diary, onClose }: DiaryDetailProps) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getMoodEmoji(diary.mood)}</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{diary.mood}</h2>
                <p className="text-sm text-gray-500">{formatDate(diary.created_at)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* 地点和标签 */}
          <div className="mb-6">
            {diary.location && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-500">📍</span>
                <span className="text-sm text-gray-600">{diary.location}</span>
              </div>
            )}
            
            {diary.tags && (
              <div className="flex flex-wrap gap-2">
                {diary.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 日记内容 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">日记内容</h3>
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {diary.content}
            </div>
          </div>

          {/* AI反馈 */}
          {diary.ai_feedback && (
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">✨ Mira 的反馈</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">
                  {diary.ai_feedback}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
