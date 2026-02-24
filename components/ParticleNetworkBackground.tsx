import React, { useEffect, useRef } from 'react';

const ParticleNetworkBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseParams = useRef({ x: 0, y: 0, isActive: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Track Mouse & Touch
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            let clientX, clientY;
            if (e instanceof TouchEvent) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            mouseParams.current.x = clientX;
            mouseParams.current.y = clientY;
            mouseParams.current.isActive = true;
        };
        const handleMouseLeave = () => {
            mouseParams.current.isActive = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove, { passive: true });
        window.addEventListener('touchstart', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchend', handleMouseLeave);

        // Particle configuration
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000); // Responsive count
        const particles: { x: number, y: number, vx: number, vy: number, radius: number, color: string }[] = [];
        const connectionDistance = 150;
        const mouseRepelDistance = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1, // Slow drift
                vy: (Math.random() - 0.5) * 1,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'rgba(0, 242, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)'
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Deep space background
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse repel logic
                if (mouseParams.current.isActive) {
                    const dx = p.x - mouseParams.current.x;
                    const dy = p.y - mouseParams.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseRepelDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseRepelDistance - distance) / mouseRepelDistance;
                        
                        // Push particles away smoothly
                        p.vx += forceDirectionX * force * 0.5;
                        p.vy += forceDirectionY * force * 0.5;
                    }
                }

                // Apply velocity and friction
                p.x += p.vx;
                p.y += p.vy;
                
                // Base floating movement + slight friction to limit speed from repel
                p.vx = p.vx * 0.98 + (Math.random() - 0.5) * 0.05;
                p.vy = p.vy * 0.98 + (Math.random() - 0.5) * 0.05;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Keeps them strictly inside bounds after bounce
                p.x = Math.max(0, Math.min(canvas.width, p.x));
                p.y = Math.max(0, Math.min(canvas.height, p.y));

                // Draw Particle Node
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Opacity based on distance
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(0, 242, 255, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
                
                // Draw connection to cursor
                if (mouseParams.current.isActive) {
                    const dx = p.x - mouseParams.current.x;
                    const dy = p.y - mouseParams.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < connectionDistance * 1.5) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouseParams.current.x, mouseParams.current.y);
                        const opacity = 1 - (distance / (connectionDistance * 1.5));
                        ctx.strokeStyle = `rgba(181, 55, 242, ${opacity * 0.4})`; // Purple line to cursor
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchstart', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchend', handleMouseLeave);
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
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default ParticleNetworkBackground;
