
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CodeIcon } from './Icons';

import { hapticFeedback } from '../utils';

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Spotlight calculation
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${localX}px`);
        cardRef.current.style.setProperty('--mouse-y', `${localY}px`);

        // 3D Tilt calculation
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const toggleExpand = () => {
        hapticFeedback('light');
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            className={`project-card interactive-card ${isExpanded ? 'expanded' : ''}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={toggleExpand}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="project-inner" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                <div className="project-header-row">
                    <CodeIcon />
                    <span className="project-status-tag">{isExpanded ? 'NODE_EXPANDED' : 'ACTIVE_NODE'}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-type">{project.type}</p>
                <p className="project-details">{project.details}</p>

                <div className="expanded-content">
                    <div className="expanded-divider"></div>
                    <p className="long-description">{project.longDescription}</p>
                    <div className="tech-stack-row">
                        {project.techStack.map((tech: string) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="project-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="footer-link">
                        {isExpanded ? 'COMPRESS_DATA.SH' : 'DECRYPT_DATA.TXT'}
                    </span>
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link live-link"
                            onClick={(e) => { e.stopPropagation(); hapticFeedback('medium'); }}
                            style={{ textDecoration: 'none', color: 'var(--accent-cyan)' }}
                        >
                            LIVE_PREVIEW.EXE
                        </a>
                    )}
                </div>
            </div>
            <div className="project-spotlight"></div>
        </motion.div>
    );
};

interface ProjectVaultProps {
    projects: any[];
}

const ProjectVault: React.FC<ProjectVaultProps> = ({ projects }) => {
    return (
        <section className="projects-section" id="projects">
            <div className="section-header">
                <div className="line"></div>
                <h2>PROJECT_VAULT</h2>
            </div>
            <div className="projects-grid">
                {projects.map(p => <ProjectCard key={p.name} project={p} />)}
            </div>
        </section>
    );
};

export default ProjectVault;
