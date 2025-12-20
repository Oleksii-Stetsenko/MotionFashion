
import React, { useState, useRef } from 'react';
import { sendWebhookEvent } from '../services/webhookService';
import { useLanguage } from './LanguageContext';

const DemoSection: React.FC = () => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * CONFIGURATION: DROPBOX ASSETS
   * We use ?raw=1 at the end of Dropbox share links to get the direct file stream.
   */
  const DROPBOX_IMAGE_URL = "https://www.dropbox.com/scl/fi/ic335jfelc1bcq7j19ybi/9a93e98d7136f6716de03a6668c30456.jpg?rlkey=5ywrshzt116vfisk2lfyab7wh&st=xb1460u5&raw=1";
  const DROPBOX_VIDEO_URL = "https://www.dropbox.com/scl/fi/jijl99ktkbm3c9ngogwwa/Gen-4-Turbo-A-cinematic-slow-motion-video-based-on-the-image-The-model-makes-gentle-subtle-movements-in-place-a-slow-graceful-turn-of-her-head-to-look-slightly-off-camera.mp4?rlkey=qsas9ekds1lpijl4f2mtmyyud&st=bh2br8o4&raw=1";

  const startDemo = async () => {
    sendWebhookEvent('demo_clicked');
    setIsProcessing(true);
    setShowVideo(false);
    setProgress(0);
    setVideoError(false);
    
    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Finalize "rendering" and switch to video
    setTimeout(() => {
      setIsProcessing(false);
      setShowVideo(true);
      sendWebhookEvent('demo_complete');
      
      // Auto-play the cinematic loop
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(err => console.warn("Video playback deferred:", err));
        }
      }, 150);
    }, 2200);
  };

  const resetDemo = () => {
    setShowVideo(false);
    setProgress(0);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

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
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-violet-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative aspect-[3/4] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              
              {/* IMAGE MODE (Dropbox Photo) */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <img 
                  src={DROPBOX_IMAGE_URL} 
                  alt="MotionFashion Preview" 
                  className={`w-full h-full object-cover transition-transform duration-[3000ms] ${isProcessing ? 'scale-110 blur-sm brightness-50' : 'scale-100'}`}
                />
                
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20">
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-4 overflow-hidden max-w-[200px]">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,1)]" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-indigo-400 font-mono text-[10px] animate-pulse uppercase tracking-[0.4em] mb-2">{t('demo.generatingVectors')}</div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400/30 blur-[2px] scan-line z-10"></div>
                  </div>
                )}

                {!isProcessing && !showVideo && (
                  <div className="absolute top-6 left-6 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest z-10">
                    {t('demo.labelBefore')}
                  </div>
                )}
              </div>

              {/* VIDEO MODE (Dropbox Video) */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {videoError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 p-8 text-center">
                    <svg className="w-12 h-12 text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <p className="text-zinc-500 text-sm mb-4">Content Stream Unavailable</p>
                    <button onClick={resetDemo} className="px-4 py-2 bg-zinc-800 rounded-lg text-white text-xs font-bold border border-white/5 hover:bg-zinc-700 transition-colors">Try Again</button>
                  </div>
                ) : (
                  <video
                    key={showVideo ? 'active-video' : 'inactive'}
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    onError={() => setVideoError(true)}
                  >
                    <source src={DROPBOX_VIDEO_URL} type="video/mp4" />
                  </video>
                )}
                <div className="absolute top-6 left-6 px-3 py-1 rounded bg-indigo-600/90 backdrop-blur-md border border-indigo-400/30 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl z-10">
                  {t('demo.labelAfter')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
