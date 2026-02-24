
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';

type DottedGlowBackgroundProps = {
  className?: string;
  gap?: number;
  radius?: number; // Base radius, will be randomized
  color?: string;
  glowColor?: string;
  opacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
  useRealisticColors?: boolean;
};

// Realistic star colors based on stellar classification
const STAR_COLORS = [
  "#FFFFFF", // White
  "#CAE1FF", // Blue-white
  "#FFFACD", // Yellow-white
  "#FFD700", // Orange-ish
  "#FF6347", // Red-ish
  "#F0F8FF"  // Alice Blue
];

interface Star {
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
  baseAlpha: number;
  glowIntensity: number;
  pulsePhase: number;
  pulseSpeed: number;
  depth: number; // For parallax logic
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  color: string;
}

export default function DottedGlowBackground({
  className,
  gap = 35,
  radius = 1.2,
  opacity = 0.9,
  speedMin = 0.3,
  speedMax = 1.2,
  speedScale = 0.6,
}: DottedGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Refs to track interaction state for smooth interpolation
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const lerpMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(width * dpr));
      el.height = Math.max(1, Math.floor(height * dpr));
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { width, height } = container.getBoundingClientRect();
      // Normalized coordinates (-1 to 1)
      mouseRef.current.x = (e.clientX / width) * 2 - 1;
      mouseRef.current.y = (e.clientY / height) * 2 - 1;
    };

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    setTimeout(resize, 0);

    let dots: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const regenDots = () => {
      dots = [];
      const { width, height } = container.getBoundingClientRect();
      
      // Calculate number of stars based on area for consistency
      const area = width * height;
      const starCount = Math.floor((area / (gap * gap)) * 1.5); // Slightly more stars than grid
      
      for (let i = 0; i < starCount; i++) {
        // Random distribution across the canvas with buffer for parallax
        const x = (Math.random() * (width + 200)) - 100;
        const y = (Math.random() * (height + 200)) - 100;
        
        // Power law distribution for sizes: many small stars, few large ones
        const sizeRand = Math.random();
        const sizeScale = 0.2 + Math.pow(sizeRand, 4) * 2.5;
        
        const baseAlpha = 0.1 + Math.random() * 0.8;
        const glowIntensity = Math.random() > 0.9 ? 1.0 : 0.2;
        
        // Pick a random color from the realistic set
        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

        dots.push({
          x,
          y,
          phase: Math.random() * Math.PI * 2,
          speed: speedMin + Math.random() * (speedMax - speedMin),
          size: radius * sizeScale,
          baseAlpha,
          glowIntensity,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.1 + Math.random() * 0.5,
          depth: 0.2 + Math.random() * 1.2,
          color
        });
      }
    };

    const spawnShootingStar = () => {
      const { width, height } = container.getBoundingClientRect();
      const rand = Math.random();
      let color = '#ffffff'; 
      if (rand > 0.8) color = '#00f2ff'; // Cyan
      else if (rand > 0.6) color = '#ff00c8'; // Pink

      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        len: 100 + Math.random() * 200,
        speed: 10 + Math.random() * 15,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 0,
        active: true,
        color
      });
    };

    regenDots();
    window.addEventListener("resize", regenDots);

    const draw = (now: number) => {
      if (stopped) return;
      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const time = (now / 1000) * speedScale;

      // Smoothly interpolate mouse and scroll values
      lerpMouseRef.current.x += (mouseRef.current.x - lerpMouseRef.current.x) * 0.05;
      lerpMouseRef.current.y += (mouseRef.current.y - lerpMouseRef.current.y) * 0.05;
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.1;

      // Scroll-based zoom effect: subtle zoom as user scrolls
      // We map the scroll position to a slight scale increase
      const scrollZoomFactor = 1 + (scrollRef.current * 0.00005);
      
      // Global cinematic breathing zoom
      const breathingZoom = 1 + 0.02 * Math.sin(time * 0.2);
      
      const combinedZoom = breathingZoom * scrollZoomFactor;
      const centerX = width / 2;
      const centerY = height / 2;

      dots.forEach((d) => {
        // Twinkle calculation
        const mod = (time * d.speed + d.phase) % 2;
        const lin = mod < 1 ? mod : 2 - mod;
        const intensity = 0.2 + 0.8 * (lin * lin);

        // Subtle individual size pulse
        const pulse = 0.8 + 0.4 * Math.sin(time * d.pulseSpeed + d.pulsePhase);
        
        // Parallax offset based on mouse position
        const parallaxX = lerpMouseRef.current.x * 20 * d.depth;
        const parallaxY = lerpMouseRef.current.y * 20 * d.depth;

        // Apply zoom and parallax to coordinates
        const relX = (d.x - centerX + parallaxX) * combinedZoom + centerX;
        const relY = (d.y - centerY + parallaxY) * combinedZoom + centerY;
        const currentSize = d.size * pulse * combinedZoom;

        ctx.beginPath();
        ctx.arc(relX, relY, currentSize, 0, Math.PI * 2);
        
        const finalAlpha = d.baseAlpha * intensity * opacity;
        
        if (intensity > 0.8 && d.glowIntensity > 0.5) {
           ctx.shadowColor = d.color;
           ctx.shadowBlur = 8 * (intensity - 0.8) * d.glowIntensity;
           ctx.fillStyle = d.color;
        } else {
           ctx.shadowBlur = 0;
           ctx.fillStyle = d.color;
        }
        
        ctx.globalAlpha = finalAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Increased Shooting Stars logic frequency
      if (Math.random() < 0.006) {
        spawnShootingStar();
      }

      shootingStars = shootingStars.filter(s => s.active);
      shootingStars.forEach(s => {
        const dx = Math.cos(s.angle) * s.speed;
        const dy = Math.sin(s.angle) * s.speed;
        
        s.x += dx;
        s.y += dy;
        
        if (s.opacity < 1 && s.x < width && s.y < height) {
          s.opacity += 0.04;
        }
        
        if (s.x > width || s.y > height) {
          s.opacity -= 0.04;
          if (s.opacity <= 0) s.active = false;
        }

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          s.x, s.y, 
          s.x - Math.cos(s.angle) * s.len, 
          s.y - Math.sin(s.angle) * s.len
        );
        
        const hexToRgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `${r}, ${g}, ${b}`;
        };
        const rgb = hexToRgb(s.color);

        gradient.addColorStop(0, `rgba(${rgb}, ${s.opacity})`);
        gradient.addColorStop(1, `rgba(${rgb}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${s.opacity})`;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", regenDots);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      ro.disconnect();
    };
  }, [gap, radius, opacity, speedMin, speedMax, speedScale]);

  return (
    <div ref={containerRef} className={className} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
