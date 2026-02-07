'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

interface VisibilityState {
  [key: string]: boolean;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const parallaxY = scrollY * 0.5;
  const mouseParallaxX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * 0.02 : 0;
  const mouseParallaxY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * 0.02 : 0;

  return (
    <main className="w-full scroll-smooth overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }

        .animate-rotate {
          animation: rotate 20s linear infinite;
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      {/* SLIDE 1 — HERO */}
      <section id="section-hero" className="relative min-h-screen w-full overflow-hidden">
        {/* Parallax background */}
        <div
          style={{
            transform: `translateY(${parallaxY}px)`,
          }}
          className="absolute inset-0 transition-transform duration-100"
        >
          <Image
            src="/tiara.jpeg"
            alt="Wedding Hero"
            fill
            priority
            className="object-cover scale-110"
          />
        </div>

        {/* Gradient overlay with animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        
        {/* Animated vignette */}
        <div className="absolute inset-0 bg-radial-gradient opacity-60" 
             style={{
               background: `radial-gradient(circle at ${50 + mouseParallaxX}% ${50 + mouseParallaxY}%, transparent 0%, rgba(0,0,0,0.5) 100%)`
             }}
        />

        {/* Sparkles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}

        <div className="relative z-10 flex min-h-screen items-center justify-center text-center px-6">
          <div
            style={{
              transform: `translate(${mouseParallaxX}px, ${mouseParallaxY}px)`,
            }}
            className="transition-transform duration-300"
          >
            {/* Save the Date badge */}
            <div className="inline-block mb-6 animate-fadeInScale opacity-0 animation-delay-200">
              <div className="glass-morphism px-6 py-2 rounded-full">
                <p className="text-sm tracking-[0.3em] text-white/90 uppercase font-light">
                  Save The Date
                </p>
              </div>
            </div>

            {/* Main title with stagger animation */}
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 opacity-0 animate-fadeInUp animation-delay-400">
              Welcome to Our Wedding
            </h1>

            {/* Animated divider */}
            <div className="flex items-center justify-center mb-6 opacity-0 animate-fadeInScale animation-delay-600">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="mx-4 w-3 h-3 border-2 border-white rotate-45 animate-heartbeat" />
              <div className="h-px w-12 bg-gradient-to-r from-white via-white to-transparent" />
            </div>

            {/* Subtitle */}
            <p className="text-white/90 text-xl md:text-2xl font-light tracking-wide opacity-0 animate-fadeInUp animation-delay-800">
              A celebration of love & forever
            </p>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeInUp animation-delay-1000">
              <div className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white/70 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                  <div className="w-1 h-2 bg-white/70 rounded-full animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/30 animate-fadeInScale" />
        <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/30 animate-fadeInScale" />
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/30 animate-fadeInScale" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/30 animate-fadeInScale" />
      </section>

      {/* SLIDE 2 — STORY */}
      <section 
        id="section-story" 
        className="min-h-screen w-full bg-gradient-to-br from-[#f8f5f2] via-[#fef9f5] to-[#f8f5f2] flex items-center justify-center px-6 py-20 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />
        
        {/* Rotating decorative rings */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-pink-300/20 rounded-full animate-rotate" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border-2 border-purple-300/20 rounded-full animate-rotate" style={{animationDirection: 'reverse'}} />

        <div className={`max-w-3xl text-center relative z-10 transition-all duration-1000 ${
          isVisible['section-story'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Decorative top element */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <svg className="w-8 h-8 mx-4 text-pink-400 animate-heartbeat" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-r from-pink-400 via-transparent to-transparent" />
          </div>

          <h2 className={`text-4xl md:text-5xl font-serif mb-8 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${
            isVisible['section-story'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            Our Story
          </h2>

          {/* Story cards with hover effect */}
          <div className="space-y-6">
            <div className={`glass-morphism p-8 rounded-2xl hover-lift transition-all duration-700 delay-400 ${
              isVisible['section-story'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-serif text-xl animate-heartbeat">
                  ♥
                </div>
                <h3 className="text-xl font-serif text-gray-800">Two Souls Met</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                In the tapestry of life, our paths crossed in the most beautiful way, 
                guided by destiny and divine timing.
              </p>
            </div>

            <div className={`glass-morphism p-8 rounded-2xl hover-lift transition-all duration-700 delay-600 ${
              isVisible['section-story'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-serif text-xl animate-heartbeat animation-delay-500">
                  ∞
                </div>
                <h3 className="text-xl font-serif text-gray-800">A Promise of Forever</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Hearts connected, and love grew stronger with time. This journey brought us 
                to a promise of forever, surrounded by prayers and blessings.
              </p>
            </div>
          </div>

          {/* Decorative bottom element */}
          <div className={`mt-12 flex justify-center gap-2 transition-all duration-700 delay-800 ${
            isVisible['section-story'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-pink-400 rounded-full"
                style={{
                  animation: `sparkle ${1.5 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 3 — QUOTE */}
      <section id="section-quote" className="relative min-h-screen w-full overflow-hidden">
        {/* Parallax background */}
        <div
          style={{
            transform: `translateY(${parallaxY * 0.3}px) scale(1.1)`,
          }}
          className="absolute inset-0 transition-transform duration-100"
        >
          <Image
            src="/tiara.jpeg"
            alt="Wedding Quote"
            fill
            className="object-cover"
          />
        </div>

        {/* Animated glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-md" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-purple-300/30 rounded-full"
              style={{
                width: 100 + Math.random() * 200 + 'px',
                height: 100 + Math.random() * 200 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: Math.random() * 3 + 's',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <blockquote className={`max-w-4xl text-center transition-all duration-1000 ${
            isVisible['section-quote'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* Opening quote mark */}
            <div className={`text-8xl md:text-9xl text-purple-400/40 font-serif leading-none mb-4 transition-all duration-700 delay-200 ${
              isVisible['section-quote'] ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-12'
            }`}>
              "
            </div>

            {/* Quote text with word-by-word animation */}
            <p className={`text-2xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-8 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible['section-quote'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              And over all these virtues put on{' '}
              <span className="text-gradient font-bold inline-block animate-heartbeat">
                love
              </span>
              , which binds them all together in perfect unity.
            </p>

            {/* Closing quote mark */}
            <div className={`text-8xl md:text-9xl text-purple-400/40 font-serif leading-none mb-6 transition-all duration-700 delay-600 ${
              isVisible['section-quote'] ? 'opacity-100 rotate-0' : 'opacity-0 rotate-12'
            }`}>
              "
            </div>

            {/* Bible verse reference */}
            <div className={`inline-block glass-morphism px-8 py-3 rounded-full transition-all duration-700 delay-800 ${
              isVisible['section-quote'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-gray-700 tracking-widest uppercase text-sm md:text-base font-light">
                — Colossians 3:14
              </span>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-8 mt-12">
              <div className={`w-16 h-16 border-2 border-pink-400/40 rounded-full animate-rotate transition-all duration-700 delay-1000 ${
                isVisible['section-quote'] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`} />
              <div className={`w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full animate-float transition-all duration-700 delay-1100 ${
                isVisible['section-quote'] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`} />
              <div className={`w-16 h-16 border-2 border-purple-400/40 rounded-full animate-rotate transition-all duration-700 delay-1200 ${
                isVisible['section-quote'] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`} style={{animationDirection: 'reverse'}} />
            </div>
          </blockquote>
        </div>
      </section>

      <style jsx>{`
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </main>
  );
}
