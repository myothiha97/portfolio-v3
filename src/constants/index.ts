export const navLinks = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'About', href: '#about' },
  { id: 3, name: 'Projects', href: '#projects' },
  { id: 4, name: 'Work', href: '#work' },
  { id: 5, name: 'Contact', href: '#contact' },
];

export const myProjects = [
  {
    title: 'AI Code Review Dashboard',
    desc: 'A developer tool that accepts code snippets and returns AI-powered analysis: complexity scores, bug detection, refactoring suggestions, and security flags.',
    subdesc:
      'Built with React, TypeScript, Node.js/Express, and Claude API. Features Monaco Editor for code input, severity-rated issue cards, and a diff view showing original vs suggested refactored code.',
    href: '#',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'React', path: '/assets/react.svg' },
      { id: 2, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 3, name: 'Node', path: '/assets/react.svg' },
      { id: 4, name: 'Claude API', path: '/assets/react.svg' },
    ],
  },
  {
    title: 'Real-Time Infrastructure Monitor',
    desc: 'A live dashboard showing simulated server metrics: CPU, memory, network I/O, with alert thresholds and log streaming. Built with Go backend for WebSocket performance.',
    subdesc:
      'Go backend with goroutines for metric generation and WebSocket streaming. React frontend with Recharts for real-time sparkline charts, alert system, and scrolling log panel.',
    href: '#',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'React', path: '/assets/react.svg' },
      { id: 2, name: 'Go', path: '/assets/typescript.png' },
      { id: 3, name: 'WebSocket', path: '/assets/react.svg' },
      { id: 4, name: 'Docker', path: '/assets/react.svg' },
    ],
  },
  {
    title: 'AI Document RAG Chat',
    desc: 'Upload a PDF and ask questions about it. Uses Retrieval-Augmented Generation with vector embeddings for accurate document Q&A with source citations.',
    subdesc:
      'Python FastAPI backend with LangChain and ChromaDB for vector storage. PDF chunking, embedding pipeline, and context-aware chat with highlighted source sections.',
    href: '#',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'React', path: '/assets/react.svg' },
      { id: 2, name: 'Python', path: '/assets/typescript.png' },
      { id: 3, name: 'FastAPI', path: '/assets/react.svg' },
      { id: 4, name: 'LangChain', path: '/assets/react.svg' },
    ],
  },
  {
    title: 'API Gateway & Rate Limiter',
    desc: 'A functional API gateway with token bucket rate limiting, API key management, request logging, and a real-time admin dashboard. Pure systems engineering.',
    subdesc:
      'Go reverse proxy with Redis-backed token bucket algorithm using MULTI/EXEC for atomicity. Docker Compose orchestration, Prometheus-style /metrics endpoint, and React admin panel.',
    href: '#',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'Go', path: '/assets/typescript.png' },
      { id: 2, name: 'Redis', path: '/assets/react.svg' },
      { id: 3, name: 'Docker', path: '/assets/react.svg' },
      { id: 4, name: 'React', path: '/assets/react.svg' },
    ],
  },
  {
    title: 'Polyglot Micro-Frontend Architecture',
    desc: 'A micro-frontend app with three frameworks (React, Vue, Svelte) orchestrated by Module Federation, backed by microservices in Node.js, Go, and Python — all containerized.',
    subdesc:
      'The flagship project. Shell app with Module Federation, API gateway, JWT auth service, Go data aggregation, Python ML prediction, Nginx reverse proxy, and Docker Compose orchestration.',
    href: '#',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      { id: 1, name: 'React', path: '/assets/react.svg' },
      { id: 2, name: 'Vue', path: '/assets/typescript.png' },
      { id: 3, name: 'Go', path: '/assets/react.svg' },
      { id: 4, name: 'Docker', path: '/assets/react.svg' },
    ],
  },
];

export const calculateSizes = (isSmall: boolean, isMobile: boolean, isTablet: boolean) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Rezerv',
    pos: 'Senior Frontend Engineer',
    duration: 'Oct 2024 — Present',
    title:
      'Leading frontend architecture for a gym, wellness & spa SaaS platform. Owning the full delivery lifecycle — performance optimization, API integrations, CI/CD pipelines, and AWS infrastructure — while mentoring the team on clean code and scalability.',
    highlights: [
      'Led development, maintenance, and enhancement of a scalable frontend codebase aligned with business and project objectives',
      'Optimized application performance using modern tools and frontend architecture best practices for a fast, seamless user experience',
      'Refactored and modernized legacy code, migrating to maintainable, high-performance technologies to improve development efficiency',
      'Researched, designed, and implemented robust API integrations ensuring smooth data flow and system interoperability across services',
      'Owned the frontend deployment lifecycle — established and managed CI/CD pipelines for streamlined delivery and continuous improvement',
      'Collaborated with DevOps to manage AWS infrastructure for frontend hosting, enhancing reliability, scalability, and performance',
      'Acted as a technical mentor, promoting clean code, maintainability, and performance-focused development culture',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'AWS', 'CI/CD', 'React Query'],
    icon: '/assets/framer.svg',
  },
  {
    id: 2,
    name: 'Codigo — The Mobile App Company',
    pos: 'Lead Software Engineer',
    duration: 'Jan 2024 — Oct 2024',
    title:
      'Led technical direction for enterprise client projects at a Singapore mobile & web agency. Architected centralized design systems, engineered a live sports streaming platform, and owned CI/CD infrastructure across production environments.',
    highlights: [
      'Architected a centralized design system for AIA Singapore and Trifecta — ensuring cross-project UI consistency and long-term architectural scalability',
      'Engineered a high-concurrency live video streaming platform for international sports broadcasting; led a team of 4 with Next.js App Router and Brightcove SDK for adaptive bitrate streaming',
      'Hardened system infrastructure with advanced authentication and high-concurrency optimizations; managed AWS deployment with Nginx load balancing for global availability',
      'Accelerated deployment cycles by designing and maintaining CI/CD pipelines, reducing manual intervention across production environments',
      'Authored comprehensive technical documentation and audited internal workflows to eliminate architectural redundancies and technical debt',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Nginx', 'Brightcove SDK'],
    icon: '/assets/notion.svg',
  },
  {
    id: 3,
    name: 'Codigo — The Mobile App Company',
    pos: 'Senior Software Engineer',
    duration: 'Jan 2023 — Dec 2023',
    title:
      'Took ownership of the 7-Eleven Singapore e-commerce platform, leading a team of 3 developers. Implemented advanced scalability strategies and interfaced directly with stakeholders to translate business requirements into scalable software.',
    highlights: [
      'Led development of the 7-Eleven Singapore e-commerce platform — managed a team of 3 developers for high-quality technical execution and on-time delivery',
      'Implemented advanced API caching, design patterns, and fine-grained performance tuning to optimize web application responsiveness',
      'Facilitated technical alignment with business goals by communicating directly with stakeholders to translate requirements into scalable solutions',
      'Collaborated with cross-functional teams (UI/UX, QA, Product) for feature research and iterative improvements to UX and system reliability',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    icon: '/assets/notion.svg',
  },
  {
    id: 4,
    name: 'Codigo — The Mobile App Company',
    pos: 'Software Engineer',
    duration: 'Sep 2021 — Jan 2023',
    title:
      'Built full-stack web applications for enterprise clients across Singapore. Rapidly grew from implementation to architecture — improving API performance by 40% and contributing to system design decisions.',
    highlights: [
      'Developed and optimized full-stack web applications using Node.js, TypeScript, and React for high-quality software delivery',
      'Refactored legacy codebases and improved API performance by 40% through efficient data-fetching strategies and React Query',
      'Collaborated with UI/UX, QA, and business teams to translate requirements into technical features',
      'Contributed to architectural discussions to enhance system design and long-term codebase maintainability',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'React Query', 'GraphQL'],
    icon: '/assets/notion.svg',
  },
  {
    id: 5,
    name: 'Freelance',
    pos: 'Full Stack Developer',
    duration: 'Aug 2020 — Sep 2021',
    title:
      'Delivered multiple full-stack projects remotely using React, Vue.js, Angular, Node.js, Python (Django), and PHP (Laravel). Gained end-to-end experience across architecture design, performance optimization, and production deployment.',
    highlights: [
      'Developed and delivered projects across React, Vue.js, and AngularJS frontends with Node.js (Express, NestJS, Next.js), Python (Django), and PHP (Laravel) backends',
      'Diagnosed and resolved complex performance challenges through effective caching strategies, code refactoring, and industry best practices',
      'Strengthened problem-solving, adaptability, and client communication skills through diverse projects across various domains',
    ],
    tags: ['React', 'Vue.js', 'Node.js', 'Python', 'Django', 'PHP', 'Docker'],
    icon: '/assets/framer.svg',
  },
  {
    id: 6,
    name: 'MM-Digital-Solutions',
    pos: 'Software Engineer — Python',
    duration: 'Jan 2020 — Mar 2021',
    title:
      'Built end-to-end Python automation and ML systems for enterprise clients. Specialized in web crawling, data pipelines, and computer vision — including CV systems for parking detection, security monitoring, and facial recognition.',
    highlights: [
      'Engineered fully automated web crawlers with Selenium, Scrapy, and Beautiful Soup for large-scale data extraction and business intelligence',
      'Built automation systems and cron-based task schedulers on Linux (Ubuntu) for 5BB ISP, streamlining backend workflows',
      'Conducted R&D in data analysis and ML using NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow',
      'Developed ML prototypes: parking space detection (CV), real-time person detection for security systems, and facial/hair recognition for personalized recommendations',
      'Integrated ML models and APIs into production-ready Python applications for advanced data insights and predictive capabilities',
    ],
    tags: ['Python', 'Selenium', 'Scrapy', 'TensorFlow', 'Machine Learning', 'Linux', 'Docker'],
    icon: '/assets/figma.svg',
  },
];

export interface Skill {
  name: string;
  icon: string; // react-icons import key
}

export interface SkillSubGroup {
  group: string;
  skills: Skill[];
}

export interface SkillCategory {
  category: string;
  tag: string;
  subGroups: SkillSubGroup[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    tag: 'UI',
    subGroups: [
      {
        group: 'Languages',
        skills: [
          { name: 'TypeScript', icon: 'SiTypescript' },
          { name: 'JavaScript', icon: 'SiJavascript' },
          { name: 'HTML5', icon: 'SiHtml5' },
          { name: 'CSS3', icon: 'SiCss3' },
        ],
      },
      {
        group: 'Frameworks',
        skills: [
          { name: 'React', icon: 'SiReact' },
          { name: 'Next.js', icon: 'SiNextdotjs' },
          { name: 'Vue.js', icon: 'SiVuedotjs' },
          { name: 'Angular', icon: 'SiAngular' },
          { name: 'Svelte', icon: 'SiSvelte' },
          { name: 'Qwik', icon: 'SiQwik' },
        ],
      },
      {
        group: 'Build Tools',
        skills: [
          { name: 'Vite', icon: 'SiVite' },
          { name: 'Webpack', icon: 'SiWebpack' },
          { name: 'Babel', icon: 'SiBabel' },
          { name: 'ESLint', icon: 'SiEslint' },
          { name: 'npm', icon: 'SiNpm' },
          { name: 'pnpm', icon: 'SiPnpm' },
          { name: 'Yarn', icon: 'SiYarn' },
        ],
      },
      {
        group: 'Tooling',
        skills: [
          { name: 'GSAP', icon: 'SiGreensock' },
          { name: 'Sass', icon: 'SiSass' },
          { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
          { name: 'Three.js', icon: 'SiThreedotjs' },
          { name: 'Redux', icon: 'SiRedux' },
          { name: 'React Query', icon: 'SiReactquery' },
          { name: 'Recoil', icon: 'SiRecoil' },
          { name: 'Jotai', icon: 'SiJotai' },
          { name: 'Zustand', icon: 'SiZustand' },
          { name: 'Chakra UI', icon: 'SiChakraui' },
          { name: 'MUI', icon: 'SiMui' },
          { name: 'Radix UI', icon: 'SiRadixui' },
          { name: 'Ant Design', icon: 'SiAntdesign' },
        ],
      },
    ],
  },
  {
    category: 'Backend',
    tag: 'SRV',
    subGroups: [
      {
        group: 'Languages',
        skills: [
          { name: 'Node.js', icon: 'SiNodedotjs' },
          { name: 'Go', icon: 'SiGo' },
          { name: 'Python', icon: 'SiPython' },
          { name: 'Rust', icon: 'SiRust' },
          { name: 'Lua', icon: 'SiLua' },
        ],
      },
      {
        group: 'Frameworks',
        skills: [
          { name: 'Express', icon: 'SiExpress' },
          { name: 'NestJS', icon: 'SiNestjs' },
          { name: 'FastAPI', icon: 'SiFastapi' },
          { name: 'Django', icon: 'SiDjango' },
          { name: 'Gin', icon: 'SiGin' },
          { name: 'Fiber', icon: 'SiFiber' },
        ],
      },
      {
        group: 'Databases',
        skills: [
          { name: 'PostgreSQL', icon: 'SiPostgresql' },
          { name: 'MySQL', icon: 'SiMysql' },
          { name: 'MongoDB', icon: 'SiMongodb' },
          { name: 'Redis', icon: 'SiRedis' },
          { name: 'Firebase', icon: 'SiFirebase' },
          { name: 'Supabase', icon: 'SiSupabase' },
        ],
      },
      {
        group: 'Tooling',
        skills: [
          { name: 'Prisma', icon: 'SiPrisma' },
          { name: 'GraphQL', icon: 'SiGraphql' },
          { name: 'tRPC', icon: 'SiTrpc' },
          { name: 'Socket.IO', icon: 'SiSocketdotio' },
          { name: 'RabbitMQ', icon: 'SiRabbitmq' },
          { name: 'Kafka', icon: 'SiApachekafka' },
          { name: 'JWT', icon: 'SiJsonwebtokens' },
        ],
      },
    ],
  },
  {
    category: 'DevOps & Cloud',
    tag: 'OPS',
    subGroups: [
      {
        group: 'Containers & Cloud',
        skills: [
          { name: 'Docker', icon: 'SiDocker' },
          { name: 'Kubernetes', icon: 'SiKubernetes' },
          { name: 'AWS', icon: 'SiAmazonwebservices' },
          { name: 'DigitalOcean', icon: 'SiDigitalocean' },
        ],
      },
      {
        group: 'CI/CD & VCS',
        skills: [
          { name: 'GitHub Actions', icon: 'SiGithubactions' },
          { name: 'Git', icon: 'SiGit' },
          { name: 'Ansible', icon: 'SiAnsible' },
          { name: 'Terraform', icon: 'SiTerraform' },
        ],
      },
      {
        group: 'Infrastructure',
        skills: [
          { name: 'Nginx', icon: 'SiNginx' },
          { name: 'Linux', icon: 'SiLinux' },
        ],
      },
      {
        group: 'Monitoring',
        skills: [
          { name: 'Datadog', icon: 'SiDatadog' },
          { name: 'Prometheus', icon: 'SiPrometheus' },
          { name: 'Grafana', icon: 'SiGrafana' },
        ],
      },
    ],
  },
  {
    category: 'Automation & Testing',
    tag: 'AUTO',
    subGroups: [
      {
        group: 'Web Scraping',
        skills: [
          { name: 'Selenium', icon: 'SiSelenium' },
          { name: 'Scrapy', icon: 'SiScrapy' },
          { name: 'Puppeteer', icon: 'SiPuppeteer' },
        ],
      },
      {
        group: 'Testing',
        skills: [
          { name: 'Jest', icon: 'SiJest' },
          { name: 'Vitest', icon: 'SiVitest' },
          { name: 'Cypress', icon: 'SiCypress' },
          { name: 'Playwright', icon: 'SiPlaywright' },
        ],
      },
      {
        group: 'Tooling',
        skills: [
          { name: 'Machine Learning', icon: 'SiTensorflow' },
          { name: 'Figma', icon: 'SiFigma' },
          { name: 'Jira', icon: 'SiJira' },
        ],
      },
    ],
  },
];

export interface WorkRole {
  pos: string;
  duration: string;
  title: string;
  highlights: string[];
}

export interface WorkCompany {
  id: number;
  name: string;
  isLatest?: boolean;
  roles: WorkRole[];
}

export const workCompanies: WorkCompany[] = [
  {
    id: 1,
    name: 'Rezerv',
    isLatest: true,
    roles: [
      {
        pos: 'Senior Frontend Engineer',
        duration: 'Oct 2024 — Present',
        title:
          'Leading frontend architecture for a gym, wellness & spa SaaS platform serving businesses across Southeast Asia.',
        highlights: [
          'Led the development, maintenance, and enhancement of a scalable frontend codebase, ensuring alignment with business and project objectives',
          'Optimized application performance by leveraging modern tools, frameworks, and frontend architecture best practices to deliver a fast and seamless user experience',
          'Refactored and modernized legacy code, migrating to maintainable and high-performance technologies to improve development efficiency and long-term scalability',
          'Researched, designed, and implemented robust API integrations, ensuring smooth data flow and system interoperability across services',
          'Owned the frontend deployment lifecycle, establishing and managing CI/CD pipelines for streamlined delivery and continuous improvement',
          'Collaborated with DevOps to manage AWS infrastructure for frontend hosting, enhancing reliability, scalability, and performance',
          'Acted as a technical mentor and contributor, promoting clean code, maintainability, and performance-focused development culture',
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Codigo — The Mobile App Company',
    roles: [
      {
        pos: 'Lead Software Engineer — JavaScript/TypeScript',
        duration: 'Jan 2024 — Oct 2024',
        title:
          'Led technical direction for enterprise client projects at a Singapore mobile & web agency.',
        highlights: [
          'Architected and orchestrated a centralized design system and mission-critical features for enterprise platforms including AIA Singapore and Trifecta, ensuring cross-project UI consistency and long-term architectural scalability',
          'Engineered a high-concurrency live video streaming platform for international sports broadcasting. Led a team of four developers to implement a Node.js backend and a Next.js (App Router) frontend, integrating the Brightcove SDK for low-latency, adaptive bitrate streaming',
          'Hardened system infrastructure and security by implementing advanced authentication layers and high-concurrency optimizations. Managed deployment and scaling on AWS, utilizing Nginx for load balancing to ensure high availability for global audiences',
          'Accelerated deployment cycles by designing and maintaining CI/CD pipelines, reducing manual intervention and ensuring architectural consistency across production environments',
          'Increased organizational development velocity by authoring comprehensive technical documentation and auditing internal workflows to eliminate architectural redundancies and technical debt',
        ],
      },
      {
        pos: 'Senior Software Engineer — JavaScript/TypeScript',
        duration: 'Jan 2023 — Dec 2023',
        title:
          'Took ownership of the 7-Eleven Singapore e-commerce platform, leading a team of 3 developers.',
        highlights: [
          'Led the development of the 7-Eleven Singapore e-commerce platform, managing a team of three developers to ensure high-quality technical execution and on-time delivery',
          'Implemented advanced scalability and maintenance strategies, including custom API caching, design patterns, and fine-grained performance tuning to optimize web application responsiveness',
          'Facilitated technical alignment with business goals by communicating directly with stakeholders and business associates to translate requirements into scalable software solutions',
          'Collaborated with cross-functional teams (UI/UX, QA, Product) to conduct feature research and iterative improvements, consistently elevating the overall user experience and system reliability',
        ],
      },
      {
        pos: 'Software Engineer — JavaScript/TypeScript',
        duration: 'Sep 2021 — Jan 2023',
        title:
          'Built full-stack web applications for enterprise clients across Singapore.',
        highlights: [
          'Developed and optimized full-stack web applications using Node.js, TypeScript, and React, ensuring high-quality software delivery',
          'Refactored legacy codebases and improved API performance by 40% through the implementation of efficient data-fetching strategies and React Query',
          'Collaborated with cross-functional teams, including UI/UX, QA, and business associates, to translate requirements into technical features',
          'Contributed to architectural discussions to enhance system design and improve long-term codebase maintainability',
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Freelance',
    roles: [
      {
        pos: 'Full Stack Developer',
        duration: 'Aug 2020 — Sep 2021',
        title:
          'Delivered multiple full-stack projects remotely across diverse client domains.',
        highlights: [
          'Developed and delivered multiple projects using modern frontend frameworks such as React, Vue.js, and AngularJS, alongside backend technologies including Node.js (Express, NestJS and NextJs), Python (Django), PHP (Laravel)',
          'Gained extensive hands-on experience in full-stack development, from architecture design to deployment',
          'Diagnosed and resolved complex technical challenges, such as optimizing web application performance through effective caching strategies, code refactoring, and adopting industry best practices to improve scalability and maintainability',
          'Strengthened problem-solving, adaptability, and client communication skills through diverse freelance projects across various domains',
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'MM-Digital-Solutions',
    roles: [
      {
        pos: 'Software Engineer — Python (AI, ML, Web Automation)',
        duration: 'Jan 2020 — Mar 2021',
        title:
          'Built end-to-end Python automation and ML systems for enterprise clients.',
        highlights: [
          'Developed end-to-end Python solutions including fully automated web crawlers using Selenium, Scrapy, and Beautiful Soup for large-scale data extraction and business intelligence',
          'Built automation systems and cron-based task schedulers on Linux (Ubuntu) to streamline backend workflows and reduce manual operations',
          'Delivered an automation program for 5BB Internet Service Provider, designed to automatically process and manage operational tasks, significantly improving efficiency and accuracy',
          'Conducted extensive R&D in data analysis and machine learning, utilizing NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow',
          'Developed innovative ML prototypes including automated car parking space detection using computer vision, real-time person detection and analytics for building security systems, and facial and hair recognition models to suggest personalized hairstyles using deep learning',
          'Enhanced Python application performance through code optimization, best practices, and modular design for maintainability and scalability',
          'Integrated machine learning models and APIs into production-ready Python applications to deliver advanced data insights and predictive capabilities',
        ],
      },
    ],
  },
];

// Keep backward compat for old references
export const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Go', 'Express', 'NestJS', 'Django'],
  'database & infra': ['PostgreSQL', 'MySQL', 'Redis', 'Docker', 'AWS', 'CI/CD'],
  'automation & tools': ['Git', 'Selenium', 'Scrapy', 'Linux', 'Vite', 'Kubernetes'],
};
