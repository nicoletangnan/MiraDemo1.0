import { NextRequest, NextResponse } from 'next/server';
import { memoryDbOperations } from '@/lib/memoryDatabase';
import { AIService } from '@/lib/aiService';

export async function GET() {
  try {
    const diaries = memoryDbOperations.getAllDiaries();
    return NextResponse.json(diaries);
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return NextResponse.json({ error: 'Failed to fetch diaries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // 使用AI分析日记内容
    const analysis = AIService.analyzeDiaryContent(content);
    
    // 生成AI反馈
    const mood = AIService.analyzeMood(content);
    const highlight = AIService.generateHighlight(content);
    
    // 保存日记到数据库
    const result = memoryDbOperations.insertDiary(
      content,
      analysis.mood,
      analysis.location,
      analysis.tags.join(','),
      `心情分析：${mood}。高光语录：${highlight}`
    );

    // 更新用户记忆
    analysis.tags.forEach(tag => {
      memoryDbOperations.insertMemory('interest', tag);
    });
    
    if (analysis.location) {
      memoryDbOperations.insertMemory('location', analysis.location);
    }
    
    memoryDbOperations.insertMemory('mood', analysis.mood);

    // 更新关系数据
    analysis.relationships.forEach(person => {
      memoryDbOperations.insertRelationship(person);
    });

    return NextResponse.json({
      id: result.lastInsertRowid,
      aiFeedback: {
        mood,
        highlight
      }
    });
  } catch (error) {
    console.error('Error saving diary:', error);
    return NextResponse.json({ error: 'Failed to save diary' }, { status: 500 });
  }
}
