// 内存数据库，用于演示部署
interface Diary {
  id: number;
  content: string;
  created_at: string;
  mood: string;
  location: string;
  tags: string;
  ai_feedback: string;
}

interface UserMemory {
  id: number;
  memory_type: string;
  content: string;
  frequency: number;
  last_updated: string;
}

interface Relationship {
  id: number;
  person_name: string;
  interaction_count: number;
  relationship_type: string;
  notes: string;
  last_mentioned: string;
}

interface WeeklyReport {
  id: number;
  week_start: string;
  content: string;
  generated_at: string;
}

// 内存存储
let diaries: Diary[] = [];
let userMemories: UserMemory[] = [];
let relationships: Relationship[] = [];
let weeklyReports: WeeklyReport[] = [];

let diaryIdCounter = 1;
let memoryIdCounter = 1;
let relationshipIdCounter = 1;
let reportIdCounter = 1;

export const memoryDbOperations = {
  // 日记相关
  insertDiary: (content: string, mood?: string, location?: string, tags?: string, aiFeedback?: string) => {
    const diary: Diary = {
      id: diaryIdCounter++,
      content,
      created_at: new Date().toISOString(),
      mood: mood || '',
      location: location || '',
      tags: tags || '',
      ai_feedback: aiFeedback || ''
    };
    diaries.unshift(diary); // 添加到开头
    return { lastInsertRowid: diary.id };
  },

  getAllDiaries: () => {
    return diaries;
  },

  getDiaryById: (id: number) => {
    return diaries.find(diary => diary.id === id);
  },

  // 用户记忆相关
  insertMemory: (memoryType: string, content: string) => {
    const existingMemory = userMemories.find(m => m.memory_type === memoryType && m.content === content);
    if (existingMemory) {
      existingMemory.frequency++;
      existingMemory.last_updated = new Date().toISOString();
      return { lastInsertRowid: existingMemory.id };
    } else {
      const memory: UserMemory = {
        id: memoryIdCounter++,
        memory_type: memoryType,
        content,
        frequency: 1,
        last_updated: new Date().toISOString()
      };
      userMemories.push(memory);
      return { lastInsertRowid: memory.id };
    }
  },

  getMemoriesByType: (memoryType: string) => {
    return userMemories.filter(m => m.memory_type === memoryType).sort((a, b) => b.frequency - a.frequency);
  },

  // 关系相关
  insertRelationship: (personName: string, relationshipType?: string, notes?: string) => {
    const existingRel = relationships.find(r => r.person_name === personName);
    if (existingRel) {
      existingRel.interaction_count++;
      existingRel.relationship_type = relationshipType || existingRel.relationship_type;
      existingRel.notes = notes || existingRel.notes;
      existingRel.last_mentioned = new Date().toISOString();
      return { lastInsertRowid: existingRel.id };
    } else {
      const relationship: Relationship = {
        id: relationshipIdCounter++,
        person_name: personName,
        interaction_count: 1,
        relationship_type: relationshipType || '',
        notes: notes || '',
        last_mentioned: new Date().toISOString()
      };
      relationships.push(relationship);
      return { lastInsertRowid: relationship.id };
    }
  },

  getAllRelationships: () => {
    return relationships.sort((a, b) => b.interaction_count - a.interaction_count);
  },

  // 周报相关
  insertWeeklyReport: (weekStart: string, content: string) => {
    const report: WeeklyReport = {
      id: reportIdCounter++,
      week_start: weekStart,
      content,
      generated_at: new Date().toISOString()
    };
    weeklyReports.unshift(report); // 添加到开头
    return { lastInsertRowid: report.id };
  },

  getAllWeeklyReports: () => {
    return weeklyReports;
  },

  getWeeklyReportByWeek: (weekStart: string) => {
    return weeklyReports.find(report => report.week_start === weekStart);
  },

  // 清空所有数据（用于初始化）
  clearAllData: () => {
    diaries = [];
    userMemories = [];
    relationships = [];
    weeklyReports = [];
    diaryIdCounter = 1;
    memoryIdCounter = 1;
    relationshipIdCounter = 1;
    reportIdCounter = 1;
  }
};
