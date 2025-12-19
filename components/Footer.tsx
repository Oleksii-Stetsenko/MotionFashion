
import React from 'react';
import { useLanguage } from './LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-xs italic">M</div>
          <span className="text-lg font-bold tracking-tight">MotionFashion<span className="text-indigo-500">AI</span></span>
        </div>
        
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} MotionFashion Labs Inc. {t('footer.rights')}
        </p>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">{t('footer.privacy')}</a>
          <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">{t('footer.terms')}</a>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
