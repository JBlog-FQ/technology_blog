import Link from 'next/link';
import Image from 'next/image';

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
    <div className="min-h-screen bg-background dark:bg-background transition-theme">
      {/* 顶部横幅 */}
      <div className="bg-primary text-white py-16 px-4 transition-theme">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">资源分享</h1>
          <p className="text-xl max-w-3xl mx-auto">
            这里收集了一些我认为有价值的技术资源、工具和项目
          </p>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shareItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-card-bg dark:bg-card-bg border border-card-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary dark:text-text-primary mb-2 transition-theme">
                  {item.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary mb-4 transition-theme">
                  {item.description}
                </p>
                <Link 
                  href={item.link}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  查看详情
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* 联系我 */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-4 transition-theme">
            想要分享你的资源？
          </h2>
          <p className="text-text-secondary dark:text-text-secondary mb-6 transition-theme max-w-2xl mx-auto">
            如果你有好的技术资源想要分享，或者对我分享的内容有任何建议，欢迎联系我。
          </p>
          <a 
            href="mailto:contact@example.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            联系我
          </a>
        </div>
      </div>
    </div>
  );
} 