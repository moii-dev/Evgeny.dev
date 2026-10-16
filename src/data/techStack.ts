import en from '../i18n/locales/en.json';
export interface TechItem {
  name: string;
  category: 'mobile' | 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  icon: string; // identifier or SVG type
  level?: string;
  highlight?: boolean;
}

export const TECH_CATEGORIES = [
  { id: 'all', label: en["All Technologies"] },
  { id: 'mobile', label: en["Mobile Development"] },
  { id: 'frontend', label: en["Frontend"] },
  { id: 'backend', label: en["Backend"] },
  { id: 'database', label: en["Database & Infra"] },
  { id: 'tools', label: en["Tools & Workflow"] },
] as const;

export const TECH_STACK: TechItem[] = [
  // Mobile
  {
    name: 'Kotlin',
    category: 'mobile',
    description: en["First-class language for native Android apps, Coroutines & Flow"],
    icon: 'kotlin',
    highlight: true,
  },
  {
    name: 'Android SDK',
    category: 'mobile',
    description: en["Modern Android architecture, Jetpack libraries & system APIs"],
    icon: 'android',
    highlight: true,
  },
  {
    name: 'Jetpack Compose',
    category: 'mobile',
    description: en["Declarative modern UI toolkit, state hoisting & animations"],
    icon: 'compose',
    highlight: true,
  },
  {
    name: 'CameraX & ML Kit',
    category: 'mobile',
    description: en["Camera hardware integration, on-device barcode/vision scanning"],
    icon: 'camera',
  },
  {
    name: 'Room Database',
    category: 'mobile',
    description: en["SQLite abstraction layer with type safety & Flow observation"],
    icon: 'database',
  },
  {
    name: 'Material 3',
    category: 'mobile',
    description: en["Dynamic color tokens, accessible components & elevation system"],
    icon: 'material',
  },

  // Frontend
  {
    name: 'React',
    category: 'frontend',
    description: en["Component architecture, custom hooks & concurrent rendering"],
    icon: 'react',
    highlight: true,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    description: en["Strict type safety, generics, interfaces & API contracts"],
    icon: 'typescript',
    highlight: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: en["Utility-first styling, design systems & responsive grids"],
    icon: 'tailwind',
    highlight: true,
  },
  {
    name: 'Vite',
    category: 'frontend',
    description: en["High-speed ESM bundler, dev server & build pipeline"],
    icon: 'vite',
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    description: en["Fluid spring physics, layout animations & gestures"],
    icon: 'motion',
  },
  {
    name: 'HTML5 Canvas',
    category: 'frontend',
    description: en["2D graphic rendering, frame-by-frame animation & interactive editors"],
    icon: 'canvas',
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    description: en["Event-driven JavaScript runtime for scalable APIs & microservices"],
    icon: 'nodejs',
    highlight: true,
  },
  {
    name: 'Express',
    category: 'backend',
    description: en["RESTful API endpoints, middleware pipelines & authentication"],
    icon: 'express',
  },
  {
    name: 'WebSockets',
    category: 'backend',
    description: en["Bidirectional real-time communication for messaging & live feeds"],
    icon: 'websocket',
  },

  // Database & Infrastructure
  {
    name: 'PostgreSQL',
    category: 'database',
    description: en["ACID relational database, complex queries & schema migrations"],
    icon: 'postgresql',
    highlight: true,
  },
  {
    name: 'Docker',
    category: 'database',
    description: en["Containerization, reproducible environments & deployment"],
    icon: 'docker',
  },
  {
    name: 'Linux',
    category: 'database',
    description: en["Server administration, bash scripting & production environments"],
    icon: 'linux',
  },

  // Tools & Workflow
  {
    name: 'Git & GitHub',
    category: 'tools',
    description: en["Version control, feature branching, CI/CD & open-source collaboration"],
    icon: 'git',
    highlight: true,
  },
  {
    name: 'Android Studio',
    category: 'tools',
    description: en["Native profiling, APK optimization, layout inspector & emulator"],
    icon: 'androidstudio',
    highlight: true,
  },
  {
    name: 'Figma',
    category: 'tools',
    description: en["UI/UX prototyping, design systems & developer handoff"],
    icon: 'figma',
  },
  {
    name: 'VS Code',
    category: 'tools',
    description: en["Modern development environment, extensions & linting"],
    icon: 'vscode',
  },
];
