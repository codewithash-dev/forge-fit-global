import React, { useState, useEffect } from 'react';
import { Youtube, Instagram, Globe, PlayCircle } from 'lucide-react';

export default function ForgeFitProfile() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [year, setYear] = useState(2020);

  useEffect(() => {
    // Countdown timer - count up from 2020 to 2026
    const timer = setInterval(() => {
      setYear((prev) => {
        if (prev < 2026) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden relative mobile-bg"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%), url('/images/gym-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Light overlay for readability */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Profile Section */}
          <div className="text-center mb-8">
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-black border-4 border-amber-500/40 gold-glow flex items-center justify-center overflow-hidden hexagonal-ripple">
                <img 
                  src="/images/logo.png" 
                  alt="ForgeFit Global"
                  className="w-28 h-28 object-contain"
                />
              </div>
            </div>

            {/* Handle/Name */}
            <div className="layered-text-wrapper mb-4">
              <h1 className="text-4xl md:text-5xl layered-text breathing-text">
                @ForgeFitGlobal
              </h1>
            </div>
          </div>

          {/* Featured Card - ForgeFit Global */}
          <div
            className="group relative mb-4"
            onMouseEnter={() => setHoveredIndex('featured')}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href="https://youtube.com/@ForgeFitGlobal"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* Card */}
              <div
                className={`relative bg-black border-2 border-amber-500 rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-amber-500/80 card-pulse card-bounce weight-bar energy-wave progress-bar-container gold-glow ${
                  hoveredIndex === 'featured' ? 'shadow-2xl shadow-amber-500/20' : ''
                }`}
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%), url('/images/forgefit-global-thumbnail.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Progress bar */}
                <div className="progress-bar"></div>
                {/* Image/Preview Area */}
                <div 
                  className="relative w-full h-56 flex items-center justify-center overflow-hidden"
                >
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <PlayCircle size={56} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-black/40">
                  <div className="flex items-center justify-center gap-1">
                    <Youtube size={24} className="text-white flex-shrink-0" />
                    <div className="layered-text-wrapper-small">
                      <h3 className="text-sm layered-text-subtle muscle-flex whitespace-nowrap">
                        Discipline that Builds Kings & Queens
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Smaller Video Cards - Side by Side */}
          <div className="flex gap-3">
            {/* Forge Conversations */}
            <div className="group relative flex-1 w-0">
              <a
                href="https://youtube.com/@forgeconversations"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {/* Card */}
                <div
                  className="relative bg-black border-2 border-amber-500 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-amber-500/80 card-pulse card-bounce weight-bar energy-wave progress-bar-container gold-glow h-full flex flex-col"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%), url('/images/forge-conversations-thumbnail.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Progress bar */}
                  <div className="progress-bar"></div>
                  {/* Image/Preview Area */}
                  <div 
                    className="relative w-full h-40 flex-shrink-0 flex items-center justify-center overflow-hidden"
                  >
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <PlayCircle size={40} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2 bg-black/40 flex-shrink-0">
                    <div className="flex items-center justify-center gap-1">
                      <Youtube size={14} className="text-white flex-shrink-0" />
                      <div className="layered-text-wrapper-small">
                        <h3 className="text-xs layered-text-subtle muscle-flex text-center leading-tight">
                          <span className="block">Less condemnation.</span>
                          <span className="block">More conversation.</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Forge Feast */}
            <div className="group relative flex-1 w-0">
              <a
                href="https://youtube.com/@forgefeast"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {/* Card */}
                <div
                  className="relative bg-black border-2 border-amber-500 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-amber-500/80 card-pulse card-bounce weight-bar energy-wave progress-bar-container gold-glow h-full flex flex-col"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%), url('/images/forge-feast-thumbnail.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Progress bar */}
                  <div className="progress-bar"></div>
                  {/* Image/Preview Area */}
                  <div 
                    className="relative w-full h-40 flex-shrink-0 flex items-center justify-center overflow-hidden"
                  >
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <PlayCircle size={40} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2 bg-black/40 flex-shrink-0">
                    <div className="flex items-center justify-center gap-1">
                      <Youtube size={14} className="text-white flex-shrink-0" />
                      <div className="layered-text-wrapper-small">
                        <h3 className="text-xs layered-text-subtle muscle-flex text-center leading-tight">
                          <span className="block">7 Feasts</span>
                          <span className="block">Leviticus 23</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-12 flex justify-center items-center gap-4 mb-4">
            <a
              href="https://instagram.com/forgefitglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white social-icon"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://forgefitglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white social-icon"
              aria-label="Website"
            >
              <Globe size={24} />
            </a>
            <a
              href="https://tiktok.com/@forgefitglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white social-icon"
              aria-label="TikTok"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>

          {/* Footer */}
          <div className="text-center text-white/60 text-xs">
            <p className="countdown-number">© {year} ForgeFit Global</p>
          </div>
        </div>
      </div>
    </div>
  );
}
