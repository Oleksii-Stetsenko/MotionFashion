
import React, { useState } from 'react';
import { sendWebhookEvent } from '../services/webhookService';
import { LeadFormData } from '../types';
import { useLanguage } from './LanguageContext';

const LeadForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<LeadFormData>({ name: '', email: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const success = await sendWebhookEvent('lead_submit', formData);
    
    if (success) {
      setStatus('success');
      setFormData({ name: '', email: '', company: '' });
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-10 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl text-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">{t('form.successTitle')}</h3>
        <p className="text-zinc-400">{t('form.successDesc')}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 underline font-medium"
        >
          {t('form.successAction')}
        </button>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('form.title')} <br/> <span className="text-indigo-500">{t('form.titleAccent')}</span></h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            {t('form.sub')}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/5">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('form.saveTime')}</h4>
                <p className="text-zinc-500 text-sm">{t('form.saveTimeDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/5">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('form.cutCosts')}</h4>
                <p className="text-zinc-500 text-sm">{t('form.cutCostsDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-8 md:p-10 rounded-3xl relative backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">{t('form.labelName')}</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  placeholder={t('form.placeholderName')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">{t('form.labelEmail')}</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  placeholder={t('form.placeholderEmail')}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">{t('form.labelCompany')}</label>
              <input 
                type="text" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder={t('form.placeholderCompany')}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2"
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t('form.submitting')}</span>
                </>
              ) : (
                <span>{t('form.btnSubmit')}</span>
              )}
            </button>
            
            <p className="text-center text-xs text-zinc-500">
              {t('form.disclaimer')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
