
import React from 'react';
import {
    ReactIcon, NodeIcon, MongoDBIcon, FlutterIcon, NextjsIcon,
    ExpressIcon, JavaIcon, DartIcon, AIIcon, TerminalIcon, StackIcon, CodeIcon
} from './Icons';

const getSkillIcon = (skill: string) => {
    switch (skill) {
        case "React.js": return <ReactIcon />;
        case "Node.js": return <NodeIcon />;
        case "MongoDB": return <MongoDBIcon />;
        case "Flutter": return <FlutterIcon />;
        case "Next.js": return <NextjsIcon />;
        case "Express.js": return <ExpressIcon />;
        case "Java": return <JavaIcon />;
        case "Dart": return <DartIcon />;
        case "AI Automation": return <AIIcon />;
        case "Prompt Engineering": return <TerminalIcon />;
        case "MERN Stack": return <StackIcon />;
        default: return <CodeIcon />;
    }
};

export const SkillBadge: React.FC<{ skill: string; index: number; isVisible: boolean }> = ({ skill, index, isVisible }) => (
    <div
        className={`skill-badge ${isVisible ? 'animate-in' : ''}`}
        style={{ transitionDelay: `${index * 80}ms` }}
    >
        <span className="skill-tech-icon">{getSkillIcon(skill)}</span>
        {skill}
    </div>
);

export const EducationCard: React.FC<{ edu: any; index: number; isVisible: boolean }> = ({ edu, index, isVisible }) => (
    <div
        className={`education-card ${isVisible ? 'animate-in' : ''}`}
        style={{ transitionDelay: `${index * 150}ms` }}
    >
        <div className="edu-tag">{edu.duration}</div>
        <h3>{edu.degree}</h3>
        <p className="institution">{edu.institution}</p>
        <div className="edu-glow"></div>
    </div>
);

export const CertCard: React.FC<{ cert: any; index: number; isVisible: boolean }> = ({ cert, index, isVisible }) => (
    <div
        className={`cert-card ${isVisible ? 'animate-in' : ''} ${cert.link ? 'interactive-cert' : ''}`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => cert.link && window.open(cert.link, '_blank', 'noopener,noreferrer')}
        role={cert.link ? "button" : undefined}
        tabIndex={cert.link ? 0 : undefined}
    >
        <div className="cert-header">
            <span className="cert-date">{cert.date}</span>
            <span className="cert-issuer">
                {cert.logo && <img src={cert.logo} alt={cert.issuer} className="cert-logo" />}
                {cert.issuer}
            </span>
        </div>
        <h4>{cert.name}</h4>
        <p className="cert-summary">{cert.details}</p>
        {cert.points && (
            <ul className="cert-points">
                {cert.points.map((p: string, i: number) => <li key={i}>{p}</li>)}
            </ul>
        )}
        {cert.link && (
            <div className="cert-action">
                <span className="verify-btn">Verify Credential ↗</span>
            </div>
        )}
        {cert.link && <div className="cert-glow"></div>}
    </div>
);
