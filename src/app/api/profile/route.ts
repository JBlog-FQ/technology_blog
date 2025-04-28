import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// 定义配置文件路径
const profileDataPath = path.join(process.cwd(), 'src/data/profileData.json');
const dataDir = path.join(process.cwd(), 'src/data');

// 获取个人资料信息
export async function GET() {
  try {
    let profileData;
    
    // 检查文件是否存在
    if (existsSync(profileDataPath)) {
      // 读取文件
      const fileContent = await readFile(profileDataPath, 'utf-8');
      profileData = JSON.parse(fileContent);
    } else {
      // 返回默认资料
      profileData = {
        name: '路人の博客',
        title: '全栈开发工程师',
        email: 'example@example.com',
        github: 'github.com/yourusername',
        bio: '你好！我是一名热爱技术的开发者，专注于Web开发和前端技术。我在软件行业工作已有多年，经历了从传统网站开发到现代JavaScript框架的整个演变过程。\n\n通过这个博客，我希望能够分享我在技术领域的所见所闻和经验心得，同时也记录自己的学习和成长历程。',
        hobbies: '除了编码，我还喜欢阅读技术书籍、参加技术交流活动、尝试新技术和工具。在空闲时间，我喜欢徒步旅行、摄影和探索新地方。',
        hobbyTags: ['技术阅读', '徒步旅行', '摄影', '音乐', '开源贡献'],
        skills: [
          { name: 'React/Next.js', percentage: 90 },
          { name: 'JavaScript/TypeScript', percentage: 85 },
          { name: 'CSS/Tailwind', percentage: 80 },
          { name: 'Node.js', percentage: 75 },
          { name: '数据库设计', percentage: 65 },
          { name: '性能优化', percentage: 70 },
        ]
      };
    }
    
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('获取个人资料失败:', error);
    return NextResponse.json(
      { message: '获取个人资料失败' },
      { status: 500 }
    );
  }
}

// 保存个人资料信息
export async function POST(request: NextRequest) {
  try {
    // 获取表单数据
    const profileData = await request.json();
    
    // 确保目录存在
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }
    
    // 将数据写入文件
    await writeFile(profileDataPath, JSON.stringify(profileData, null, 2), 'utf-8');
    
    return NextResponse.json({ message: '个人资料已更新' });
  } catch (error) {
    console.error('保存个人资料失败:', error);
    return NextResponse.json(
      { message: '保存个人资料失败' },
      { status: 500 }
    );
  }
} 