import React from 'react';

interface TechLogo {
  name: string;
  icon: React.ReactNode;
}

export const TechMarquee: React.FC = () => {
  const logos: TechLogo[] = [
    {
      name: 'Kotlin',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M2 2h20L12 12l10 10H2V2zm10 10L2 22h10l5-5-5-5z" />
        </svg>
      ),
    },
    {
      name: 'Android',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.72 2.24 12.88 2 12 2c-.88 0-1.72.24-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.73 3.23 5.4 4.88 5.11 7h13.78c-.29-2.12-1.62-3.77-3.36-4.84zM9 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      ),
    },
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="1.8" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
          <path d="M6 10h5v2H9.5v6H7.5v-6H6v-2zm7 3.5c0-.8.6-1.5 1.5-1.5h3.5v2h-3v1h2c.8 0 1.5.7 1.5 1.5v1.5c0 .8-.7 1.5-1.5 1.5h-4v-2h3.5v-1h-2c-.8 0-1.5-.7-1.5-1.5V13.5z" fill="#faf9f6" />
        </svg>
      ),
    },
    {
      name: 'Node.js',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
          <path d="M12 12v8" />
          <path d="M12 12L4 7.5" />
          <path d="M12 12l8-4.5" />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.19 2.58 7.78 6.27 9.27.4.08.55-.17.55-.38v-1.35c-2.52.55-3.05-1.22-3.05-1.22-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.91.06 1.39.93 1.39.93.81 1.39 2.12.99 2.64.76.08-.59.32-.99.58-1.22-2.01-.23-4.13-1-4.13-4.47 0-.99.35-1.8 1-2.43-.1-.23-.43-1.15.1-2.4 0 0 .76-.24 2.48.93.72-.2 1.5-.3 2.27-.3.77 0 1.55.1 2.27.3 1.72-1.17 2.48-.93 2.48-.93.53 1.25.2 2.17.1 2.4.65.63 1 1.44 1 2.43 0 3.48-2.12 4.24-4.14 4.47.33.28.62.83.62 1.68v2.49c0 .21.15.47.55.38C19.43 19.78 22 16.19 22 12c0-5.52-4.48-10-10-10z" />
        </svg>
      ),
    },
    {
      name: 'Git',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M21.62 10.62L13.38 2.38a2.3 2.3 0 00-3.25 0L8.2 4.31l3.52 3.52a2.33 2.33 0 012.92 2.92l3.41 3.41a2.33 2.33 0 012.87 2.87l3.7-3.7a2.3 2.3 0 000-3.25zM6.78 5.73L2.38 10.13a2.3 2.3 0 000 3.25l8.24 8.24a2.3 2.3 0 003.25 0l3.85-3.85-4.88-4.88a2.33 2.33 0 01-2.73-2.73L6.78 5.73z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Desktop & Tablet: Clean flex strip with even spacing */}
      <div className="flex items-center justify-between sm:justify-around gap-6 overflow-x-auto no-scrollbar py-2 text-neutral-800">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center gap-2.5 shrink-0 px-3 py-1.5 rounded-xl hover:bg-neutral-200/50 transition-colors duration-200 cursor-default select-none"
          >
            <div className="text-neutral-900">{logo.icon}</div>
            <span className="text-[13px] sm:text-sm font-semibold tracking-tight text-neutral-900">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
