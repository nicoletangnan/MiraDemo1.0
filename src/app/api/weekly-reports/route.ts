import { NextResponse } from 'next/server';
import { memoryDbOperations } from '@/lib/memoryDatabase';

export async function GET() {
  try {
    const reports = memoryDbOperations.getAllWeeklyReports();
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching weekly reports:', error);
    return NextResponse.json({ error: 'Failed to fetch weekly reports' }, { status: 500 });
  }
}
