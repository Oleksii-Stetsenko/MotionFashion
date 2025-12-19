
import React, { useState, useRef, useEffect } from 'react';
import { sendWebhookEvent } from '../services/webhookService';
import { useLanguage } from './LanguageContext';

const DemoSection: React.FC = () => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reliable fashion-related video from Mixkit CDN
  const DEMO_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-red-suit-34135-large.mp4";

  const startDemo = async () => {
    sendWebhookEvent('demo_clicked');
    setIsProcessing(true);
    setShowVideo(false);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    setTimeout(() => {
      setIsProcessing(false);
      setShowVideo(true);
      sendWebhookEvent('demo_complete');
    }, 3500);
  };

  const resetDemo = () => {
    setShowVideo(false);
    setProgress(0);
  };

  // Ensure video plays when it becomes visible
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, [showVideo]);

  const bullets = t('demo.bullets') as string[];

  return (
    <section id="demo" className="py-24 bg-zinc-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{t('demo.title')}</h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {t('demo.desc')}
            </p>
            
            <ul className="space-y-4 mb-10">
              {bullets.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-zinc-300">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={showVideo ? resetDemo : startDemo}
              disabled={isProcessing}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center space-x-3 shadow-lg ${
                isProcessing ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('demo.btnRendering')} {progress}%</span>
                </>
              ) : showVideo ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span>{t('demo.btnReset')}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  <span>{t('demo.btnPlay')}</span>
                </>
              )}
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative aspect-[3/4] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {!showVideo ? (
                <>
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                    alt="Static Fashion Model" 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isProcessing ? 'scale-110 blur-sm brightness-50' : 'scale-100'}`}
                  />
                  
                  {isProcessing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="w-full h-1 bg-zinc-800 rounded-full mb-4 overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-indigo-400 font-mono text-sm animate-pulse">{t('demo.generatingVectors')}</div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 blur-[2px] scan-line"></div>
                    </div>
                  )}

                  {!isProcessing && (
                    <div className="absolute top-6 left-6 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest">
                      {t('demo.labelBefore')}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={DEMO_VIDEO_URL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-6 left-6 px-3 py-1 rounded bg-indigo-600/90 backdrop-blur-md border border-indigo-400/50 text-xs font-bold uppercase tracking-widest text-white shadow-xl">
                    {t('demo.labelAfter')}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
