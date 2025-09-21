import { NextResponse } from 'next/server';
import { memoryDbOperations } from '@/lib/memoryDatabase';
import { AIService } from '@/lib/aiService';

export async function POST() {
  try {
    // 获取所有日记
    const diaries = memoryDbOperations.getAllDiaries();
    
    // 获取用户记忆
    const memories = [
      ...memoryDbOperations.getMemoriesByType('mood'),
      ...memoryDbOperations.getMemoriesByType('location'),
      ...memoryDbOperations.getMemoriesByType('interest'),
      ...memoryDbOperations.getMemoriesByType('personality'),
      ...memoryDbOperations.getMemoriesByType('goal')
    ];
    
    // 获取关系数据
    const relationships = memoryDbOperations.getAllRelationships();
    
    // 生成周报
    const reportData = AIService.generateWeeklyReport(diaries, memories, relationships);
    
    // 保存周报到数据库
    const weekStart = new Date().toISOString().split('T')[0]; // 使用当前日期作为周开始
    const reportContent = JSON.stringify(reportData);
    
    const result = memoryDbOperations.insertWeeklyReport(weekStart, reportContent);
    console.log('Weekly report saved with ID:', result.lastInsertRowid);
    
    return NextResponse.json(reportData);
  } catch (error) {
    console.error('Error generating weekly report:', error);
    return NextResponse.json({ error: 'Failed to generate weekly report' }, { status: 500 });
  }
}
