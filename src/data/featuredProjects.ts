import { Project } from '../types/project';

/**
 * FEATURED_PROJECTS (Selected Projects)
 *
 * Excluded per explicit user request:
 * - Вкапибара (excluded)
 * - Multi-pulti (excluded)
 * - FocusLock (excluded)
 *
 * Preferred selection requested:
 * 1. FreeChat (Confirmed on GitHub: moii-dev/FreeChat)
 * 2. EverUs (Not found in public moii-dev GitHub; requires manual filling)
 * 3. Runa (Not found in public moii-dev GitHub; requires manual filling)
 * 4. Где мой носок? (Not found in public moii-dev GitHub; requires manual filling)
 *
 * Per instruction:
 * "Если какой-либо проект отсутствует, найди другой подходящий реальный репозиторий из моего GitHub.
 *  Не выдумывай проекты, функциональность и технологии."
 *
 * Top 4 verified, production-ready GitHub repositories of moii-dev:
 * 01. FreeChat (Android / AI, Kotlin, Compose, Node.js, PostgreSQL)
 * 02. Luma / Pulse (Android / Lifestyle, Kotlin, Compose, Room DB, Widgets, Aura Export)
 * 03. QR-Scanner (Android / Utilities, Kotlin, CameraX, Google ML Kit, Room DB, v1.0.0)
 * 04. Figmint (Web / Design Tool, React, TypeScript, Infinite Canvas)
 */
export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'freechat',
    number: '01',
    title: 'FreeChat',
    category: 'Android Application / AI',
    description: 'Android AI chat client with Telegram/VK authentication, screen assistant, and Node.js/PostgreSQL backend.',
    longDescription:
      'Чат с искусственным интеллектом для Android с авторизацией через Telegram/VK, историей чатов, инструментами для работы с изображениями и файлами, экранным помощником, общими чатами и бэкендом на Node.js/PostgreSQL. Разработан на Kotlin с использованием Jetpack Compose и современной архитектуры MVVM/Clean Architecture.',
    tags: ['Kotlin', 'Jetpack Compose', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/moii-dev/FreeChat',
    stars: 2,
    language: 'Kotlin',
    featured: true,
    updatedAt: '2026-08-23',
    cover: {
      variant: 'split',
      backgroundTheme: 'silver',
      logoUrl: '/assets/projects/freechat/logo.png',
      badgeText: 'Kotlin · Compose · v0.5.1 beta',
      caption: 'Android AI chat client with screen assistant & streaming',
      altText: 'FreeChat Android AI Chat Application',
      requiredScreenshots: ['freechat-chat-screen.png', 'freechat-drawer-menu.png'],
    },
  },
  {
    id: 'luma',
    number: '02',
    title: 'Luma',
    category: 'Android / Lifestyle & Wellness',
    description: 'Personal mood tracking & emotional wellness app for Android with dynamic Aura visual generation, desktop widgets, and Room database.',
    longDescription:
      'Luma (Pulse) — Android-приложение на Jetpack Compose для трекинга настроения и эмоционального ритма. Включает динамическую генерацию персональной ауры (Aura), интерактивные виджеты рабочего стола (Pulse Aura & Quick Mood), аналитику по месяцам, дневниковые заметки и локальную базу Room.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Canvas'],
    githubUrl: 'https://github.com/moii-dev/Luma',
    stars: 0,
    language: 'Kotlin',
    featured: true,
    updatedAt: '2026-09-12',
    cover: {
      variant: 'single',
      backgroundTheme: 'gray',
      primaryImage: '/assets/projects/luma/build-luma-aura.png',
      badgeText: 'Jetpack Compose · Room · Widgets',
      caption: 'Pulse Aura visual tracking & desktop widgets',
      altText: 'Luma Pulse Aura Android App',
      objectFit: 'contain',
    },
  },
  {
    id: 'qr-scanner',
    number: '03',
    title: 'QR-Scanner',
    category: 'Android / Camera & ML Kit',
    description: 'High-performance QR & barcode scanner and generator for Android built with CameraX, Google ML Kit, and Room Database.',
    longDescription:
      'Современный сканер и генератор QR/штрихкодов для Android на Jetpack Compose, CameraX, Google ML Kit и Room Database. Поддерживает мгновенное распознавание, сохранение истории, экспорт и публикацию в RuStore.',
    tags: ['Kotlin', 'Jetpack Compose', 'CameraX', 'ML Kit'],
    githubUrl: 'https://github.com/moii-dev/QR-Scanner',
    stars: 0,
    language: 'Kotlin',
    featured: true,
    updatedAt: '2026-08-23',
    cover: {
      variant: 'editorial',
      backgroundTheme: 'neutral',
      logoUrl: '/assets/projects/qr-scanner/app_icon.png',
      badgeText: 'CameraX · ML Kit · v1.0.0',
      caption: 'Real-time CameraX detection and barcode engine',
      altText: 'QR-Scanner Android App',
    },
  },
  {
    id: 'figmint',
    number: '04',
    title: 'Figmint',
    category: 'Web App / Design Tool',
    description: 'Figma-like local-first vector graphics and canvas editor with infinite canvas, layer tree, hotkeys, and multi-format export.',
    longDescription:
      'Figma-подобный независимый векторный редактор с бесконечным холстом, масштабированием, слоями, векторными фигурами, горячими клавишами и экспортом в SVG/PNG. Разработан на React, TypeScript и HTML5 Canvas.',
    tags: ['TypeScript', 'React', 'Canvas', 'UI/UX'],
    githubUrl: 'https://github.com/moii-dev/Figmint',
    stars: 0,
    language: 'TypeScript',
    featured: true,
    updatedAt: '2026-08-25',
    cover: {
      variant: 'browser',
      backgroundTheme: 'silver',
      browserUrl: 'https://figmint.web.app',
      badgeText: 'React · Canvas Editor',
      caption: 'Local-first infinite canvas vector editor',
      altText: 'Figmint Vector Canvas Editor',
    },
  },
];

/**
 * Projects from the user's preferred draft that are NOT currently in public GitHub.
 * Kept ready with explicit tags indicating they require manual data filling.
 */
export const DRAFT_REQUESTED_PROJECTS: Project[] = [
  {
    id: 'everus',
    number: '02',
    title: 'EverUs',
    category: 'Android / Lifestyle (Draft)',
    description: 'A personal space for meaningful moments, memories and shared experiences. (Repository pending public push)',
    longDescription:
      'Личное приложение для пар и близких людей. Включает счетчик совместных дней, галерею воспоминаний, виджеты и приватный дизайн. Внимание: публичный репозиторий на GitHub moii-dev пока отсутствует. Требуется ручное указание репозитория и скриншотов.',
    tags: ['Kotlin', 'Jetpack Compose', 'Pending Repo'],
    githubUrl: 'https://github.com/moii-dev',
    stars: 0,
    language: 'Kotlin',
    featured: false,
    updatedAt: '2026-06-10',
    cover: {
      variant: 'editorial',
      backgroundTheme: 'warm-gray',
      badgeText: 'В разработке · Репозиторий не найден',
      caption: 'Личное пространство для двоих (требует ручного заполнения)',
      fallbackNotice: 'Публичный репозиторий moii-dev/EverUs не найден на GitHub.',
      requiredScreenshots: ['everus-counter.png', 'everus-memories.png'],
    },
  },
  {
    id: 'runa',
    number: '03',
    title: 'Runa',
    category: 'Project / Creative (Draft)',
    description: 'Проект из предпочтительной подборки Evgeny.dev. Публичный репозиторий на GitHub moii-dev отсутствует.',
    longDescription:
      'Проект Runa указан в предпочтительной подборке портфолио. В настоящее время публичный репозиторий moii-dev/Runa не найден на GitHub (возможно, проект опубликован под именем Luma с Aura-анимациями или находится в приватном статусе). Требуется ручное заполнение репозитория и данных.',
    tags: ['In Development', 'Pending Repo'],
    githubUrl: 'https://github.com/moii-dev',
    stars: 0,
    language: 'Kotlin',
    featured: false,
    updatedAt: '2026-10-14',
    cover: {
      variant: 'editorial',
      backgroundTheme: 'slate',
      badgeText: 'В разработке · Репозиторий не найден',
      caption: 'Проект Runa (требует ручного заполнения репозитория)',
      fallbackNotice: 'Публичный репозиторий moii-dev/Runa не найден на GitHub.',
      requiredScreenshots: ['runa-preview.png'],
    },
  },
  {
    id: 'gde-moy-nosok',
    number: '04',
    title: 'Где мой носок?',
    category: 'Game / Application (Draft)',
    description: 'Проект из предпочтительной подборки Evgeny.dev. Публичный репозиторий на GitHub moii-dev отсутствует.',
    longDescription:
      'Проект «Где мой носок?» указан в предпочтительной подборке. В настоящее время публичный репозиторий на GitHub moii-dev отсутствует. Во избежание выдумывания несуществующих технологий проект помечен как драфт, ожидающий ссылки на репозиторий и описания.',
    tags: ['In Development', 'Pending Repo'],
    githubUrl: 'https://github.com/moii-dev',
    stars: 0,
    language: 'Code',
    featured: false,
    updatedAt: '2026-10-14',
    cover: {
      variant: 'editorial',
      backgroundTheme: 'neutral',
      badgeText: 'В разработке · Репозиторий не найден',
      caption: 'Проект «Где мой носок?» (требует ручного заполнения)',
      fallbackNotice: 'Публичный репозиторий не найден на GitHub.',
      requiredScreenshots: ['nosok-preview.png'],
    },
  },
];

/**
 * All local projects including other confirmed repositories and excluded ones.
 */
export const ALL_LOCAL_PROJECTS: Project[] = [
  ...FEATURED_PROJECTS,
  ...DRAFT_REQUESTED_PROJECTS,
  {
    id: 'yandex-adblocker',
    number: '05',
    title: 'Yandex Search AdBlocker',
    category: 'Extension / Utility',
    description: 'Lightweight browser extension filtering sponsored ad units from Yandex search results.',
    longDescription:
      'Yandex Search AdBlocker — легкое браузерное расширение, которое скрывает рекламные блоки в поисковой выдаче Яндекса. Реализовано на JavaScript Manifest V3 с DOM API.',
    tags: ['JavaScript', 'Extensions', 'CSS', 'DOM API'],
    githubUrl: 'https://github.com/moii-dev/Yandex-AdBlocker',
    stars: 4,
    language: 'JavaScript',
    featured: false,
    updatedAt: '2026-09-15',
    cover: {
      variant: 'single',
      backgroundTheme: 'neutral',
      primaryImage: '/assets/projects/yandex-adblocker/banner.png',
      badgeText: 'Chrome MV3 · 4 Stars',
      caption: 'Zero-overhead search ad filter for Chromium browsers',
    },
  },
  {
    id: 'onepass',
    number: '06',
    title: 'OnePass',
    category: 'Extension / Security',
    description: 'Local TOTP/HOTP two-factor authenticator for Chromium browsers with encrypted storage and PIN.',
    longDescription:
      'Локальный TOTP/HOTP-аутентификатор для Chromium-браузеров с импортом QR-кодов, шифрованием, PIN-защитой и резервным копированием.',
    tags: ['JavaScript', 'Cryptography', 'TOTP', 'Security'],
    githubUrl: 'https://github.com/moii-dev/OnePass',
    stars: 0,
    language: 'JavaScript',
    featured: false,
    updatedAt: '2026-08-23',
    cover: {
      variant: 'browser',
      backgroundTheme: 'silver',
      logoUrl: '/assets/projects/onepass/icon128.png',
      badgeText: 'TOTP 2FA Authenticator',
      caption: 'Local encrypted browser authenticator',
    },
  },
  {
    id: 'worldbox-react',
    number: '07',
    title: 'WorldBox-React',
    category: 'Web Game / Simulation',
    description: '2D sandbox simulation game on React inspired by WorldBox with cellular automaton physics.',
    longDescription:
      '2D sandbox-игра на React в духе WorldBox с моделированием стихий, биомов и существ. Разработана на React 19, TypeScript и HTML5 Canvas.',
    tags: ['React', 'TypeScript', 'Game Engine', 'Canvas'],
    githubUrl: 'https://github.com/moii-dev/WorldBox-React',
    stars: 0,
    language: 'TypeScript',
    featured: false,
    updatedAt: '2026-09-22',
    cover: {
      variant: 'single',
      backgroundTheme: 'slate',
      badgeText: 'React · Cellular Automata',
      caption: 'Interactive world sandbox simulator',
    },
  },
  {
    id: 'codex-skills',
    number: '08',
    title: 'Codex Skills',
    category: 'Developer Tools / CLI',
    description: 'Curated workflow skills and execution modules for Codex AI agent developer environment.',
    longDescription:
      'Скиллы для Codex для безопасного выполнения задач, внесения изменений в проект и улучшения пользовательского интерфейса.',
    tags: ['CLI', 'Automation', 'Workflow', 'Developer Experience'],
    githubUrl: 'https://github.com/moii-dev/codex-skills',
    stars: 3,
    language: 'Shell',
    featured: false,
    updatedAt: '2026-09-04',
    cover: {
      variant: 'editorial',
      backgroundTheme: 'gray',
      badgeText: 'Developer Experience · CLI',
      caption: 'Agent modules for terminal workflows',
    },
  },
  {
    id: 'focuslock',
    number: '09',
    title: 'FocusLock',
    category: 'Browser Extension / Productivity',
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
      variant: 'browser',
      backgroundTheme: 'slate',
      logoUrl: '/assets/projects/focuslock/icon128.png',
      badgeText: 'Chrome MV3 · StayActive',
      caption: 'Page Visibility & Focus Signals Control',
    },
  },
  {
    id: 'multipulti',
    number: '10',
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
      primaryImage: '/assets/projects/multipulti/screenshot.png',
      logoUrl: '/assets/projects/multipulti/logo.png',
      badgeText: 'Canvas · Frame-by-Frame',
    },
  },
  {
    id: 'vkapibara',
    number: '11',
    title: 'Вкапибара',
    category: 'Android / Customization',
    description: 'Custom social client for Android with dark theme and media management. (Excluded from featured)',
    longDescription:
      'Кастомизированный мобильный клиент для социальной сети с упором на эстетичную темную тему.',
    tags: ['Android', 'Java', 'Kotlin', 'UI/UX'],
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
