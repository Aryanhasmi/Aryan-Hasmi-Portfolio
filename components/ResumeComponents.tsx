
import React from 'react';
import { motion } from 'framer-motion';
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

export const SkillBadge: React.FC<{ skill: string; index: number; isVisible: boolean }> = ({ skill, index }) => (
    <motion.div
        className="skill-badge"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
    >
        <span className="skill-tech-icon">{getSkillIcon(skill)}</span>
        {skill}
    </motion.div>
);

export const EducationCard: React.FC<{ edu: any; index: number; isVisible: boolean }> = ({ edu, index }) => (
    <motion.div
        className="education-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
    >
        <div className="edu-tag">{edu.duration}</div>
        <h3>{edu.degree}</h3>
        <p className="institution">{edu.institution}</p>
        <div className="edu-glow"></div>
    </motion.div>
);

export const CertCard: React.FC<{ cert: any; index: number; isVisible: boolean }> = ({ cert, index }) => (
    <motion.div
        className="cert-card interactive-cert"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
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
        <div className="cert-glow"></div>
    </motion.div>
);
