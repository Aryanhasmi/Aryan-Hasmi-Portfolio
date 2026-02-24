
import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps {
    src: string;
    placeholderSrc: string;
    alt: string;
    className?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ src, placeholderSrc, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`${className} ${isLoaded ? 'loaded' : 'loading-blur'}`}
            style={{
                filter: isLoaded ? 'none' : 'blur(20px)',
                transition: 'filter 0.5s ease-out, opacity 0.5s ease-out',
                opacity: isLoaded ? 1 : 0.7,
            }}
        />
    );
};

export default ProgressiveImage;
