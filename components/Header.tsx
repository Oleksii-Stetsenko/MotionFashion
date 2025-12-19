
import React from 'react';
import { useLanguage } from './LanguageContext';

const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic">M</div>
          <span className="text-xl font-bold tracking-tight">MotionFashion<span className="text-indigo-500">AI</span></span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <a href="#demo" className="hover:text-white transition-colors">{t('nav.tech')}</a>
          <a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t('nav.request')}</a>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-xs font-bold rounded ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ua')}
              className={`px-2 py-1 text-xs font-bold rounded ${lang === 'ua' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              UA
            </button>
          </div>
          <a 
            href="#contact" 
            className="hidden sm:block bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
          >
            {t('nav.getStarted')}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
