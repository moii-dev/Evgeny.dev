export interface TechItem {
  name: string;
  category: 'mobile' | 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  icon: string; // identifier or SVG type
  level?: string;
  highlight?: boolean;
}

export const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'mobile', label: 'Mobile Development' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database & Infra' },
  { id: 'tools', label: 'Tools & Workflow' },
] as const;

export const TECH_STACK: TechItem[] = [
  // Mobile
  {
    name: 'Kotlin',
    category: 'mobile',
    description: 'First-class language for native Android apps, Coroutines & Flow',
    icon: 'kotlin',
    highlight: true,
  },
  {
    name: 'Android SDK',
    category: 'mobile',
    description: 'Modern Android architecture, Jetpack libraries & system APIs',
    icon: 'android',
    highlight: true,
  },
  {
    name: 'Jetpack Compose',
    category: 'mobile',
    description: 'Declarative modern UI toolkit, state hoisting & animations',
    icon: 'compose',
    highlight: true,
  },
  {
    name: 'CameraX & ML Kit',
    category: 'mobile',
    description: 'Camera hardware integration, on-device barcode/vision scanning',
    icon: 'camera',
  },
  {
    name: 'Room Database',
    category: 'mobile',
    description: 'SQLite abstraction layer with type safety & Flow observation',
    icon: 'database',
  },
  {
    name: 'Material 3',
    category: 'mobile',
    description: 'Dynamic color tokens, accessible components & elevation system',
    icon: 'material',
  },

  // Frontend
  {
    name: 'React',
    category: 'frontend',
    description: 'Component architecture, custom hooks & concurrent rendering',
    icon: 'react',
    highlight: true,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    description: 'Strict type safety, generics, interfaces & API contracts',
    icon: 'typescript',
    highlight: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first styling, design systems & responsive grids',
    icon: 'tailwind',
    highlight: true,
  },
  {
    name: 'Vite',
    category: 'frontend',
    description: 'High-speed ESM bundler, dev server & build pipeline',
    icon: 'vite',
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    description: 'Fluid spring physics, layout animations & gestures',
    icon: 'motion',
  },
  {
    name: 'HTML5 Canvas',
    category: 'frontend',
    description: '2D graphic rendering, frame-by-frame animation & interactive editors',
    icon: 'canvas',
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    description: 'Event-driven JavaScript runtime for scalable APIs & microservices',
    icon: 'nodejs',
    highlight: true,
  },
  {
    name: 'Express',
    category: 'backend',
    description: 'RESTful API endpoints, middleware pipelines & authentication',
    icon: 'express',
  },
  {
    name: 'WebSockets',
    category: 'backend',
    description: 'Bidirectional real-time communication for messaging & live feeds',
    icon: 'websocket',
  },

  // Database & Infrastructure
  {
    name: 'PostgreSQL',
    category: 'database',
    description: 'ACID relational database, complex queries & schema migrations',
    icon: 'postgresql',
    highlight: true,
  },
  {
    name: 'Docker',
    category: 'database',
    description: 'Containerization, reproducible environments & deployment',
    icon: 'docker',
  },
  {
    name: 'Linux',
    category: 'database',
    description: 'Server administration, bash scripting & production environments',
    icon: 'linux',
  },

  // Tools & Workflow
  {
    name: 'Git & GitHub',
    category: 'tools',
    description: 'Version control, feature branching, CI/CD & open-source collaboration',
    icon: 'git',
    highlight: true,
  },
  {
    name: 'Android Studio',
    category: 'tools',
    description: 'Native profiling, APK optimization, layout inspector & emulator',
    icon: 'androidstudio',
    highlight: true,
  },
  {
    name: 'Figma',
    category: 'tools',
    description: 'UI/UX prototyping, design systems & developer handoff',
    icon: 'figma',
  },
  {
    name: 'VS Code',
    category: 'tools',
    description: 'Modern development environment, extensions & linting',
    icon: 'vscode',
  },
];
