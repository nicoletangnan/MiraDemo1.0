import { NextResponse } from 'next/server';
import { memoryDbOperations } from '@/lib/memoryDatabase';
import { mockDiaries } from '@/lib/mockData';

export async function POST() {
  try {
    // 清空现有数据
    memoryDbOperations.clearAllData();

    // 插入模拟日记
    mockDiaries.forEach(diary => {
      memoryDbOperations.insertDiary(
        diary.content,
        diary.mood,
        diary.location,
        diary.tags,
        diary.aiFeedback
      );
    });

    // 插入一些模拟的用户记忆
    const mockMemories = [
      { type: 'mood', content: '喜欢户外活动，特别是爬山' },
      { type: 'mood', content: '工作压力大时会感到沮丧' },
      { type: 'mood', content: '学习新技能时很有成就感' },
      { type: 'location', content: '经常在家学习' },
      { type: 'location', content: '喜欢去山上放松' },
      { type: 'interest', content: '对编程和新技术感兴趣' },
      { type: 'interest', content: '喜欢看纪录片' },
      { type: 'personality', content: '遇到困难时会寻求家人支持' },
      { type: 'personality', content: '喜欢和朋友一起活动' },
      { type: 'goal', content: '想要学习新的编程语言' },
      { type: 'goal', content: '希望平衡工作和生活' }
    ];

    mockMemories.forEach(memory => {
      memoryDbOperations.insertMemory(memory.type, memory.content);
    });

    // 插入一些模拟的关系数据
    const mockRelationships = [
      { name: '朋友', type: '友谊', notes: '经常一起户外活动' },
      { name: '妈妈', type: '家人', notes: '给予温暖和支持' },
      { name: '室友', type: '室友', notes: '一起看纪录片' },
      { name: '同事', type: '工作', notes: '一起讨论项目问题' }
    ];

    mockRelationships.forEach(rel => {
      memoryDbOperations.insertRelationship(rel.name, rel.type, rel.notes);
    });

    return NextResponse.json({ message: 'Mock data initialized successfully' });
  } catch (error) {
    console.error('Error initializing mock data:', error);
    return NextResponse.json({ error: 'Failed to initialize mock data' }, { status: 500 });
  }
}
