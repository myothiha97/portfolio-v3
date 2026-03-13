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
    duration: 'Mar 2024 — Present',
    title:
      'Leading frontend architecture for a gym, wellness & spa SaaS platform serving businesses across Southeast Asia. Spearheading migration from legacy codebase to modern React + TypeScript stack with significant performance improvements.',
    highlights: [
      'Architected and implemented new frontend platform with React, TypeScript, React Query, and Recoil state management',
      'Designed robust REST API integration layer and component library with Chakra UI',
      'Owned CI/CD pipelines on AWS — automated deployments, staging environments, and monitoring with Datadog',
      'Mentored junior developers on code quality, testing best practices, and performance optimization',
    ],
    tags: ['React', 'TypeScript', 'React Query', 'Recoil', 'Chakra UI', 'AWS', 'Node.js'],
    icon: '/assets/framer.svg',
  },
  {
    id: 2,
    name: 'Codigo — The Mobile App Company',
    pos: 'Lead Software Engineer',
    duration: 'Jun 2023 — Mar 2024',
    title:
      'Promoted to Lead — driving technical direction for client projects and managing a team of 3–4 engineers. Responsible for architecture decisions, code review standards, sprint planning, and direct client communication.',
    highlights: [
      'Led development of 7-Eleven Singapore e-commerce platform — product catalog, cart system, payment integration, and store locator',
      'Architected frontend for SPOTV live sports streaming with Brightcove SDK — handling real-time video, EPG, and subscription flows',
      'Established team coding standards, PR review process, and documentation practices that reduced bug rate by 35%',
      'Interfaced with product managers and stakeholders from AIA, RWS Singapore, and other enterprise clients',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    icon: '/assets/notion.svg',
  },
  {
    id: 3,
    name: 'Codigo — The Mobile App Company',
    pos: 'Senior Software Engineer',
    duration: 'Jun 2022 — Jun 2023',
    title:
      'Promoted to Senior — taking ownership of full project lifecycles from architecture design to production deployment. Built scalable design systems and improved API performance across multiple client projects.',
    highlights: [
      'Designed and built reusable component libraries and design systems for AIA and Trifecta projects',
      'Optimized API response handling and frontend state management — improved page load times by 40%',
      'Implemented comprehensive testing strategies with Jest and Cypress, achieving 80%+ code coverage',
      'Mentored 2 junior engineers through code pairing sessions and technical knowledge sharing',
    ],
    tags: ['React', 'Vue.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker'],
    icon: '/assets/notion.svg',
  },
  {
    id: 4,
    name: 'Codigo — The Mobile App Company',
    pos: 'Software Engineer',
    duration: 'May 2021 — Jun 2022',
    title:
      'Joined as a JavaScript/TypeScript engineer building web applications for enterprise clients across Singapore. Rapidly grew from implementation-focused to driving architectural discussions.',
    highlights: [
      'Built interactive web applications for Kcuts CMS, Yoga Movement, and Neuroglee Health using React and Recoil',
      'Developed backend services with Node.js and Express, integrating with PostgreSQL and third-party APIs',
      'Implemented responsive, cross-browser compatible UIs with pixel-perfect Figma-to-code translation',
      'Contributed to R&D initiatives exploring new frameworks and performance optimization techniques',
    ],
    tags: ['React', 'JavaScript', 'Node.js', 'Express', 'Recoil', 'Bootstrap'],
    icon: '/assets/notion.svg',
  },
  {
    id: 5,
    name: 'MM-Digital-Solutions',
    pos: 'Software Engineer — Python',
    duration: 'Sep 2020 — Apr 2021',
    title:
      'Built end-to-end web automation systems and machine learning prototypes. Specialized in Python-based crawling, data pipelines, and computer vision applications for enterprise clients.',
    highlights: [
      'Engineered web crawlers and automation systems with Selenium, Scrapy, and Beautiful Soup for 5BB ISP',
      'Developed ML-powered computer vision prototypes — parking space analytics, security monitoring, and facial recognition',
      'Built data processing pipelines handling 100K+ daily records with automated scheduling and error recovery',
      'Deployed automation solutions on Linux servers with cron-based orchestration and monitoring dashboards',
    ],
    tags: ['Python', 'Selenium', 'Scrapy', 'Machine Learning', 'Linux', 'Docker'],
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

// Keep backward compat for old references
export const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Go', 'Express', 'NestJS', 'Django'],
  'database & infra': ['PostgreSQL', 'MySQL', 'Redis', 'Docker', 'AWS', 'CI/CD'],
  'automation & tools': ['Git', 'Selenium', 'Scrapy', 'Linux', 'Vite', 'Kubernetes'],
};
