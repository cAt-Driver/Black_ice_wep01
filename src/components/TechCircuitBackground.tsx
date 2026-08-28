import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export const TechCircuitBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Scroll transforms for subtle parallax of different circuit layers
  const yLayer1 = useTransform(smoothScroll, [0, 1], [0, -120]);
  const yLayer2 = useTransform(smoothScroll, [0, 1], [0, -220]);
  const yLayer3 = useTransform(smoothScroll, [0, 1], [0, -320]);
  const rotateChip1 = useTransform(smoothScroll, [0, 1], [0, 15]);
  const rotateChip2 = useTransform(smoothScroll, [0, 1], [0, -20]);

  // Ambient pulse state for interactive glow
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. TOP-RIGHT LAYER: Cyber CPU & Motherboard Bus Traces */}
      <motion.div 
        style={{ y: yLayer1 }} 
        className="absolute -top-10 -right-16 sm:right-10 w-[420px] sm:w-[540px] h-[540px] opacity-25"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full text-sky-500" fill="none">
          <defs>
            <linearGradient id="chipGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="traceGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* CPU Main Die Frame */}
          <rect x="180" y="180" width="140" height="140" rx="16" stroke="url(#chipGlow1)" strokeWidth="2.5" fill="#091326" fillOpacity="0.85" />
          <rect x="195" y="195" width="110" height="110" rx="10" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
          
          {/* Inner Silicon Core */}
          <rect x="215" y="215" width="70" height="70" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="4" fill="#38bdf8" />
          
          {/* Core Labels */}
          <text x="250" y="275" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace" fontWeight="bold">NOVA·CPU</text>

          {/* CPU Gold Contact Pins (Top, Bottom, Left, Right) */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <React.Fragment key={i}>
              {/* Top pins */}
              <line x1={195 + i * 18} y1="168" x2={195 + i * 18} y2="180" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
              {/* Bottom pins */}
              <line x1={195 + i * 18} y1="320" x2={195 + i * 18} y2="332" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
              {/* Left pins */}
              <line x1="168" y1={195 + i * 18} x2="180" y2={195 + i * 18} stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
              {/* Right pins */}
              <line x1="320" y1={195 + i * 18} x2="332" y2={195 + i * 18} stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
            </React.Fragment>
          ))}

          {/* PCB Circuit Traces Radiating from Chip */}
          {/* Trace 1 - Top Left Angular */}
          <path d="M 195 168 L 195 120 L 130 55 L 40 55" stroke="url(#traceGrad1)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="40" cy="55" r="3.5" fill="#38bdf8" filter="url(#glow1)" />
          <circle cx="130" cy="55" r="2" fill="#38bdf8" opacity="0.8" />

          {/* Trace 2 - Top Right */}
          <path d="M 285 168 L 285 110 L 360 35 L 460 35" stroke="url(#traceGrad1)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="460" cy="35" r="4" fill="#38bdf8" filter="url(#glow1)" />
          
          {/* Trace 3 - Bottom Left Bus */}
          <path d="M 168 285 L 110 285 L 60 335 L 60 440 L 20 480" stroke="url(#traceGrad1)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="480" r="3.5" fill="#60a5fa" />
          <circle cx="60" cy="335" r="2" fill="#38bdf8" />

          {/* Trace 4 - Bottom Right Data Line */}
          <path d="M 320 285 L 390 285 L 440 335 L 440 450 L 480 490" stroke="url(#traceGrad1)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="480" cy="490" r="4" fill="#38bdf8" filter="url(#glow1)" />
          <circle cx="440" cy="335" r="2.5" fill="#38bdf8" />

          {/* SMT Capacitors and Resistor Arrays */}
          <rect x="140" y="210" width="12" height="6" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="140" y="224" width="12" height="6" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="348" y="210" width="12" height="6" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="348" y="224" width="12" height="6" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />

          {/* Animated Flowing Electron Pulse Along Trace */}
          <motion.circle
            r="3"
            fill="#e0f2fe"
            filter="url(#glow1)"
            animate={{
              cx: [195, 195, 130, 40],
              cy: [168, 120, 55, 55],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
          />
          <motion.circle
            r="3"
            fill="#38bdf8"
            filter="url(#glow1)"
            animate={{
              cx: [320, 390, 440, 440, 480],
              cy: [285, 285, 335, 450, 490],
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
              repeatDelay: 1.5
            }}
          />
        </svg>
      </motion.div>

      {/* 2. MID-LEFT LAYER: Microcontroller & Bus Wiring Matrix */}
      <motion.div 
        style={{ y: yLayer2 }} 
        className="absolute top-[35%] -left-16 sm:left-4 w-[380px] sm:w-[480px] h-[480px] opacity-20"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full text-indigo-400" fill="none">
          <defs>
            <linearGradient id="traceGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Secondary Microchip */}
          <g transform="translate(160, 160)">
            <rect x="0" y="0" width="100" height="100" rx="12" stroke="#818cf8" strokeWidth="2" fill="#0c152e" fillOpacity="0.9" />
            <rect x="15" y="15" width="70" height="70" rx="6" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="16" stroke="#38bdf8" strokeWidth="1.5" fill="#1e1b4b" />
            <text x="50" y="54" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontFamily="monospace">64·BIT</text>

            {/* Pins */}
            {[15, 35, 55, 75].map((p) => (
              <React.Fragment key={p}>
                <line x1={p} y1="-8" x2={p} y2="0" stroke="#818cf8" strokeWidth="2" />
                <line x1={p} y1="100" x2={p} y2="108" stroke="#818cf8" strokeWidth="2" />
                <line x1="-8" y1={p} x2="0" y2={p} stroke="#818cf8" strokeWidth="2" />
                <line x1="100" y1={p} x2="108" y2={p} stroke="#818cf8" strokeWidth="2" />
              </React.Fragment>
            ))}
          </g>

          {/* Complex Angular Traces */}
          <path d="M 175 152 L 175 80 L 110 20 L 20 20" stroke="url(#traceGrad2)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3" fill="#818cf8" />
          
          <path d="M 235 152 L 235 90 L 310 15 L 420 15" stroke="url(#traceGrad2)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="420" cy="15" r="3" fill="#818cf8" />

          <path d="M 152 195 L 80 195 L 30 245 L 30 380 L 70 420" stroke="url(#traceGrad2)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="70" cy="420" r="3.5" fill="#38bdf8" />

          <path d="M 268 235 L 340 235 L 390 285 L 390 410 L 460 480" stroke="url(#traceGrad2)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="460" cy="480" r="4" fill="#818cf8" />

          {/* Data Bus Lines (Parallel lines) */}
          <path d="M 215 268 L 215 340 L 260 385 L 260 460" stroke="#6366f1" strokeWidth="1" opacity="0.4" />
          <path d="M 225 268 L 225 336 L 270 381 L 270 460" stroke="#6366f1" strokeWidth="1" opacity="0.4" />
          <path d="M 235 268 L 235 332 L 280 377 L 280 460" stroke="#6366f1" strokeWidth="1" opacity="0.4" />

          {/* Flowing Pulse */}
          <motion.circle
            r="3"
            fill="#a5b4fc"
            animate={{
              cx: [152, 80, 30, 30, 70],
              cy: [195, 195, 245, 380, 420],
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
              repeatDelay: 1.2
            }}
          />
        </svg>
      </motion.div>

      {/* 3. LOWER-RIGHT LAYER: Silicon Architecture & Data Node Matrix */}
      <motion.div 
        style={{ y: yLayer3 }} 
        className="absolute top-[65%] -right-12 sm:right-6 w-[440px] sm:w-[560px] h-[560px] opacity-20"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full text-emerald-400" fill="none">
          <defs>
            <linearGradient id="traceGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Diamond Chip Layout */}
          <g transform="translate(250, 250) rotate(45)">
            <rect x="-55" y="-55" width="110" height="110" rx="14" stroke="#34d399" strokeWidth="2" fill="#061c18" fillOpacity="0.85" />
            <rect x="-40" y="-40" width="80" height="80" rx="8" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="0" cy="0" r="18" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#d1fae5" fontSize="8" fontFamily="monospace" fontWeight="bold">AI·CORE</text>
          </g>

          {/* Traces spreading from diamond core */}
          <path d="M 250 172 L 250 80 L 180 15 L 80 15" stroke="url(#traceGrad3)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="80" cy="15" r="3.5" fill="#34d399" />
          
          <path d="M 328 250 L 400 250 L 460 310 L 460 420" stroke="url(#traceGrad3)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="460" cy="420" r="4" fill="#34d399" />

          <path d="M 172 250 L 100 250 L 40 310 L 40 450" stroke="url(#traceGrad3)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="40" cy="450" r="3.5" fill="#38bdf8" />

          <path d="M 250 328 L 250 410 L 310 470 L 400 470" stroke="url(#traceGrad3)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="400" cy="470" r="3.5" fill="#34d399" />

          {/* Flowing Pulse */}
          <motion.circle
            r="3"
            fill="#a7f3d0"
            animate={{
              cx: [250, 250, 180, 80],
              cy: [172, 80, 15, 15],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
              repeatDelay: 1
            }}
          />
        </svg>
      </motion.div>

      {/* Subtle Digital Floating Hex Nodes throughout the backdrop */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[48%] right-[18%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa]"
        />
        <motion.div 
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[78%] left-[22%] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
        />
      </div>

    </div>
  );
};
