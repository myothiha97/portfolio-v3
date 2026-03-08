export const navLinks = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'About', href: '/about' },
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
    duration: '2024 - Present',
    title:
      'Building fitness, wellness & spa management software for the Singapore market. Leading frontend architecture with React and TypeScript, driving performance optimizations and team best practices.',
    icon: '/assets/framer.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'SPOTV',
    pos: 'Senior Frontend Engineer',
    duration: '2024',
    title:
      "Developed high-performance streaming platform features for one of Asia's leading sports broadcasting networks. Focused on real-time video delivery and responsive cross-platform experiences.",
    icon: '/assets/figma.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Codigo',
    pos: 'Lead Frontend Engineer',
    duration: '2021 - 2024',
    title:
      'Led frontend development at a Singapore app development company. Shipped products for clients including 7-Eleven, Resorts World Sentosa, and Yoga Movement. Mentored junior developers and established coding standards.',
    icon: '/assets/notion.svg',
    animation: 'salute',
  },
];

export const skills = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Vue', 'Angular', 'Three.js', 'GSAP', 'Tailwind CSS'],
  backend: ['Node.js', 'Go', 'Python', 'FastAPI', 'Express', 'REST API', 'GraphQL'],
  infrastructure: ['Docker', 'PostgreSQL', 'Redis', 'CI/CD', 'Nginx', 'Linux'],
  tools: ['Git', 'WebSocket', 'Module Federation', 'Webpack', 'Vite', 'Figma'],
};
