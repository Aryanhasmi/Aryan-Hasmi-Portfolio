
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// Define standard SVG props to be used by all icons
type IconProps = React.SVGProps<SVGSVGElement>;

export const ThinkingIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props} className={`spin-icon ${props.className || ''}`}>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" opacity=".3"/>
        <path d="M20 12h2A10 10 0 0012 2v2a8 8 0 018 8z"/>
    </svg>
);
export const CodeIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);
export const SparklesIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 .25a.75.75 0 0 1 .673.418L9.743 3.25l2.579.375a.75.75 0 0 1 .416 1.285l-1.867 1.82.44 2.569a.75.75 0 0 1-1.088.791L8 8.975l-2.302 1.21a.75.75 0 0 1-1.088-.79l.44-2.57-1.867-1.82a.75.75 0 0 1 .416-1.285l2.579-.375L7.327.668A.75.75 0 0 1 8 .25zM4.5 11.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
    </svg>
);
// Fix for Error in file index.tsx: Add props support to RobotIcon
export const RobotIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
);
export const ArrowUpIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 15-6-6-6 6"/></svg>
);
export const LinkedInIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);
export const GitHubIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

// Technology Specific Icons for Skills
export const ReactIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="1.2em" height="1.2em" {...props}>
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);
export const NodeIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M12,2L4.5,6.3V15L12,19.3L19.5,15V6.3L12,2M12,16.5V12L8,9.7V14L12,16.5M16,14V9.7L12,12V16.5L16,14M12,4.8L17.5,8V13.3L12,10.1V4.8Z"/>
    </svg>
);
export const MongoDBIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M17.19,10.45C17,8.22 15.63,5.92 13.5,3.75C12.75,3 12.38,2.62 12,2.25C11.63,2.62 11.25,3 10.5,3.75C8.38,5.92 7,8.22 6.81,10.45C6.38,15.11 9.41,18.84 12,21.75C14.59,18.84 17.62,15.11 17.19,10.45M12.5,16.5C12.5,16.5 12,16.75 12,16.75C12,16.75 11.5,16.5 11.5,16.5C11.12,16.31 10.88,15.93 10.88,15.5C10.88,14.88 11.38,14.38 12,14.38C12.62,14.38 13.13,14.88 13.13,15.5C13.13,15.93 12.88,16.31 12.5,16.5M12.5,10C12.5,10 12,10.5 12,10.5C12,10.5 11.5,10 11.5,10C10.67,9.17 10.12,8.08 10,6.88C10.12,6.88 10.25,6.88 10.38,6.88C11.56,6.88 12.63,7.25 13.5,7.88C13.25,8.75 12.88,9.5 12.5,10Z"/>
    </svg>
);
export const FlutterIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M14.31,2.35L5.65,11L14.31,19.65L23,11L14.31,2.35M14.31,7.65L11,11L14.31,14.35L17.65,11L14.31,7.65Z"/>
    </svg>
);
export const NextjsIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M12,2L2,12L12,22L22,12L12,2M12,19.3L6.7,14L12,8.7L17.3,14L12,19.3Z"/>
    </svg>
);
export const ExpressIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M4,15V9H12V11H6V13H11V15H4M13,15V9H21V11H15V12H20V14H15V15H13Z"/>
    </svg>
);
export const JavaIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M2,18C2,19 3,20 5,20C5,20 18,20 18,20C20,20 21,19 21,18V17H2V18M18,13H15V11H18V13M13,13H2V11H13V13M2,16V14H21V16H2M18,10H15V8H18V10M13,10H2V8H13V10M18,7H15V5H18V7M13,7H2V5H13V7Z"/>
    </svg>
);
export const DartIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M12,2L2,12L12,22L22,12L12,2M12,18.5L5.5,12L12,5.5L18.5,12L12,18.5Z"/>
    </svg>
);
export const AIIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" {...props}>
        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M13,10V18H11V10H13M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6Z"/>
    </svg>
);
export const TerminalIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.2em" height="1.2em" {...props}>
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);
export const StackIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.2em" height="1.2em" {...props}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);
export const MoonIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
export const SunIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);
