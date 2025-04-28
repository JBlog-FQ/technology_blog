import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SharePage() {
  // 分享项目数据
  const shareItems = [
    {
      id: 1,
      title: "我的GitHub仓库",
      description: "我的开源项目集合，包含前端和后端项目",
      imageUrl: "/images/github.png",
      link: "https://github.com/"
    },
    {
      id: 2,
      title: "技术学习资源",
      description: "我收集的技术学习资源，包括书籍、视频和教程",
      imageUrl: "/images/learning.png", 
      link: "/resources"
    },
    {
      id: 3,
      title: "我的技术笔记",
      description: "我的编程和技术学习笔记",
      imageUrl: "/images/notes.png",
      link: "/notes"
    },
    {
      id: 4,
      title: "推荐工具",
      description: "我日常使用的开发工具和软件推荐",
      imageUrl: "/images/tools.png",
      link: "/tools"
    }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* 页面头部 */}
      <PageHeader 
        title="资源分享" 
        description="这里收集了一些我认为有价值的技术资源、工具和项目"
      />
      
      {/* 内容区域 */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shareItems.map((item) => (
            <Card key={item.id}>
              <div className="relative h-48 bg-gradient-to-r from-primary/20 to-accent/20">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <CardContent>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary mb-4">
                  {item.description}
                </p>
                <Button 
                  href={item.link}
                  variant="outline"
                >
                  查看详情
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* 联系我 */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            想要分享你的资源？
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            如果你有好的技术资源想要分享，或者对我分享的内容有任何建议，欢迎联系我。
          </p>
          <Button 
            href="mailto:contact@example.com"
            variant="primary"
            size="lg"
          >
            联系我
          </Button>
        </div>
      </Section>
    </div>
  );
} 