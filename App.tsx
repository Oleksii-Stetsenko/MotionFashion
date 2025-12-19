
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DemoSection from './components/DemoSection';
import LeadForm from './components/LeadForm';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import { sendWebhookEvent } from './services/webhookService';
import { LanguageProvider, useLanguage } from './components/LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    sendWebhookEvent('page_view');
  }, []);

  const features = t('features.items') as { title: string, desc: string }[];

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
      <Header />
      
      <main>
        <Hero />
        
        <section className="py-12 bg-zinc-950 flex flex-col items-center">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-8">{t('trust')}</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {['VOGUE', 'ZARA', 'H&M', 'ASOS', 'PRADA'].map(brand => (
              <span key={brand} className="text-2xl font-black italic tracking-tighter text-zinc-400">{brand}</span>
            ))}
          </div>
        </section>

        <DemoSection />
        
        <section id="features" className="py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {t('features.sub')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feat, i) => (
                <div key={i} className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-white/10 transition-colors group">
                  <div className="mb-6 p-4 bg-zinc-950 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {i === 0 && <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                    {i === 1 && <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>}
                    {i === 2 && <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LeadForm />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
