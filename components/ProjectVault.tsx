
import React, { useRef, useState } from 'react';
import { CodeIcon } from './Icons';

import { hapticFeedback } from '../utils';

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const toggleExpand = () => {
        hapticFeedback('light');
        setIsExpanded(!isExpanded);
    };

    return (
        <div 
            className={`project-card interactive-card ${isExpanded ? 'expanded' : ''}`} 
            ref={cardRef} 
            onMouseMove={handleMouseMove}
            onClick={toggleExpand}
        >
            <div className="project-inner">
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
        </div>
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
