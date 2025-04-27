import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    "id": "e57c2bee-722c-479c-9315-3ba1b1021443",
    "title": "SpringBoot面试",
    "slug": "springboot",
    "date": "2025-04-27",
    "excerpt": "Spring Boot面试题",
    "content": "## SpringBoot面试突击班\n\n## 什么是SpringBoot？\n\nSpring Boot 是由 Pivotal 团队提供的基于 Spring 的全新框架，旨在简化 Spring 应用的初始搭建和开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。 约定大于（优于）配置\n\n## SpringBoot的run方法做了什么事？\n\nrun方法其实就是做了一个IOC初始化的操作\n\n## @ComponentScan注解是干什么的？\n\n被@ComponentScan修饰的java类，如果没有指定具体的扫描路径。实际上他默认的扫描路径是当前JAVA类所在的路径及其子路径，都是被扫描的范围。\n\n## @EnableAutoConfiguration注解是干什么的？\n\n```\n@EnableAutoConfiguration        开启自动配置        开启自动装配\n```\n\n## Import注解的三种使用用法\n\n1.静态注入的方式\n\n2.实现了我们的ImportSelector接口，并且实现了selectImports方法，那么我们的返回值就是selectImports的方法的返回类型。\n\n3.实现了ImportBeanDefinitionRegistrar接口，并且实现了registerBeanDefinitions方法。那么这个时候我们可以自行封装BeanDefinition\n\n## SpringBoot自动装配的核心配置文件有哪些？\n\n```\nMETA-INF/spring.factories        候选\n\nMETA-INF/spring-autoconfigure-metadata.properties         过滤\n```\n\n## SpringBoot自动装配的流程是怎样的？\n\n首先，咱们的SpringBoot肯定是执行了Main方法中的run方法，而我们的run方法中会做IOC的初始化，那么我们的SpringBoot显然不会进行配置文件的初始化，而是注解初始化。那么显然我们会将java配置类的类对象传递进去，我们会走到@SpringBootApplication注解，接下来，很显然，起作用的是@EnableAutoConfiguration注解，接下来，这个注解会去加载我们的spring.factories跟spring-autoconfigure-metadata.properties这两个配置文件，进行候选以及筛选的工作，加载进去内存之后，实际上我们会在AutoConfigationImportSelect中加载spring.factories跟spring-autoconfigure-metadata.properties，我们会在返回的时候加载进入容器，这就是自动装配的流程。\n\n## bootstrap.yml的意义\n\nSpringBoot中默认支持的属性文件有下面4种\n\napplication.properties    application.xml\n\napplication.yml       aplication.yaml\n\n那么为什么还有一类bootstrap.yml      bootstrap.properties文件\n\nbootstrap.yml在SpringBoot中默认是不支持的，需要在SpringCloud环境下才支持，作用是在SpringBoot项目启动之前启动的一个父容器，该父容器可以在SpringBoot容器启动之前完成一些加载初始化的操作。比如加载配置中心中的信息。\n\n## 运行SpringBoot项目的方式\n\n**1、** 打包用命令或者者放到容器中运行\n\n**2、** 用 Maven/ Gradle 插件运行\n\n**3、** 直接执行 main 方法运行\n\n# SpringBoot如何解决跨域问题\n\n跨域可以在前端通过 JSONP 来解决，但是 JSONP 只可以发送 GET 请求，无法发送其他类型的请求，在 RESTful 风格的应用中，就显得非常鸡肋，因此我们推荐在后端通过 （CORS，Cross-origin resource sharing） 来解决跨域问题。这种解决方案并非 SpringBoot 特有的，在传统的 SSM 框架中，就可以通过 CORS 来解决跨域问题，只不过之前我们是在 XML 文件中配置 CORS ，现在可以通过实现WebMvcConfigurer接口然后重写addCorsMappings方法解决跨域问题。\n\n```java\n@Override\npublic void addCorsMappings(CorsRegistry registry) {\n    registry.addMapping(\"/**\")\n            .allowedOrigins(\"*\")\n            .allowCredentials(true)\n            .allowedMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\", \"OPTIONS\")\n            .maxAge(3600);\n}\n```\n\n# SpringBoot中如何配置log4j\n\n在引用log4j之前，需要先排除项目创建时候带的日志，因为那个是Logback，然后再引入log4j的依赖，引入依赖之后，去src/main/resources目录下的log4j-spring.properties配置文件，就可以开始对应用的日志进行配置使用。\n\n# 介绍几个常用的starter\n\n1、 spring-boot-starter-web ：提供web开发需要servlet与jsp支持 + 内嵌的 Tomcat 。\n\n2、 spring-boot-starter-data-jpa ：提供 Spring JPA + Hibernate 。\n\n3、 spring-boot-starter-data-Redis ：提供 Redis 。\n\n4、 mybatis-spring-boot-starter ：第三方的mybatis集成starter。\n\n5、spring-boot-starter-data-solr solr支持\n\n# SpringBoot的优点\n\nSpring Boot 优点非常多，如：\n\n一、独立运行\n\nSpring Boot而且内嵌了各种servlet容器，Tomcat、Jetty等，现在不再需要打成war包部署到容器\n\n中，Spring Boot只要打成一个可执行的jar包就能独立运行，所有的依赖包都在一个jar包内。\n\n二、简化配置\n\nspring-boot-starter-web启动器自动依赖其他组件，简少了maven的配置。\n\n三、自动配置\n\nSpring Boot能根据当前类路径下的类、jar包来自动配置bean，如添加一个spring-boot-starter\u0002\n\nweb启动器就能拥有web的功能，无需其他配置。\n\n四、无代码生成和XML配置\n\nSpring Boot配置过程中无代码生成，也无需XML配置文件就能完成所有配置工作，这一切都是借助\n\n于条件注解完成的，这也是Spring4.x的核心功能之一。\n\n五、应用监控\n\nSpring Boot提供一系列端点可以监控服务及应用，做健康检测\n\n# **Spring Boot、** **Spring MVC 和 Spring 有什么区别？**\n\n1、Spring\n\nSpring最重要的特征是依赖注入。所有 SpringModules 不是依赖注入就是 IOC 控制反转。\n\n当我们恰当的使用 DI 或者是 IOC 的时候，我们可以开发松耦合应用。松耦合应用的单元测试可以很容易的进行。\n\n2、Spring MVC\n\nSpring MVC 提供了一种分离式的方法来开发 Web 应用。通过运用像 DispatcherServelet，MoudlAndView 和 ViewResolver 等一些简单的概念，开发 Web 应用将会变的非常简单。\n\n3、SpringBoot\n\nSpring 和 SpringMVC 的问题在于需要配置大量的参数。\n\n![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1675493457066/21a7b65b1f4042a3a8d73ce65af32ab9.png)\n\nSpring Boot 通过一个自动配置和启动的项来目解决这个问题。为了更快的构建产品就绪应用程序，Spring Boot 提供了一些非功能性特征。\n\n# **什么是 Spring Boot Starter ？**\n\n启动器是一套方便的依赖描述符，它可以放在自己的程序中。你可以一站式的获取你所需要的 Spring 和相关技术，而不需要依赖描述符的通过示例代码搜索和复制黏贴的负载。\n\n例如，如果你想使用 Sping 和 JPA 访问数据库，只需要你的项目包含 spring-boot-starter-data-jpa 依赖项，你就可以完美进行。\n\n# **如何重新加载Spring Boot上的更改，而无需重新启动服务器？**\n\n这可以使用DEV工具来实现。通过这种依赖关系，您可以节省任何更改，嵌入式tomcat将重新启动。\n\nSpring Boot有一个开发工具（DevTools）模块，它有助于提高开发人员的生产力。Java开发人员面临的一个主要挑战是将文件更改自动部署到服务器并自动重启服务器。\n\n开发人员可以重新加载Spring Boot上的更改，而无需重新启动服务器。这将消除每次手动部署更改的需要。Spring Boot在发布它的第一个版本时没有这个功能。\n\n这是开发人员最需要的功能。DevTools模块完全满足开发人员的需求。该模块将在生产环境中被禁用。它还提供H2数据库控制台以更好地测试应用程序。\n\n![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1675493457066/514edbf6f6d54cd2904c122e7d14c901.png)\n\n页面自动装载：\n\n同样的，如果你想自动装载页面，有可以看看 FiveReload\n\n![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1675493457066/f450fa6c1bf64212abf1dbcee2515d17.png)\n\n# ******RequestMapping 和 GetMapping 的不同之处在哪里？******\n\nRequestMapping 具有类属性的，可以进行 GET,POST,PUT 或者其它的注释中具有的请求方法。GetMapping 是 GET 请求方法中的一个特例。它只是 ResquestMapping 的一个延伸，目的是为了提高清晰度。\n\n# ******我们如何连接一个像 MySQL 或者Orcale 一样的外部数据库？******\n\n让我们以 MySQL 为例来思考这个问题：\n\n第一步 - 把 mysql 连接器的依赖项添加至 pom.xml\n\n![](https://i9.taou.com/maimai/p/23480/156_3_83QLD8qe73KLPR5)\n\n第二步 - 从 pom.xml 中移除 H2 的依赖项\n\n或者至少把它作为测试的范围。\n\n![](https://i9.taou.com/maimai/p/23480/140_3_32ahJG6setHhrhpp)\n\n第三步 - 安装你的 MySQL 数据库\n\n第四步 - 配置你的 MySQL 数据库连接\n\n配置 application.properties\n\n```yml\nrootspring.jpa.hibernate.ddl-auto=none \nspring.datasource.url=jdbc:mysql://localhost:3306/test\nspring.datasource.username=root\nspring.datasource.password=root\n```\n\n第五步 - 重新启动，你就准备好了！\n\n# ******Spring Boot 需要独立的容器运行吗？******\n\n可以不需要，内置了 Tomcat/ Jetty 等容器。\n\n# ******你如何理解 Spring Boot 中的 Starters？******\n\nStarters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成 Spring 及其他技术，而不需要到处找示例代码和依赖包。如你想使用 Spring JPA 访问数据库，只要加入 spring-boot-starter-data-jpa 启动器依赖就能使用了。\n\n# ******Spring Boot 支持哪些日志框架？推荐和默认的日志框架是哪个？******\n\nSpring Boot 支持 Java Util Logging, Log4j2, Lockback 作为日志框架，如果你使用 Starters 启动器，Spring Boot 将使用 Logback 作为默认日志框架.\n\n# ******SpringBoot 实现热部署有哪几种方式？******\n\n主要有两种方式：\n\n1、Spring Loaded\n\n这可以使用DEV工具来实现。通过这种依赖关系，您可以节省任何更改，嵌入式tomcat将重新启动。\n\nSpring Boot有一个开发工具（DevTools）模块，它有助于提高开发人员的生产力。Java开发人员面临的一个主要挑战是将文件更改自动部署到服务器并自动重启服务器。\n\n开发人员可以重新加载Spring Boot上的更改，而无需重新启动服务器。这将消除每次手动部署更改的需要。Spring Boot在发布它的第一个版本时没有这个功能。\n\n这是开发人员最需要的功能。DevTools模块完全满足开发人员的需求。该模块将在生产环境中被禁用。它还提供H2数据库控制台以更好地测试应用程序。\n\n![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1675493457066/514edbf6f6d54cd2904c122e7d14c901.png)\n\n2、Spring-boot-devtools：\n\n同样的，如果你想自动装载页面，有可以看看 FiveReload\n\n![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1675493457066/f450fa6c1bf64212abf1dbcee2515d17.png)\n\n# **Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？**\n\n启动类上面的注解是@SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：\n\n● @SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。\n\n● @EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，\n\n如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })。\n\n● @ComponentScan：Spring组件扫描\n\n# **Spring Boot 有哪几种读取配置的方式**\n\nSpring Boot默认的配置文件有两种格式: application.properties 和 application.yml。 查找顺序是首先从application.properties 查找，\n\n**@PropertySource**\n\n@PropertySource注解用于指定资源文件读取的位置，它不仅能读取[properties](https://so.csdn.net/so/search?q=properties&spm=1001.2101.3001.7020)文件，也能读取xml文件，并且通过YAML解析器，配合自定义PropertySourceFactory实现解析YAML文件。\n\n**@Value**\n\n使用 @Value 读取配置文件\n\n这种方法适用于对象的参数比较少的情况\n\n我们可以直接在对象的属性上使用 `@Value` 注解，同时以 `${}` 的形式传入配置文件中对应的属性。同时需要在该类的上方使用 `@Configuration` 注解，将该类作为配置\n\n**@Environment**\n\nEnvironment 是 SpringCore 中的一个用于读取配置文件的类，将此类使用 @Autowired 注入到类中就可以使用它的getProperty方法来获取某个配置项的值。\n\n**@ConfigurationProperties**\n\n使用 @ConfigurationProperties 读取配置文件\n如果对象的参数比较多情况下,推荐使用 @ConfigurationProperties 会更简单一些，不需要在每一个字段的上面的使用@Value注解。\n\n@ConfigurationProperties注解声明当前类为配置读取类\n\nprefix=\"rabbitmq\" 表示读取前缀为rabbitmq的属性\n\n# Spring Boot 如何定义多套不同环境配置？\n\n基于properties配置文件\n第一步\n创建各环境对应的properties配置文件\napplcation.properties\n\napplication-dev.properties\n\napplication-test.properties\n\napplication-prod.properties\n第二步\n然后在applcation.properties文件中指定当前的环境spring.profiles.active=test,这时候读取的就是\napplication-test.properties文件。\n基于yml配置文件\n只需要一个applcation.yml文件就能搞定，推荐此方式。\n\n# **Spring Boot 可以兼容老 Spring 项目吗，如何做？**\n\n可以兼容，使用 @ImportResource 注解导入老 Spring 项目配置文件。\n\n# **如何在 Spring Boot 启动的时候运行一些特定的代码？**\n\n可以实现接口 ApplicationRunner 或者 CommandLineRunner，这两个接口实现方式一样，它们都只提供了一个 run 方法，实现上述接口的类加入IOC容器即可生效。\n\n# **你如何理解 Spring Boot 配置加载顺序？**\n\n1、开发者工具 `Devtools` 全局配置参数；\n2、单元测试上的 `@TestPropertySource` 注解指定的参数；\n3、单元测试上的 `@SpringBootTest` 注解指定的参数；\n4、命令行指定的参数，如 `java -jar springboot.jar --name=\"Java技术栈\"`；\n5、命令行中的 `SPRING_APPLICATION_JSON` 指定参数, 如 `java -Dspring.application.json='{\"name\":\"Java技术栈\"}' -jar springboot.jar`\n6、`ServletConfig` 初始化参数；\n7、`ServletContext` 初始化参数；\n8、JNDI参数（如 `java:comp/env/spring.application.json`）；\n9、Java系统参数（来源：`System.getProperties()`）；\n10、操作系统环境变量参数；\n11、`RandomValuePropertySource` 随机数，仅匹配：`ramdom.*`；\n12、JAR包外面的配置文件参数（`application-{profile}.properties（YAML）`）\n13、JAR包里面的配置文件参数（`application-{profile}.properties（YAML）`）\n14、JAR包外面的配置文件参数（`application.properties（YAML）`）\n15、JAR包里面的配置文件参数（`application.properties（YAML）`）\n16、`@Configuration`配置文件上 `@PropertySource` 注解加载的参数；\n17、默认参数（通过 `SpringApplication.setDefaultProperties` 指定）；\n\n数字越小优先级越高，即数字小的会覆盖数字大的参数值。\n\n\n# **如何实现SpringBoot 应用程序的安全性?**\n\n为了实现Spring Boot的安全性，我们使用 spring-boot-starter-security依赖项，并且必须添加安全配置。它只需要很少的代码。配置类将必须扩展WebSecurityConfigurerAdapter并覆盖其方法。\n\n\n# **SpringBoot中如何实现定时任务?**\n\n定时任务也是一个常见的需求，Spring Boot 中对于定时任务的支持主要还是来自 Spring 框架。\n\n在 Spring Boot 中使用定时任务主要有两种不同的方式，\n\n* 一个就是使用 Spring 中的 @Scheduled 注解，\n* 另一个则是使用第三方框架 Quartz。\n\n使用 Spring 中的 @Scheduled 的方式主要通过 @Scheduled 注解来实现。\n\n使用 Quartz ，则按照 Quartz 的方式，定义 Job 和 Trigger 即可。\n\n# **SpringBoot 中的监视器是什么呢?**\n\n* Spring boot actuator是spring启动框架中的重要功能之一。\n* Spring boot监视器可帮助您访问生产环境中正在运行的应用程序的当前状态。\n* 有几个指标必须在生产环境中进行检查和监控。\n* 即使一些外部应用程序可能正在使用这些服务来向相关人员触发警报消息。\n* 监视器模块公开了一组可直接作为HTTP URL访问的REST端点来检查状态。\n\n\n# **SpringBoot打成的jar和普通jar有什么区别?**\n\nSpring Boot 项目最终打包成的 jar 是可执行 jar ，这种 jar 可以直接通过 java -jar xxx.jar 命令来运行，这种 jar 不可以作为普通的 jar 被其他项目依赖，即使依赖了也无法使用其中的类。\n\nSpring Boot 的 jar 无法被其他项目依赖，主要还是他和普通 jar 的结构不同。\n\n普通的 jar 包，解压后直接就是包名，包里就是我们的代码，而 Spring Boot 打包成的可执行 jar 解压后，在 \\BOOT-INF\\classes 目录下才是我们的代码，因此无法被直接引用。\n\n如果非要引用，可以在 pom.xml 文件中增加配置，将 Spring Boot 项目打包成两个 jar ，一个可执行，一个可引用。\n",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "Java，SpringBoot"
    ]
  },
  {
    "id": "1",
    "title": "开始我的博客之旅",
    "slug": "starting-my-blog-journey",
    "date": "2023-11-15",
    "excerpt": "这是我的第一篇博客文章，分享我开始写博客的原因和期望。",
    "content": "\n# 开始我的博客之旅\n\n欢迎来到我的博客！这是我写的第一篇文章，标志着我博客之旅的开始。\n\n## 为什么我开始写博客\n\n写作一直是我表达想法和分享知识的方式。通过这个博客，我希望：\n\n- 记录我的学习和成长\n- 分享我的技术见解和经验\n- 与志同道合的人建立联系\n- 提高我的写作和表达能力\n\n## 我会写什么\n\n我计划主要关注以下几个主题：\n\n1. **技术开发** - 编程语言、框架和工具的经验\n2. **个人成长** - 学习方法、效率提升和自我管理\n3. **项目分享** - 我正在进行的个人项目和实验\n\n## 未来展望\n\n我计划每周发布至少一篇文章，并逐步改进这个博客的功能和设计。\n\n感谢您的阅读，希望您能继续关注我的博客之旅！\n    ",
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
    "content": "\n# 如何使用Next.js构建个人博客\n\n在这篇文章中，我将分享如何使用现代Web技术栈构建一个高性能、SEO友好的个人博客。\n\n## 技术选择\n\n我选择了以下技术：\n\n- **Next.js** - React框架，提供服务器端渲染和静态站点生成\n- **TypeScript** - 为JavaScript添加类型安全\n- **TailwindCSS** - 实用优先的CSS框架\n- **MDX** - 在Markdown中使用JSX组件\n\n## 步骤详解\n\n### 1. 创建Next.js项目\n\n使用create-next-app快速创建项目：\n\n```bash\nnpx create-next-app@latest my-blog --typescript --tailwind --app\n```\n\n### 2. 创建博客数据结构\n\n定义博客文章的接口和数据存储方式...\n\n### 3. 实现文章列表和详情页面\n\n创建用于展示文章列表和文章详情的组件...\n\n### 4. 添加导航和页脚\n\n实现网站的通用布局元素...\n\n## 总结\n\n通过Next.js构建博客有很多优势，包括出色的性能、良好的开发体验和SEO友好的特性。\n\n如果您有任何问题或建议，请在评论区留言！\n    ",
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
    "content": "\n# 2024年值得学习的编程语言\n\n技术领域发展迅速，选择正确的编程语言学习可以为你的职业发展带来巨大优势。\n\n## 1. TypeScript\n\nTypeScript继续保持强劲增长趋势，作为JavaScript的超集，它为Web开发带来了类型安全和更好的工具支持。\n\n## 2. Rust\n\nRust因其内存安全性和高性能继续获得开发者的喜爱，特别是在系统编程和WebAssembly领域。\n\n## 3. Go\n\nGo语言在云原生开发、微服务和DevOps工具中的应用越来越广泛，其简洁性和并发模型是主要优势。\n\n## 4. Python\n\nPython在数据科学、机器学习和自动化领域的主导地位依然稳固，是初学者和专业人士的理想选择。\n\n## 5. Kotlin\n\nKotlin在Android开发中已成为首选语言，并逐渐扩展到服务器端和跨平台开发。\n\n## 如何选择适合你的语言\n\n选择编程语言时应考虑以下因素：\n\n- 你的职业目标和行业需求\n- 语言的学习曲线和社区支持\n- 你现有的技能和知识基础\n- 项目类型和技术生态系统\n\n无论你选择哪种语言，持续学习和实践才是提升编程能力的关键。\n    ",
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