import { dbOperations } from './database';

// 模拟的日记数据
export const mockDiaries = [
  {
    content: "今天和朋友们一起去爬山了，虽然很累但是心情特别好。山顶的风景真的很美，让我想起了小时候和家人一起旅行的时光。最近工作压力有点大，但是这样的户外活动让我重新找到了生活的乐趣。",
    mood: "开心",
    location: "山",
    tags: "朋友,户外,回忆",
    aiFeedback: "今天你展现出了对自然的热爱和对友情的珍视，这种积极的心态很珍贵。"
  },
  {
    content: "今天在公司遇到了一个很棘手的项目问题，和同事讨论了很久都没有找到好的解决方案。晚上回家后心情有点沮丧，但是妈妈给我做了我最爱吃的菜，瞬间感觉温暖了很多。",
    mood: "沮丧",
    location: "公司,家",
    tags: "工作,家人,温暖",
    aiFeedback: "工作上的挑战是成长的机会，而家人的温暖是你最坚实的后盾。"
  },
  {
    content: "今天开始学习一门新的编程语言，虽然刚开始有点困难，但是每解决一个小问题都让我很有成就感。晚上和室友一起看了一部很棒的纪录片，关于宇宙的奥秘，让我对这个世界有了新的认识。",
    mood: "充实",
    location: "家",
    tags: "学习,编程,室友,纪录片",
    aiFeedback: "你的学习热情和对知识的渴望让人印象深刻，这种持续成长的心态很棒。"
  }
];

// 初始化模拟数据
export function initMockData() {
  // 清空现有数据
  const db = require('./database').default;
  db.exec('DELETE FROM diaries');
  db.exec('DELETE FROM user_memories');
  db.exec('DELETE FROM relationships');
  db.exec('DELETE FROM weekly_reports');

  // 插入模拟日记
  mockDiaries.forEach(diary => {
    dbOperations.insertDiary(
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
    dbOperations.insertMemory(memory.type, memory.content);
  });

  // 插入一些模拟的关系数据
  const mockRelationships = [
    { name: '朋友', type: '友谊', notes: '经常一起户外活动' },
    { name: '妈妈', type: '家人', notes: '给予温暖和支持' },
    { name: '室友', type: '室友', notes: '一起看纪录片' },
    { name: '同事', type: '工作', notes: '一起讨论项目问题' }
  ];

  mockRelationships.forEach(rel => {
    dbOperations.insertRelationship(rel.name, rel.type, rel.notes);
  });
}
