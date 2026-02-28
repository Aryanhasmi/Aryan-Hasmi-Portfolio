
import React, { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import {
    RobotIcon, ArrowUpIcon, LinkedInIcon, GitHubIcon, ThinkingIcon, SunIcon, MoonIcon
} from './components/Icons';
import { SkillBadge, EducationCard, CertCard } from './components/ResumeComponents';
import { hapticFeedback } from './utils';

// Lazy load heavy components
const ParticleNetworkBackground = lazy(() => import('./components/ParticleNetworkBackground'));
const AIChat = lazy(() => import('./components/AIChat'));
const ProjectVault = lazy(() => import('./components/ProjectVault'));
const ProgressiveImage = lazy(() => import('./components/ProgressiveImage'));

// Resume Data
const RESUME_DATA = {
    name: "Aryan Hasmi",
    tagline: "Being self-motivated.",
    summary: "Passionate Software Engineering Enthusiast and Innovative Problem Solver. Keen observer, idea generator, and lifelong learner.",
    skills: ["MERN Stack", "React.js", "Next.js", "Flutter", "Dart", "Java", "Node.js", "Express.js", "MongoDB", "AI Automation", "Prompt Engineering"],
    experience: [
        {
            title: "Web Developer (Intern)",
            company: "Digitaldict Technology Private Limited",
            duration: "Sep 2024 - Dec 2024",
            details: "Designed responsive websites using MERN stack, optimized performance, and collaborated with dev teams."
        },
        {
            title: "Web Developer (Intern)",
            company: "Digitaldict Technology Pvt. Ltd.",
            duration: "May 2024 - July 2024",
            details: "Designed and developed responsive websites, ensuring optimal performance and exceptional user experience."
        }
    ],
    education: [
        {
            degree: "Bachelor in Computer Science and Engineering",
            institution: "Parul university / Vadodara, Gujarat, India",
            duration: "September, 2021 - May, 2025"
        },
        {
            degree: "Diploma CSE",
            institution: "Invertis University / Bareilly, India",
            duration: "July, 2018 - September, 2021"
        },
        {
            degree: "High School",
            institution: "Shree Rastriya Secondary School / Ramgram-9-Karmaini, Nawalparasi, Nepal",
            duration: "May, 2017 - July, 2018"
        }
    ],
    certifications: [
        {
            name: "Web Developer Internship (8th Semester)",
            issuer: "Digitaldict Technology Pvt. Ltd.",
            date: "September 2024",
            details: "Selected for the position of Web Developer based on skills demonstrated during the interview process. Responsibilities included designing, coding, and modifying websites from layout to function, striving to create visually appealing sites with user-friendly design, and developing applications using the latest web technologies.",
            link: "/certificates/internshipsem8.webp"
        },
        {
            name: "Web Developer Internship (7th Semester)",
            issuer: "Digitaldict Technology Pvt. Ltd.",
            date: "May 2024 - July 2024",
            details: "Successfully completed the role of Web Developer. Demonstrated exceptional skills and dedication in designing and developing websites, ensuring responsive design, and optimizing website performance.",
            link: "/certificates/internshipsem7.webp"
        },
        {
            name: "AI Boost Bites: Automate tasks with Gemini and Apps Script",
            issuer: "Google Skills",
            date: "2025",
            details: "Earned skill badge by demonstrating the ability to automate tasks using Google Gemini and Apps Script.",
            link: "https://www.skills.google/public_profiles/0b01248e-85c6-4781-8a1c-6611a5f6304f/badges/21848750",
            logo: "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
        },
        {
            name: "Machine Learning Operations (MLOps) for Generative AI",
            issuer: "Google Skills",
            date: "2025",
            details: "Earned skill badge for Machine Learning Operations (MLOps) targeting Generative AI workflows.",
            link: "https://www.skills.google/public_profiles/0b01248e-85c6-4781-8a1c-6611a5f6304f/badges/20789451",
            logo: "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
        },
        {
            name: "Google Startup School: Prompt to Prototype",
            issuer: "Google for Startups",
            date: "2025",
            details: "Mastered Generative AI Integration, Prompt Engineering, Rapid Prototyping, and Strategic AI Application.",
            link: "/certificates/googlestartupschool.webp",
            points: [
                "Learned to leverage LLMs and Google’s AI tools to accelerate the product development lifecycle from initial concept to functional prototype.",
                "Developed advanced skills in prompt engineering to automate workflows and generate high-quality code snippets.",
                "Applied AI-driven methodologies to quickly build, iterate, and validate Minimum Viable Products (MVPs).",
                "Explored use cases for integrating AI into business operations, including automated customer insights and technical documentation."
            ]
        },
        {
            name: "Linux Command Line Terminal",
            issuer: "Udemy",
            date: "2021",
            details: "Proficient in command-line terminal operations, validated by a Certificate of Completion from Udemy.",
            link: "/certificates/linuxcommandlinecertificate.webp"
        },
        {
            name: "Bootcamp: Netflix Clone",
            issuer: "Devtown",
            date: "2021",
            details: "Participated in a 7-day bootcamp on Netflix Clone development using HTML, CSS, and JavaScript in collaboration with Microsoft Learn and GDG Ranchi.",
            link: "/certificates/bootcampcertificate.webp"
        }
    ],
    projects: [
        {
            name: "KAAM LELO",
            type: "Job Seeker Platform",
            details: "Database management and efficient website functionality.",
            techStack: ["React", "Node.js", "MongoDB", "Express", "REST API"],
            longDescription: "A robust recruitment portal designed to bridge the gap between skilled workers and employers. Features include real-time application tracking, automated profile matching, and an optimized dashboard for high-volume database operations."
        },
        {
            name: "Guided Timer",
            type: "Health & Fitness App",
            details: "An AI powered app for Guided Meditation, Breathing and more.",
            techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "PWA"],
            longDescription: "Guided Timer is a free, AI-powered app designed to elevate your sessions—whether it’s meditation, pomodoro, tabata, breathing exercises, workouts, study, yoga and more. Go beyond simple countdowns with customizable timers, immersive sound cues, haptic feedback, and on-screen guidance that keeps you in flow.",
            url: "https://guidedtimer.com"
        },
        {
            name: "Restaurant Reservation",
            type: "Backend System",
            details: "Node/Express/MongoDB scalable server-side functionality.",
            techStack: ["Node.js", "Express", "MongoDB", "JWT Auth", "Cloudinary"],
            longDescription: "A highly scalable reservation system supporting multi-table booking, seat availability mapping, and secure transaction handling. Built with a modular architecture to handle peak traffic during festive seasons."
        }
    ],
    contact: {
        email: "aryanhasmi0@gmail.com",
        phone: "+977 9707585123",
        location: "Palhinandan, Nawalparasi, Nepal",
        linkedin: "aryanhasmi786",
        github: "Aryanhasmi"
    }
};


const MagneticEffect: React.FC<{ children: React.ReactElement, intense?: boolean }> = ({ children, intense = false }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        // Calculate distance FROM center of button TO cursor
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        // The previous factor calculation pushed them away, we want to pull them towards:
        const factor = intense ? 0.3 : 0.15;
        setPosition({ x: middleX * factor, y: middleY * factor });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: 'relative', display: 'inline-block' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

function App() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [chatOpen, setChatOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        return (savedTheme as 'dark' | 'light') || 'light';
    });

    // Form States
    const [formData, setFormData] = useState({ identifier: '', email: '', payload: '' });
    const [formErrors, setFormErrors] = useState({ identifier: '', email: '', payload: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const validateForm = () => {
        const errors = { identifier: '', email: '', payload: '' };
        let isValid = true;

        if (!formData.identifier.trim()) {
            errors.identifier = "IDENTIFIER_MISSING";
            isValid = false;
        }
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "INVALID_ENCRYPTION_ADDRESS";
            isValid = false;
        }
        if (formData.payload.length < 10) {
            errors.payload = "PAYLOAD_MIN_LENGTH_10";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            hapticFeedback('heavy');
            return;
        }

        hapticFeedback('medium');
        setFormStatus('sending');

        try {
            const API_KEY = typeof process !== 'undefined' && process.env && process.env.VITE_WEB3FORMS_KEY
                ? process.env.VITE_WEB3FORMS_KEY
                : ((import.meta as any).env && (import.meta as any).env.VITE_WEB3FORMS_KEY);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: API_KEY || "YOUR_ACCESS_KEY_HERE",
                    name: formData.identifier,
                    email: formData.email,
                    message: formData.payload,
                }),
            });
            const result = await response.json();

            if (result.success) {
                hapticFeedback('light');
                setFormStatus('sent');
            } else {
                hapticFeedback('heavy');
                setFormStatus('idle');
                alert("Transmission Failed. Invalid Access Key.");
            }
        } catch (error) {
            hapticFeedback('heavy');
            setFormStatus('idle');
            alert("Network error during transmission.");
        }
    };

    const scrollHome = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tiltStyle = useMemo(() => {
        const x = (mousePos.x / window.innerWidth - 0.5) * 10;
        const y = (mousePos.y / window.innerHeight - 0.5) * -10;
        return { transform: `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)` };
    }, [mousePos]);

    return (
        <div className="portfolio-container">
            <Suspense fallback={<div className="bg-fallback" />}>
                <ParticleNetworkBackground theme={theme} />
            </Suspense>

            <header className="navbar">
                <div className="logo" onClick={() => { hapticFeedback('light'); scrollHome(); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    Aryan Hasmi<span>_</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div className="nav-links">
                        <a href="#about" onClick={() => hapticFeedback('light')}>About</a>
                        <a href="#skills" onClick={() => hapticFeedback('light')}>Skills</a>
                        <a href="#education" onClick={() => hapticFeedback('light')}>Education</a>
                        <a href="#certs" onClick={() => hapticFeedback('light')}>Certs</a>
                        <a href="#projects" onClick={() => hapticFeedback('light')}>Vault</a>
                        <a href="#contact" onClick={() => hapticFeedback('light')}>Contact</a>
                    </div>
                    <button
                        onClick={() => { hapticFeedback('medium'); setTheme(t => t === 'dark' ? 'light' : 'dark'); }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>
            </header>

            <main className="hero-section">
                <div className="hero-grid">
                    <div className="profile-container" style={tiltStyle}>
                        <div className="profile-frame interactive-frame">
                            <Suspense fallback={<div className="profile-pic loading-blur" />}>
                                <ProgressiveImage
                                    src="profile.png"
                                    placeholderSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                                    alt="Aryan Hasmi"
                                    className="profile-pic"
                                />
                            </Suspense>
                            <div className="scan-line"></div>
                            <div className="frame-glitch-overlay"></div>
                            <div className="frame-corner corner-tl"></div>
                            <div className="frame-corner corner-tr"></div>
                            <div className="frame-corner corner-bl"></div>
                            <div className="frame-corner corner-br"></div>
                        </div>
                        <div className="status-indicator interactive-status">
                            <span className="status-dot pulse"></span>
                            <span className="status-text">SYSTEM_ONLINE</span>
                        </div>
                    </div>

                    <div className="intro-text">
                        <h2 className="glitch" data-text="ARYAN HASMI">ARYAN HASMI</h2>
                        <h3 className="tagline">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            >
                                {RESUME_DATA.tagline}
                            </motion.span>
                        </h3>
                        <motion.p
                            className="summary"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {RESUME_DATA.summary}
                        </motion.p>
                        <div className="hero-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <MagneticEffect intense>
                                <button className="btn-primary" onClick={() => { hapticFeedback('medium'); setChatOpen(true); }} style={{ margin: 0 }}>
                                    <RobotIcon /> A.AI
                                </button>
                            </MagneticEffect>
                            <MagneticEffect>
                                <a href="#contact" className="btn-secondary" onClick={() => hapticFeedback('light')} style={{ margin: 0 }}>
                                    HIRED_ME.EXE
                                </a>
                            </MagneticEffect>
                        </div>
                    </div>
                </div>
            </main>

            <section className="about-detail-section" id="about">
                <div className="section-header">
                    <div className="line"></div>
                    <h2>SYSTEM_MANIFESTO</h2>
                </div>
                <div className="about-detail-grid">
                    <div className="manifesto-card">
                        <h3>Mission</h3>
                        <p>To architect digital experiences that merge high-level functionality with avant-garde aesthetics. I believe code is more than logic; it's a medium for innovation.</p>
                    </div>
                    <div className="manifesto-card">
                        <h3>Philosophy</h3>
                        <p>Embracing the 'forever student' mindset. Every challenge is a debugging process for growth. From MERN to AI, the stack is just a tool—vision is the driver.</p>
                    </div>
                    <div className="manifesto-card">
                        <h3>Trajectory</h3>
                        <p>Currently engineering solutions in the MERN ecosystem while exploring the frontiers of AI Automation and Prompt Engineering to shape the future of tech.</p>
                    </div>
                </div>
            </section>

            <section className="skills-section" id="skills">
                <div className="section-header">
                    <div className="line"></div>
                    <h2>COGNITIVE_STACK</h2>
                </div>
                <div className="skills-grid">
                    {RESUME_DATA.skills.map((s, idx) => (
                        <SkillBadge key={s} skill={s} index={idx} isVisible={true} />
                    ))}
                </div>
            </section>

            <section className="education-section" id="education">
                <div className="section-header">
                    <div className="line"></div>
                    <h2>ACADEMIC_PATH</h2>
                </div>
                <div className="education-grid">
                    {RESUME_DATA.education.map((edu, idx) => (
                        <EducationCard key={edu.degree} edu={edu} index={idx} isVisible={true} />
                    ))}
                </div>
            </section>

            <section className="certs-section" id="certs">
                <div className="section-header">
                    <div className="line"></div>
                    <h2>CERT_VALIDATION_PROTOCOL</h2>
                </div>
                <div className="certs-grid">
                    {RESUME_DATA.certifications.map((cert, idx) => (
                        <CertCard key={idx} cert={cert} index={idx} isVisible={true} />
                    ))}
                </div>
            </section>

            <Suspense fallback={<div className="section-loader">Loading Vault...</div>}>
                <ProjectVault projects={RESUME_DATA.projects} />
            </Suspense>

            <section className="experience-section">
                <div className="section-header">
                    <div className="line"></div>
                    <h2>HISTORY_LOG</h2>
                </div>
                <div className="timeline">
                    {/* Animated vertical track */}
                    <div className="timeline-track">
                        <motion.div
                            className="timeline-progress"
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    {RESUME_DATA.experience.map((exp, idx) => (
                        <motion.div
                            className="timeline-item"
                            key={exp.company}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                        >
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <h4>{exp.title} @ {exp.company}</h4>
                                <p className="time">{exp.duration}</p>
                                <p>{exp.details}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="contact-section" id="contact">
                <div className="section-header">
                    <div className="line"></div>
                    <h2>COMMS_CHANNEL</h2>
                </div>

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="info-card">
                            <span className="info-label">ENCRYPTED_EMAIL</span>
                            <p>{RESUME_DATA.contact.email}</p>
                        </div>
                        <div className="info-card">
                            <span className="info-label">GEOLOCATION</span>
                            <p>{RESUME_DATA.contact.location}</p>
                        </div>
                        <div className="info-card">
                            <span className="info-label">SECURE_VOICE</span>
                            <p>{RESUME_DATA.contact.phone}</p>
                        </div>
                        <div className="social-nodes">
                            <a
                                href={`https://linkedin.com/in/${RESUME_DATA.contact.linkedin}`}
                                target="_blank"
                                rel="noreferrer"
                                className="node"
                                title="LinkedIn Profile"
                                onClick={() => hapticFeedback('light')}
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href={`https://github.com/${RESUME_DATA.contact.github}`}
                                target="_blank"
                                rel="noreferrer"
                                className="node"
                                title="GitHub Profile"
                                onClick={() => hapticFeedback('light')}
                            >
                                <GitHubIcon />
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        {formStatus === 'sent' ? (
                            <div className="sent-confirmation">
                                <div className="glitch-text">SIGNAL_RECEIVED</div>
                                <p>I'll process your message shortly.</p>
                                <button className="btn-secondary" onClick={() => {
                                    hapticFeedback('light');
                                    setFormStatus('idle');
                                    setFormData({ identifier: '', email: '', payload: '' });
                                }}>RESET_TRANSCEIVER</button>
                            </div>
                        ) : (
                            <form className="cyber-form" onSubmit={handleSubmitForm} noValidate>
                                <div className={`input-group ${formErrors.identifier ? 'has-error' : ''}`}>
                                    <input
                                        type="text"
                                        placeholder="IDENTIFIER / Name"
                                        value={formData.identifier}
                                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                        required
                                    />
                                    <div className="bar"></div>
                                    {formErrors.identifier && <span className="error-hint">{formErrors.identifier}</span>}
                                </div>
                                <div className={`input-group ${formErrors.email ? 'has-error' : ''}`}>
                                    <input
                                        type="email"
                                        placeholder="RETURN_ADDR / Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                    <div className="bar"></div>
                                    {formErrors.email && <span className="error-hint">{formErrors.email}</span>}
                                </div>
                                <div className={`input-group ${formErrors.payload ? 'has-error' : ''}`}>
                                    <textarea
                                        placeholder="DATA_PAYLOAD / Message"
                                        rows={4}
                                        value={formData.payload}
                                        onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                                        required
                                    ></textarea>
                                    <div className="bar"></div>
                                    {formErrors.payload && <span className="error-hint">{formErrors.payload}</span>}
                                </div>
                                <button type="submit" className={`btn-primary ${formStatus === 'sending' ? 'loading' : ''}`} disabled={formStatus === 'sending'}>
                                    {formStatus === 'sending' ? (
                                        <><ThinkingIcon style={{ marginRight: '8px' }} /> TRANSMITTING...</>
                                    ) : 'TRANSMIT_SIGNAL.EXE'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="copyright">© 2025 ARYAN HASMI. ALL RIGHTS RESERVED. // <span className="footer-tag">DESIGNED_FOR_FUTURE</span></div>
            </footer>

            <Suspense fallback={null}>
                {chatOpen && (
                    <AIChat
                        isOpen={chatOpen}
                        onClose={() => setChatOpen(false)}
                        resumeData={RESUME_DATA}
                    />
                )}
            </Suspense>

            <button
                className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
                onClick={() => { hapticFeedback('medium'); scrollHome(); }}
                title="Scroll to Top"
            >
                <ArrowUpIcon />
            </button>

            {!chatOpen && (
                <button className="chat-trigger" onClick={() => { hapticFeedback('heavy'); setChatOpen(true); }}>
                    <RobotIcon />
                </button>
            )}
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
