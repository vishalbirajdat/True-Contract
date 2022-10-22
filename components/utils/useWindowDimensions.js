import React, { useState, useEffect } from 'react';

const hasWindow = typeof window !== 'undefined';
const getWindowsWidth = hasWindow && window.innerWidth;

const [windowDimensions, setWindowDimensions] = useState(hasWindow ? window.innerWidth < 600 ? "sm" : "lg" : null);

useEffect(() => {
    if (hasWindow) {
        function handleResize() {
            const width = hasWindow ? window.innerWidth : null;
            setWindowDimensions(width < 600 ? "sm" : "lg");
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
}, [hasWindow ? getWindowsWidth : hasWindow]);

export default function useWindowDimensions() {
    return windowDimensions;
}