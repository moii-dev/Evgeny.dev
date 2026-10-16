import { Project } from '../types/project';

/**
 * FEATURED_PROJECTS (Selected Projects)
 *
 * Curated Selection of moii-dev's Strongest, Most Technical & Visually Compelling Public Repositories:
 *
 * 01. FreeChat (Android AI Assistant & Full-Stack Cloud Routing)
 *     - Kotlin, Jetpack Compose, Material 3, Node.js, PostgreSQL
 *     - Flagship project per user specification
 *
 * 02. WorldBox-React (Interactive 2D World Simulation Sandbox & Civilization Engine)
 *     - React 19, TypeScript 5.8, HTML5 Canvas, Procedural Generation
 *     - Procedural continents, cellular automata, kingdom diplomacy & god powers
 *     - Includes real 1672x941 game screenshot (world-menu-background.png)
 *
 * 03. Figmint (Local-First Vector Design & Interactive Prototyping Studio)
 *     - React 19, TypeScript, HTML5 Canvas, Vector Geometry & Bezier Math
 *     - Infinite canvas, layer tree, vector pen, Smart Animate, multi-format export
 *
 * 04. Luma (Emotional Rhythm & Mood Tracking App with Dynamic Aura Generator)
 *     - Kotlin, Jetpack Compose, Room DB, Android Desktop Widgets, Canvas Shaders
 *     - Includes real 1280x2856 mobile screenshot (build-luma-aura.png)
 *
 * Excluded per user instructions:
 * - Вкапибара (excluded)
 * - Multi-pulti (excluded)
 * - FocusLock (excluded)
 */
export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'freechat',
    number: '01',
    title: 'FreeChat',
    category: 'Android Application / AI Platform',
    description: 'Android AI chat client with server-side AI routing, screen assistant, Telegram/VK auth, and Node.js/PostgreSQL backend.',
    longDescription:
      'Полнофункциональный мобильный AI-ассистент для Android с серверной маршрутизацией запросов, экранным помощником, распознаванием изображений и документов, публичными ссылками на чаты и бэкендом на Node.js/PostgreSQL. Разработан на Kotlin с использованием Jetpack Compose, Material 3 и чистой архитектуры (MVVM / Clean Architecture).',
    tags: ['Kotlin', 'Jetpack Compose', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/moii-dev/FreeChat',
    stars: 2,
    language: 'Kotlin',
    featured: true,
    updatedAt: '2026-08-23',
    cover: {
      variant: 'single',
      backgroundTheme: 'silver',
      logoUrl: '/assets/projects/freechat/logo_transparent.png',
      badgeText: 'Kotlin · Compose · Cloud Routing',
      caption: 'Android AI chat client with screen assistant & neural streaming',
      altText: 'FreeChat Android AI Chat Application',
    },
  },
  {
    id: 'worldbox-react',
    number: '02',
    title: 'WorldBox-React',
    category: 'Web Game / Simulation Engine',
    description: 'Interactive 2D world & civilization sandbox simulator with procedural terrain, cellular automata climate, and autonomous kingdoms.',
    longDescription:
      'Комплексный симулятор цивилизаций и процедурной экосистемы на React 19, TypeScript и HTML5 Canvas. Включает процедурную генерацию континентов, островов и архипелагов с воспроизводимыми сидами, симуляцию климатических зон, автономное население (профессии, старение, семьи), эволюцию королевств, дипломатию, торговлю, войну и божественные силы с частицами.',
    tags: ['React 19', 'TypeScript', 'HTML5 Canvas', 'Simulation Engine'],
    githubUrl: 'https://github.com/moii-dev/WorldBox-React',
    stars: 0,
    language: 'TypeScript',
    featured: true,
    updatedAt: '2026-09-22',
    cover: {
      variant: 'single',
      backgroundTheme: 'slate',
      primaryImage: '/assets/projects/worldbox/world-menu-background.webp',
      badgeText: 'React 19 · Canvas · Procedural Gen',
      caption: 'Interactive 2D world sandbox simulator with procedural continent generation',
      altText: 'WorldBox-React 2D World Simulation Sandbox',
      objectFit: 'cover',
    },
  },
  {
    id: 'figmint',
    number: '03',
    title: 'Figmint',
    category: 'Web App / Vector Design Studio',
    description: 'Local-first vector design & interactive prototyping studio with infinite canvas, layer tree, vector pen, and Smart Animate.',
    longDescription:
      'Figma-подобный независимый локально-ориентированный векторный редактор на React и TypeScript. Бесконечный холст с панорамированием и плавным масштабированием, трансформация объектов, векторное перо с кривыми Безье, маски, булевы операции над фигурами, интерактивные связи прототипов со Smart Animate и экспорт в SVG/PNG/JSON.',
    tags: ['TypeScript', 'React', 'HTML5 Canvas', 'Vector Math'],
    githubUrl: 'https://github.com/moii-dev/Figmint',
    stars: 0,
    language: 'TypeScript',
    featured: true,
    updatedAt: '2026-08-25',
    cover: {
      variant: 'single',
      backgroundTheme: 'silver',
      logoUrl: '/assets/projects/figmint/logo.svg',
      badgeText: 'React · Infinite Canvas · Prototyping',
      caption: 'Local-first vector graphics editor and interactive prototyping tool',
      altText: 'Figmint Vector Canvas Editor',
    },
  },
  {
    id: 'luma',
    number: '04',
    title: 'Luma',
    category: 'Android / Lifestyle & Wellness',
    description: 'Android emotional rhythm & mood tracking app featuring dynamic Aura visualization generator, desktop widgets, and Room database.',
    longDescription:
      'Luma (Pulse) — Android-приложение на Jetpack Compose для трекинга эмоционального состояния и ритма дня. Включает процедурную генерацию градиентной ауры (Pulse Aura) на базе Canvas, интерактивные виджеты рабочего стола для быстрого логирования, помесячную аналитику настроения и локальное хранилище Room.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Android Widgets'],
    githubUrl: 'https://github.com/moii-dev/Luma',
    stars: 0,
    language: 'Kotlin',
    featured: true,
    updatedAt: '2026-09-12',
    cover: {
      variant: 'single',
      backgroundTheme: 'warm-gray',
      primaryImage: '/assets/projects/luma/build-luma-aura.webp',
      badgeText: 'Jetpack Compose · Room · Widgets',
      caption: 'Personal emotional rhythm tracker with dynamic Aura generation',
      altText: 'Luma Pulse Aura Android App',
      objectFit: 'contain',
    },
  },
];

/**
 * All local projects representing the full public catalog of moii-dev.
 */
export const ALL_LOCAL_PROJECTS: Project[] = [
  ...FEATURED_PROJECTS,
  {
    id: 'onepass',
    number: '05',
    title: 'OnePass',
    category: 'Extension / Security',
    description: 'Local TOTP/HOTP two-factor authenticator for Chromium browsers with client-side Web Crypto AES-GCM encryption and PIN.',
    longDescription:
      'Локальный TOTP/HOTP-аутентификатор для Chromium-браузеров с аппаратным шифрованием Web Crypto API (AES-GCM, PBKDF2), распознаванием QR-кодов с экрана или буфера, PIN-защитой и резервным копированием.',
    tags: ['JavaScript', 'Web Crypto', 'TOTP', 'Security'],
    githubUrl: 'https://github.com/moii-dev/OnePass',
    stars: 0,
    language: 'JavaScript',
    featured: false,
    updatedAt: '2026-08-23',
    cover: {
      variant: 'single',
      backgroundTheme: 'silver',
      logoUrl: '/assets/projects/onepass/icon128.png',
      badgeText: 'TOTP 2FA Authenticator',
      caption: 'Local encrypted browser authenticator',
    },
  },
  {
    id: 'voroboff-bank',
    number: '06',
    title: 'VorobOFF-Bank',
    category: 'Web App / Interactive Game',
    description: 'Mobile banking clicker game in React 19 featuring balance management, upgrade store, transfers, and wheel of fortune.',
    longDescription:
      'Интерактивное веб-приложение в формате мобильного банковского интерфейса на React 19, TypeScript, Vite 6 и Tailwind CSS. Включает кликер-механики, магазин улучшений, финансовые переводы контактам, историю транзакций и мини-игру с колесом удачи.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion'],
    githubUrl: 'https://github.com/moii-dev/VorobOFF-Bank',
    stars: 0,
    language: 'TypeScript',
    featured: false,
    updatedAt: '2026-09-08',
    cover: {
      variant: 'single',
      backgroundTheme: 'slate',
      badgeText: 'React 19 · Motion · Tailwind',
      caption: 'Mobile banking simulator & clicker interface',
    },
  },
  {
    id: 'yandex-adblocker',
    number: '07',
    title: 'Yandex Search AdBlocker',
    category: 'Extension / Utility',
    description: 'Lightweight browser extension filtering sponsored ad units from Yandex search results.',
    longDescription:
      'Yandex Search AdBlocker — легкое браузерное расширение Manifest V3, которое скрывает рекламные блоки в поисковой выдаче Яндекса. Реализовано на JavaScript с DOM API.',
    tags: ['JavaScript', 'Chrome MV3', 'DOM API'],
    githubUrl: 'https://github.com/moii-dev/Yandex-AdBlocker',
    stars: 4,
    language: 'JavaScript',
    featured: false,
    updatedAt: '2026-09-15',
    cover: {
      variant: 'single',
      backgroundTheme: 'neutral',
      primaryImage: '/assets/projects/yandex-adblocker/banner.webp',
      badgeText: 'Chrome MV3 · Search Filter',
      caption: 'Zero-overhead search ad filter for Chromium browsers',
    },
  },
  {
    id: 'qr-scanner',
    number: '08',
    title: 'QR-Scanner',
    category: 'Android / Camera & ML Kit',
    description: 'High-performance QR & barcode scanner and generator for Android built with CameraX, Google ML Kit, and Room Database.',
    longDescription:
      'Сканер и генератор QR/штрихкодов для Android на Jetpack Compose, CameraX, Google ML Kit и Room Database. Поддерживает мгновенное распознавание, сохранение истории и экспорт.',
    tags: ['Kotlin', 'Jetpack Compose', 'CameraX', 'ML Kit'],
    githubUrl: 'https://github.com/moii-dev/QR-Scanner',
    stars: 0,
    language: 'Kotlin',
    featured: false,
    updatedAt: '2026-08-23',
    cover: {
      variant: 'single',
      backgroundTheme: 'neutral',
      logoUrl: '/assets/projects/qr-scanner/app_icon.png',
      badgeText: 'CameraX · ML Kit · Room DB',
      caption: 'Real-time CameraX detection and barcode engine',
    },
  },
  {
    id: 'gamma-cleaner',
    number: '09',
    title: 'PPTX / PDF Watermark Cleaner',
    category: 'Desktop Tool / Document Processing',
    description: 'Windows utility (.NET & Python PyMuPDF) for removing Gamma presentation watermarks from PowerPoint and PDF files.',
    longDescription:
      'Десктопная утилита для Windows на .NET Framework и Python PyMuPDF, очищающая водяные знаки Gamma из презентаций PowerPoint (Open XML) и документов PDF.',
    tags: ['C#', '.NET', 'Python', 'PyMuPDF'],
    githubUrl: 'https://github.com/moii-dev/GAMMA-PPTX-Watermark-Cleaner',
    stars: 0,
    language: 'C#',
    featured: false,
    updatedAt: '2026-08-15',
    cover: {
      variant: 'single',
      backgroundTheme: 'neutral',
      logoUrl: '/assets/projects/gamma-cleaner/app_logo.webp',
      badgeText: '.NET · Python · OpenXML',
      caption: 'PPTX & PDF document watermark cleaner',
    },
  },
  {
    id: 'block-yandex-game',
    number: '10',
    title: 'Block Yandex Games',
    category: 'Extension / Productivity',
    description: 'DeclarativeNetRequest Chrome Manifest V3 extension blocking Yandex games navigation.',
    longDescription:
      'Легкое расширение Manifest V3 для Chromium-браузеров, блокирующее переходы на страницы Яндекс Игр с нулевыми накладными расходами памяти.',
    tags: ['JavaScript', 'Manifest V3', 'DeclarativeNetRequest'],
    githubUrl: 'https://github.com/moii-dev/Block-Yandex-Game',
    stars: 0,
    language: 'JavaScript',
    featured: false,
    updatedAt: '2026-08-10',
    cover: {
      variant: 'single',
      backgroundTheme: 'neutral',
      primaryImage: '/assets/projects/block-yandex-game/logo.webp',
      badgeText: 'Chrome MV3 · declarativeNetRequest',
      caption: 'Lightweight web navigation filter',
    },
  },
  {
    id: 'codex-skills',
    number: '11',
    title: 'Codex Skills',
    category: 'Developer Tools / CLI',
    description: 'Curated developer workflow skills and execution modules for Codex AI agent environment.',
    longDescription:
      'Коллекция модулей и скиллов для Codex AI для безопасного выполнения инженерных задач, структурирования изменений и проектирования интерфейсов.',
    tags: ['CLI', 'Automation', 'Workflow', 'Developer Experience'],
    githubUrl: 'https://github.com/moii-dev/codex-skills',
    stars: 3,
    language: 'Shell',
    featured: false,
    updatedAt: '2026-09-04',
    cover: {
      variant: 'single',
      backgroundTheme: 'gray',
      badgeText: 'Developer Experience · CLI',
      caption: 'Agent modules for terminal workflows',
    },
  },
  // Explicitly excluded from featured per prompt:
  {
    id: 'focuslock',
    number: '12',
    title: 'FocusLock',
    category: 'Extension / Productivity',
    description: 'Chrome extension for managing Page Visibility and focus signals. (Excluded from featured)',
    longDescription:
      'Расширение Chrome Manifest V3 для управления сигналами видимости и фокуса на выбранных сайтах.',
    tags: ['JavaScript', 'Chrome Extensions', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/moii-dev/FocusLock',
    stars: 0,
    language: 'JavaScript',
    featured: false,
    updatedAt: '2026-10-02',
    cover: {
      variant: 'single',
      backgroundTheme: 'slate',
      logoUrl: '/assets/projects/focuslock/icon128.png',
      badgeText: 'Chrome MV3 · StayActive',
      caption: 'Page Visibility & Focus Signals Control',
    },
  },
  {
    id: 'multipulti',
    number: '13',
    title: 'MultiPulti',
    category: 'Web Tool / Animation',
    description: 'Web editor for digital drawing and frame-by-frame 2D animation in browser. (Excluded from featured)',
    longDescription:
      'Веб-редактор для рисования и создания покадровой анимации в браузере на React, TypeScript и HTML5 Canvas.',
    tags: ['React', 'TypeScript', 'Canvas', 'Vite'],
    githubUrl: 'https://github.com/moii-dev/MultiPulti',
    stars: 1,
    language: 'TypeScript',
    featured: false,
    updatedAt: '2026-10-09',
    cover: {
      variant: 'single',
      backgroundTheme: 'slate',
      primaryImage: '/assets/projects/multipulti/screenshot.webp',
      logoUrl: '/assets/projects/multipulti/logo.png',
      badgeText: 'Canvas · Frame-by-Frame',
    },
  },
  {
    id: 'vkapibara',
    number: '14',
    title: 'Вкапибара',
    category: 'Android / Customization',
    description: 'Custom social client for Android with dark theme. (Excluded from featured)',
    longDescription:
      'Кастомизированный мобильный клиент для социальной сети с упором на эстетичную темную тему.',
    tags: ['Android', 'Java', 'Kotlin'],
    githubUrl: 'https://github.com/moii-dev',
    stars: 1,
    language: 'Kotlin',
    featured: false,
    updatedAt: '2026-07-15',
    cover: {
      variant: 'single',
      backgroundTheme: 'gray',
      badgeText: 'Android Mod',
    },
  },
];
