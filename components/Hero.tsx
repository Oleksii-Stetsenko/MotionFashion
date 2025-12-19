
import React from 'react';
import { useLanguage } from './LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold mb-6 uppercase tracking-wider">
          {t('hero.badge')}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
          {t('hero.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{t('hero.titleAccent')}</span>
        </h1>
        
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {t('hero.sub')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#demo" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-white/10"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-xl font-bold text-lg border border-zinc-800 hover:bg-zinc-800 transition-all"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
