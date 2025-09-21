# Mira Journal

一个智能日记应用，通过AI理解用户，产生共鸣，帮助反思，让用户更了解自己。

## 功能特色

- 📝 **智能日记记录** - 记录日常，获得AI即时反馈
- 🧠 **AI学习系统** - 分析用户心情、兴趣、性格特征
- 📊 **周报生成** - 自动生成个性化周报，包含心情趋势、关系图谱等
- 🎯 **目标追踪** - 追踪个人目标和行为模式
- 💭 **高光语录** - AI生成诗意的人生感悟

## 技术栈

- **前端**: Next.js 15, React, TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **数据库**: 内存存储（演示版本）

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问应用
open http://localhost:3000
```

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 一键部署

## 使用说明

1. **查看日记** - 馶页显示所有日记，点击查看详情
2. **写日记** - 点击底部圆形按钮，记录你的想法
3. **生成周报** - 在 Mira Tab 中点击"生成周报"按钮
4. **查看分析** - 周报包含心情趋势、关系图谱、行为模式等

## 项目结构

```Jsrc/
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── mira/           # Mira 页面
│   └── page.tsx        # 首页
├── components/         # React 组件
│   ├── BottomNavigation.tsx
│   ├── DiaryDetail.tsx
│   ├── DiaryList.tsx
│   ├── MiraTab.tsx
│   ├── WeeklyReport.tsx
│   └── WriteDiary.tsx
└── lib/               # 工具库
    ├── aiService.ts   # AI 服务
    ├── memoryDatabase.ts # 内存数据库
    └── mockData.ts    # 模拟数据
```

## 演示数据

应用包含3篇预设日记，展示完整功能：
- 爬山日记（开心心情）
- 工作挑战日记（沮丧心情）
- 学习编程日记（充实心情）

## 许可证

MIT License