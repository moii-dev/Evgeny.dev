export interface ContactConfig {
  availability: {
    isAvailable: boolean;
    statusText: string;
  };
  socialLinks: {
    github: string;
    telegram: string;
    email: string;
  };
  form: {
    // Optional endpoint URL (e.g. Formspree or custom backend API)
    endpoint: string;
    // Fallback email when no server endpoint is configured
    fallbackEmail: string;
    defaultSubject: string;
  };
}

export const CONTACT_CONFIG: ContactConfig = {
  availability: {
    isAvailable: true,
    statusText: 'Available for collaborations',
  },
  socialLinks: {
    github: 'https://github.com/moii-dev',
    telegram: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TELEGRAM_URL) || 'https://t.me/evgeny_dev',
    email: 'hnansaed71@gmail.com',
  },
  form: {
    endpoint: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_FORM_ENDPOINT) || '',
    fallbackEmail: 'hnansaed71@gmail.com',
    defaultSubject: 'New Inquiry via Evgeny.dev',
  },
};
