import { setLocale, t, useLocale } from '../i18n';

export function LanguageSwitcher() {
  const locale = useLocale();
  return <div role="group" aria-label={t('Language')} className="language-switcher flex shrink-0 items-center text-[11px] font-mono font-medium">
    {(['en', 'ru'] as const).map((language, index) => <span key={language} className="flex items-center">
      {index > 0 && <span aria-hidden="true" className="text-neutral-300">/</span>}
      <button type="button" lang={language} aria-label={t(language === 'en' ? 'Switch to English' : 'Switch to Russian')}
        aria-pressed={locale === language} onClick={() => setLocale(language)}
        className={`rounded-full px-1.5 py-2 transition-colors hover:text-black ${locale === language ? 'text-black' : 'text-neutral-400'}`}>
        {language.toUpperCase()}
      </button>
    </span>)}
  </div>;
}
