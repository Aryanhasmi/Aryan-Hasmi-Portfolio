
import React, { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
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
        { title: "Web Developer (Intern)", company: "Digitaldict Technology Private Limited", duration: "Sep 2024 - Dec 2024", details: "Designed responsive websites using MERN stack, optimized performance, and collaborated with dev teams." }
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
            name: "Google Startup School: Prompt to Prototype",
            issuer: "Google for Startups",
            date: "2025",
            details: "Mastered Generative AI Integration, Prompt Engineering, Rapid Prototyping, and Strategic AI Application.",
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
            details: "Proficient in command-line terminal operations, validated by a Certificate of Completion from Udemy."
        },
        {
            name: "Bootcamp: Netflix Clone",
            issuer: "Devtown",
            date: "2021",
            details: "Participated in a 7-day bootcamp on Netflix Clone development using HTML, CSS, and JavaScript in collaboration with Microsoft Learn and GDG Ranchi."
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

function App() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [chatOpen, setChatOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    // Form States
    const [formData, setFormData] = useState({ identifier: '', email: '', payload: '' });
    const [formErrors, setFormErrors] = useState({ identifier: '', email: '', payload: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    // Animation States
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [eduVisible, setEduVisible] = useState(false);
    const [certsVisible, setCertsVisible] = useState(false);
    const skillsRef = useRef<HTMLDivElement>(null);
    const eduSectionRef = useRef<HTMLDivElement>(null);
    const certsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
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

        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === skillsRef.current && entry.isIntersecting) setSkillsVisible(true);
                if (entry.target === eduSectionRef.current && entry.isIntersecting) setEduVisible(true);
                if (entry.target === certsSectionRef.current && entry.isIntersecting) setCertsVisible(true);
            });
        }, observerOptions);

        if (skillsRef.current) observer.observe(skillsRef.current);
        if (eduSectionRef.current) observer.observe(eduSectionRef.current);
        if (certsSectionRef.current) observer.observe(certsSectionRef.current);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
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
                <div className="logo" onClick={() => { hapticFeedback('light'); scrollHome(); }} style={{ cursor: 'pointer' }}>
                    A.HASMI<span>_</span>
                </div>
                <div className="nav-links">
                    <a href="#about" onClick={() => hapticFeedback('light')}>About</a>
                    <a href="#skills" onClick={() => hapticFeedback('light')}>Skills</a>
                    <a href="#education" onClick={() => hapticFeedback('light')}>Education</a>
                    <a href="#certs" onClick={() => hapticFeedback('light')}>Certs</a>
                    <a href="#projects" onClick={() => hapticFeedback('light')}>Vault</a>
                    <a href="#contact" onClick={() => hapticFeedback('light')}>Contact</a>
                    <button
                        onClick={() => { hapticFeedback('medium'); setTheme(t => t === 'dark' ? 'light' : 'dark'); }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}
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
                        <h3 className="tagline">{RESUME_DATA.tagline}</h3>
                        <p className="summary">{RESUME_DATA.summary}</p>
                        <div className="hero-actions">
                            <button className="btn-primary" onClick={() => { hapticFeedback('medium'); setChatOpen(true); }}>
                                <RobotIcon /> A.AI
                            </button>
                            <a href="#contact" className="btn-secondary" onClick={() => hapticFeedback('light')}>
                                HIRED_ME.EXE
                            </a>
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

            <section className="skills-section" id="skills" ref={skillsRef}>
                <div className="section-header">
                    <div className="line"></div>
                    <h2>COGNITIVE_STACK</h2>
                </div>
                <div className="skills-grid">
                    {RESUME_DATA.skills.map((s, idx) => (
                        <SkillBadge key={s} skill={s} index={idx} isVisible={skillsVisible} />
                    ))}
                </div>
            </section>

            <section className="education-section" id="education" ref={eduSectionRef}>
                <div className="section-header">
                    <div className="line"></div>
                    <h2>ACADEMIC_PATH</h2>
                </div>
                <div className="education-grid">
                    {RESUME_DATA.education.map((edu, idx) => (
                        <EducationCard key={edu.degree} edu={edu} index={idx} isVisible={eduVisible} />
                    ))}
                </div>
            </section>

            <section className="certs-section" id="certs" ref={certsSectionRef}>
                <div className="section-header">
                    <div className="line"></div>
                    <h2>CERT_VALIDATION_PROTOCOL</h2>
                </div>
                <div className="certs-grid">
                    {RESUME_DATA.certifications.map((cert, idx) => (
                        <CertCard key={idx} cert={cert} index={idx} isVisible={certsVisible} />
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
                    {RESUME_DATA.experience.map(exp => (
                        <div className="timeline-item" key={exp.company}>
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <h4>{exp.title} @ {exp.company}</h4>
                                <p className="time">{exp.duration}</p>
                                <p>{exp.details}</p>
                            </div>
                        </div>
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
