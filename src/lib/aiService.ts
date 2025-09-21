// 模拟AI服务
export class AIService {
  // 模拟心情分析
  static analyzeMood(content: string): string {
    const positiveWords = ['开心', '快乐', '美好', '温暖', '成就感', '乐趣', '喜欢', '很棒'];
    const negativeWords = ['沮丧', '压力', '困难', '累', '棘手', '问题'];
    const neutralWords = ['学习', '工作', '讨论', '解决', '认识'];

    const positiveCount = positiveWords.filter(word => content.includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.includes(word)).length;
    const neutralCount = neutralWords.filter(word => content.includes(word)).length;

    if (positiveCount > negativeCount) {
      return '积极';
    } else if (negativeCount > positiveCount) {
      return '消极';
    } else {
      return '平静';
    }
  }

  // 模拟生成高光语录
  static generateHighlight(content: string): string {
    const highlights = [
      "生活的美好在于与朋友分享快乐时光",
      "家人的温暖是治愈一切疲惫的良药",
      "每一次学习都是对未来的投资",
      "挑战让我们成长，温暖让我们前行",
      "在自然中寻找内心的平静",
      "知识的力量在于改变我们的认知",
      "友情是人生路上最珍贵的财富",
      "坚持学习，让每一天都充满可能"
    ];
    
    // 根据内容关键词选择合适的高光语录
    if (content.includes('朋友') || content.includes('爬山')) {
      return highlights[0];
    } else if (content.includes('妈妈') || content.includes('温暖')) {
      return highlights[1];
    } else if (content.includes('学习') || content.includes('编程')) {
      return highlights[2];
    } else if (content.includes('工作') || content.includes('挑战')) {
      return highlights[3];
    } else {
      return highlights[Math.floor(Math.random() * highlights.length)];
    }
  }

  // 模拟生成周报
  static generateWeeklyReport(diaries: any[], memories: any[], relationships: any[]): any {
    // 分析心情趋势
    const moodTrend = diaries.map(diary => ({
      date: diary.created_at.split(' ')[0],
      mood: diary.mood,
      value: diary.mood === '开心' ? 3 : diary.mood === '沮丧' ? 1 : 2
    }));

    // 分析关系图谱
    const relationshipData = relationships.map(rel => ({
      name: rel.person_name,
      value: rel.interaction_count,
      type: rel.relationship_type
    }));

    // 分析行为模式
    const behaviorPatterns = {
      likes: ['户外活动', '学习新技能', '与朋友相处', '看纪录片'],
      dislikes: ['工作压力', '复杂问题'],
      thinking: '倾向于通过家人和朋友的支持来应对挑战',
      personality: '积极向上，喜欢学习和探索新事物'
    };

    // 生成高光语录
    const weeklyHighlight = "这一周，你在挑战中成长，在温暖中前行，每一次经历都是生命中的宝贵财富。";

    // 目标进展
    const goalProgress = {
      learning: '正在学习新的编程语言，进展良好',
      workLifeBalance: '通过户外活动有效缓解工作压力',
      relationships: '与朋友和家人保持良好的互动'
    };

    return {
      moodTrend,
      relationshipData,
      behaviorPatterns,
      weeklyHighlight,
      goalProgress,
      summary: "这一周你展现了很好的学习热情和人际关系处理能力，在面对工作挑战时能够寻求支持，体现了你的智慧和韧性。"
    };
  }

  // 分析日记内容并提取信息
  static analyzeDiaryContent(content: string): {
    mood: string;
    location?: string;
    tags: string[];
    relationships: string[];
  } {
    const mood = this.analyzeMood(content);
    
    // 提取地点信息
    const locations = ['家', '公司', '山', '学校', '咖啡厅', '公园'];
    const location = locations.find(loc => content.includes(loc));
    
    // 提取标签
    const allTags = ['朋友', '家人', '工作', '学习', '户外', '编程', '纪录片', '温暖', '挑战', '回忆'];
    const tags = allTags.filter(tag => content.includes(tag));
    
    // 提取关系
    const relationships = ['朋友', '妈妈', '室友', '同事', '家人'];
    const foundRelationships = relationships.filter(rel => content.includes(rel));
    
    return {
      mood,
      location,
      tags,
      relationships: foundRelationships
    };
  }
}
