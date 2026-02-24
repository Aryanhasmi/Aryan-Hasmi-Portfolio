import React, { useEffect, useRef } from 'react';

const AntigravityBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseParams = useRef({ x: 0, y: 0, isActive: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Resize canvas
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // set initial mouse to center
            mouseParams.current.x = window.innerWidth / 2;
            mouseParams.current.y = window.innerHeight / 2;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Track Mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouseParams.current.x = e.clientX;
            mouseParams.current.y = e.clientY;
            mouseParams.current.isActive = true;
        };
        const handleMouseLeave = () => {
            mouseParams.current.isActive = false;
        };
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // Orbs definition
        const orbs = [
            {
                x: window.innerWidth / 3, y: window.innerHeight / 3,
                radius: window.innerWidth * 0.4,
                color: 'rgba(0, 243, 255, 0.4)', // Cyan
                spring: 0.05, friction: 0.9, speed: 0.5,
                angle: 0, cx: window.innerWidth / 3, cy: window.innerHeight / 3,
                vx: 0, vy: 0
            },
            {
                x: window.innerWidth * 0.6, y: window.innerHeight * 0.6,
                radius: window.innerWidth * 0.5,
                color: 'rgba(181, 55, 242, 0.35)', // Purple
                spring: 0.03, friction: 0.85, speed: 0.6,
                angle: Math.PI, cx: window.innerWidth * 0.6, cy: window.innerHeight * 0.6,
                vx: 0, vy: 0
            },
            {
                x: window.innerWidth / 2, y: window.innerHeight / 2,
                radius: window.innerWidth * 0.45,
                color: 'rgba(10, 10, 35, 0.8)', // Dark core blender
                spring: 0.07, friction: 0.95, speed: 0.4,
                angle: Math.PI / 2, cx: window.innerWidth / 2, cy: window.innerHeight / 2,
                vx: 0, vy: 0
            }
        ];

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw deep space background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Use global composite for the intense glowing fluid effect
            ctx.globalCompositeOperation = 'screen';

            orbs.forEach((orb, i) => {
                // Background idle movement (figure 8 or circle patterns based on time)
                orb.angle += orb.speed * 0.01;
                let idleX = orb.cx + Math.cos(orb.angle) * 100;
                let idleY = orb.cy + Math.sin(orb.angle * 1.5) * 80;

                // Mouse interaction vs idle state
                let targetX = mouseParams.current.isActive ? mouseParams.current.x : idleX;
                let targetY = mouseParams.current.isActive ? mouseParams.current.y : idleY;

                // If dark core, slightly offset to create parallax/depth
                if (i === 2) {
                    targetX = (targetX + orb.cx) / 2;
                    targetY = (targetY + orb.cy) / 2;
                    ctx.globalCompositeOperation = 'source-over'; // don't screen the black core
                }

                // Spring physics calculations
                const dx = targetX - orb.x;
                const dy = targetY - orb.y;
                orb.vx += dx * orb.spring;
                orb.vy += dy * orb.spring;
                orb.vx *= orb.friction;
                orb.vy *= orb.friction;

                orb.x += orb.vx;
                orb.y += orb.vy;

                // Create smooth radial gradient
                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Optional: reset composite
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1, // places it behind everything
                pointerEvents: 'none', // ensures it doesn't block clicks on buttons
            }}
        />
    );
};

export default AntigravityBackground;
