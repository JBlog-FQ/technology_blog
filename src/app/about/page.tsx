import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '关于我 | 个人技术博客',
  description: '了解博主的背景、技能和兴趣',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          关于我
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
          热爱技术、学习和分享的开发者
        </p>
      </div>

      <div className="md:flex md:items-start md:gap-12">
        <div className="md:flex-shrink-0 flex justify-center mb-8 md:mb-0">
          <div className="relative w-40 h-40 rounded-full overflow-hidden">
            <Image
              src="/images/avatar.jpg"
              alt="博主头像"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            个人介绍
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            你好！我是一名热爱技术的开发者，专注于Web开发和前端技术。我在软件行业工作已有多年，经历了从传统网站开发到现代JavaScript框架的整个演变过程。
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            通过这个博客，我希望能够分享我在技术领域的所见所闻和经验心得，同时也记录自己的学习和成长历程。
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
            技能和专长
          </h2>
          <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li>前端开发 (React, Vue, Next.js)</li>
            <li>JavaScript/TypeScript</li>
            <li>响应式设计与CSS框架</li>
            <li>后端开发 (Node.js)</li>
            <li>数据库设计</li>
            <li>性能优化</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
            爱好与兴趣
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            除了编码，我还喜欢阅读技术书籍、参加技术交流活动、尝试新技术和工具。在空闲时间，我喜欢徒步旅行、摄影和探索新地方。
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
            联系方式
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            如果你有任何问题或想法，欢迎通过以下方式联系我：
          </p>
          <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <span className="font-medium">邮箱：</span>
              <a href="mailto:example@example.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                example@example.com
              </a>
            </li>
            <li>
              <span className="font-medium">GitHub：</span>
              <a href="https://github.com/" className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">
                github.com/yourusername
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 