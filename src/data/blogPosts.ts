import { BlogPost } from '@/types/blog';

// Define blog posts with truncated content
export const blogPosts: BlogPost[] = [
  {
    "id": "c990c5b1-20bb-4683-bb30-64a1f749fa30",
    "title": "Oracle",
    "slug": "oracle",
    "date": "2025-04-28",
    "excerpt": "# Oracle数据库\r\n\r\n## 数据类型\r\n\r\n### number\r\n\r\n### float\r\n\r\n### Char\r\n\r\n### NChar类型\r\n\r\n存储==固定长度（创建表时决定）==的 Unicode字符数据\r\n\r\n```sql\r\ncreate table nchar_demo(\r\n\t...",
    "content": "# Oracle数据库\r\n\r\n## 数据类型\r\n\r\n### number\r\n\r\n### float\r\n\r\n### Char\r\n\r\n### NChar类型\r\n\r\n存储==固定长度（创建表时决定）==的 Unicode字符数据\r\n\r\n```sql\r\ncreate table nchar_demo(\r\n\tdescription NCHAR(10)\r\n)\r\n```\r\n\r\n### varchar2\r\n\r\n### Nvarchar\r\n\r\n### Date\r\n\r\n==oracle数据库输入和输出的标准日期格式是：DD-MON-YY==\r\n\r\n```sql\r\nselect\r\n\tsysdate\r\nfrom\r\n\tdual;\r\n```\r\n\r\n![image-20240920095948296](D:\\桌面\\Java\\Oracle.assets\\image-20240920095948296.png)\r\n\r\n假设想要佳能标准日期格式更改为`YYYY-MM-DD`,那么可以使用ALTER SESSION 语句来更改 NLS_DATE_FORMAT参数的值，\r\n\r\n```sql\r\nALTER SESSION SET NKS_DATE_FORMAT = 'YYYY-MM-DD';\r\n```\r\n\r\n\r\n\r\n## Order By\r\n\r\nASC 升序      ；     DESC  降序\r\n\r\n```sql\r\nselect name, address,credit_limit  from customers   order by   name asc, address desc;\r\n```\r\n\r\n```sql\r\nUPPER() #函数区分大小写\r\n```\r\n\r\n## Distinct\r\n\r\n==过滤结果集中的重复行==\r\n\r\n```sql\r\nselect name,distinct age from student where new = 1;\r\n```\r\n\r\n## Where\r\n\r\n获取标价在650到680之间\r\n\r\n```sql\r\nselect\r\n\tproduct_name,\r\n\tlist_price\r\nfrom\r\n\tproducts\r\nwhere\r\n\tlist_price between 650 and 680 #等效 list_price >= 650 and list_price <= 680\r\norder by \r\n\tlist_price;\r\n```\r\n\r\n## or\r\n\r\n```sql\r\nselect \r\n\torder_id,\r\n\tcustomer_id,\r\n\tstatus,\r\n\tsalesman_id,\r\n\tTO_CHAR(order_date,'YYYY-MM-DD') AS order_date\r\nfrom\r\n\torders\r\nwhere\r\n\tsalesman_id = 60 or salesman_id = 61 or salesman_id = 62\r\n\t#等效于 salesman_id in(60,61,62)\r\norder by\r\n\torder_date desc;\r\n```\r\n\r\n## fetch first\r\n\r\n限制查询返回的行数\r\n\r\n```sql\r\nselect \r\n\tcolumn1,column2,...\r\nfrom\r\n\ttable_name\r\nwhere \r\n\tconditions\r\norder by \r\n\tcolumn_name\r\nfetch first n rows only;\r\n```\r\n\r\n\r\n\r\n## Oracle 字符串函数\r\n\r\n### Ascii()函数\r\n\r\n返回代表指定字符的数字值代码\r\n\r\n```sql\r\nASCII('t')\r\nResult : 116\r\n```\r\n\r\n### Asciistr()函数\r\n\r\n将任何字符集中的字符串转换为ASCII字符串\r\n\r\n\r\n\r\n",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "数据库"
    ],
    "coverImage": "/images/blog/oracle-cover.jpg"
  },
  {
    "id": "58b17746-c611-47b8-82ac-55980b29049c",
    "title": "Java 设计模式",
    "slug": "java",
    "date": "2025-04-28",
    "excerpt": "# 常见的设计模式\r\n\r\n## 一.创建型模式\r\n\r\n==主要处理对象的创建问题，通过封装对象创建过程来提高系统的灵活性和可扩展性==\r\n\r\n- **单例模式**\r\n\r\n  确保一个类只有一个实例，并提供全局访问点。常用于需要共享资源的场景，如配置文件管理、数据库连接池等。\r\n\r\n  ```Java...",
    "content": "# 常见的设计模式\r\n\r\n## 一.创建型模式\r\n\r\n==主要处理对象的创建问题，通过封装对象创建过程来提高系统的灵活性和可扩展性==\r\n\r\n- **单例模式**\r\n\r\n  确保一个类只有一个实例，并提供全局访问点。常用于需要共享资源的场景，如配置文件管理、数据库连接池等。\r\n\r\n  ```Java\r\n  public class Singleton{\r\n      //私有静态实例，确保全局唯一\r\n      private static Singleton instance;\r\n      \r\n      //私有构造方法，防止外部实例化\r\n      private Singleton(){}\r\n      \r\n      //公共静态方法，提供访问点\r\n      public static Singleton getInstance(){\r\n          if(instance == null){\r\n              instance = new Singleton();\r\n          }\r\n          return instance;\r\n      }\r\n  }\r\n  ```\r\n\r\n  \r\n\r\n- **工厂方法模式**\r\n\r\n  定义一个创建对象的接口，但让子类决定实例化哪个类。使得一个类的实例化延迟到子类。\r\n\r\n  ```java\r\n  // 产品接口\r\n  interface Product {\r\n      void use();\r\n  }\r\n  \r\n  // 具体产品A\r\n  class ConcreteProductA implements Product {\r\n      @Override\r\n      public void use() {\r\n          System.out.println(\"Using Product A\");\r\n      }\r\n  }\r\n  \r\n  // 具体产品B\r\n  class ConcreteProductB implements Product {\r\n      @Override\r\n      public void use() {\r\n          System.out.println(\"Using Product B\");\r\n      }\r\n  }\r\n  \r\n  // 工厂方法抽象类\r\n  abstract class Creator {\r\n      public abstract Product factoryMethod();\r\n  \r\n      public void operation() {\r\n          Product product = factoryMethod();\r\n          product.use();\r\n      }\r\n  }\r\n  \r\n  // 具体工厂A\r\n  class ConcreteCreatorA extends Creator {\r\n      @Override\r\n      public Product factoryMethod() {\r\n          return new ConcreteProductA();\r\n      }\r\n  }\r\n  \r\n  // 具体工厂B\r\n  class ConcreteCreatorB extends Creator {\r\n      @Override\r\n      public Product factoryMethod() {\r\n          return new ConcreteProductB();\r\n      }\r\n  }\r\n  ```\r\n\r\n  \r\n\r\n- **抽象工厂模式**\r\n\r\n  提供一个创建一系列相关或依赖对象的接口，而无需指定它们的具体类。通常用于创建一组相关的产品，如不同操作系统的UI组件。\r\n\r\n- **建造者模式**\r\n\r\n  将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。常用于构建复杂对象如多步骤的对象创建流程。\r\n\r\n- **原型模式**\r\n\r\n  通过复制现有实例来创建新对象，避免创建新对象的代价。适用于需要大量类似对象创建的场景。\r\n\r\n## 二.结构型模式\r\n\r\n==主要关注如何在系统中组合类或对象以实现更大的灵活性和扩展性==\r\n\r\n- **适配器模式**\r\n  将一个类的接口转换为客户期望的另一个接口，使得原本由于接口不兼容而不能一起工作的类可以协同工作。适用于\"旧系统适配新系统\"的场景。\r\n- **桥接模式**\r\n  将抽象部分与实现部分分离，使它们都可以独立变化。适用于需要多个维度变化的场景，如不同平台的UI控件。\r\n- **装饰器模式**\r\n  动态地给对象添加职责。与继承相比，装饰器模式提供了一种更加灵活的给对象添加功能的方式。\r\n- **外观模式**\r\n  为子系统中的一组接口提供一个一致的接口，使得子系统更容易使用。常用于简化复杂子系统的使用。\r\n- **享元模式**\r\n  通过共享对象来减少内存消耗，适用于大量相似对象的场景。常用于文本编辑器字符对象的共享。\r\n- **代理模式**\r\n  为另一个对象提供一个代理，以控制对该对象的访问。常用于延迟加载、访问控制等场景。\r\n\r\n## 三.行为型模式\r\n\r\n==主要关注对象之间的通信与职责分配==\r\n\r\n- **策略模式**\r\n  定义一系列算法，将每一个算法封装起来，并使它们可以互相替换。策略模式使得算法可以独立于使用它的客户而变化。\r\n- **观察者模式**\r\n  定义对象间的一种一对多依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都得到通知并自动更新。常用于实现事件驱动的系统。\r\n- **命令模式**\r\n  将请求封装成一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。\r\n- **责任链模式**\r\n  将请求的处理者链式组织起来，每个处理者都有机会处理请求，直到有处理者处理了它。常用于构建灵活的职责分配机制。\r\n- **中介者模式**\r\n  用一个中介对象来封装一系列对象之间的交互。中介者使各对象不需要显式地相互引用，从而使耦合松散，而且可以独立地改变它们之间的交互。\r\n- **备忘录模式**\r\n  在不破坏封装的前提下，捕获并保存一个对象的内部状态，以便可以在以后将对象恢复到这个状态。\r\n- **迭代器模式**\r\n  提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。常用于遍历集合。\r\n- **模板方法模式**\r\n  在一个方法中定义一个算法的框架，而将一些步骤延迟到子类中。模板方法使得子类可以在不改变算法结构的情况下重新定义算法的某些步骤。\r\n- **访问者模式**\r\n  表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素类的前提下定义作用于这些元素的新操作。\r\n- **状态模式**\r\n  允许对象在内部状态改变时改变其行为。看起来对象改变了它的类。常用于处理对象状态变化的复杂逻辑。",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "Java"
    ],
    "coverImage": "/images/blog/java-cover.jpg"
  },
  {
    "id": "4962c8bd-d7a5-4563-806f-5c0fdf7ce860",
    "title": "MySQL",
    "slug": "mysql",
    "date": "2025-04-27",
    "excerpt": "mysql",
    "content": "# MySQL\n\n## 数据库范式了解吗？\n\n- **1NF（第一范式）：**属性不可分\n- **2NF（第二范式）：**每个非主属性完全依赖于键码\n- **3NF（第三范式）：**非主属性不传递函数依赖于键码\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "MySQL"
    ],
    "coverImage": "/images/default-cover.jpg"
  },
  {
    "id": "e57c2bee-722c-479c-9315-3ba1b1021443",
    "title": "SpringBoot面试",
    "slug": "springboot",
    "date": "2025-04-27",
    "excerpt": "Spring Boot面试题",
    "content": "## SpringBoot面试突击班\n\n## 什么是SpringBoot？\n\nSpring Boot 是由 Pivotal 团队提供的基于 Spring 的全新框架，旨在简化 Spring 应用的初始搭建和开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。 约定大于（优于）配置\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "Java，SpringBoot"
    ],
    "coverImage": "/images/default-cover.jpg"
  },
  {
    "id": "1",
    "title": "开始我的博客之旅",
    "slug": "starting-my-blog-journey",
    "date": "2023-11-15",
    "excerpt": "这是我的第一篇博客文章，分享我开始写博客的原因和期望。",
    "content": "\n# 开始我的博客之旅\n\n欢迎来到我的博客！这是我写的第一篇文章，标志着我博客之旅的开始。\n\n## 为什么我开始写博客\n\n写作一直是我表达想法和分享知识的方式。通过这个博客，我希望：\n\n- 记录我的学习和成长\n- 分享我的技术见解和经验\n- 与志同道合的人建立联系\n- 提高我的写作和表达能力\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "个人",
      "博客",
      "介绍"
    ]
  },
  {
    "id": "2",
    "title": "如何使用Next.js构建个人博客",
    "slug": "how-to-build-personal-blog-with-nextjs",
    "date": "2023-11-22",
    "excerpt": "分享我使用Next.js、TailwindCSS和TypeScript构建个人博客的经验和技巧。",
    "content": "\n# 如何使用Next.js构建个人博客\n\n在这篇文章中，我将分享如何使用现代Web技术栈构建一个高性能、SEO友好的个人博客。\n\n## 技术选择\n\n我选择了以下技术：\n\n- **Next.js** - React框架，提供服务器端渲染和静态站点生成\n- **TypeScript** - 为JavaScript添加类型安全\n- **TailwindCSS** - 实用优先的CSS框架\n- **MDX** - 在Markdown中使用JSX组件\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "Next.js",
      "React",
      "Web开发",
      "教程"
    ]
  },
  {
    "id": "3",
    "title": "2024年值得学习的编程语言",
    "slug": "2024-programming-languages-to-learn",
    "date": "2024-01-05",
    "excerpt": "探讨2024年最值得投资学习的编程语言，以及它们在行业中的应用前景。",
    "content": "\n# 2024年值得学习的编程语言\n\n技术领域发展迅速，选择正确的编程语言学习可以为你的职业发展带来巨大优势。\n\n## 1. TypeScript\n\nTypeScript继续保持强劲增长趋势，作为JavaScript的超集，它为Web开发带来了类型安全和更好的工具支持。\n\n## 2. Rust\n\nRust因其内存安全性和高性能继续获得开发者的喜爱，特别是在系统编程和WebAssembly领域。\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "编程语言",
      "技术趋势",
      "学习资源"
    ]
  }
];

// 导出函数以获取所有文章
export const getAllPosts = (): BlogPost[] => {
  return blogPosts;
}; 