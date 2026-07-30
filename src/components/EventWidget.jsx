'use client'
import React, { useEffect, useState } from 'react'

function EventWidget() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const read = () => document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(read());
        // Ikuti perubahan tema saat user menekan toggle (ThemeToggle mengubah data-theme di <html>)
        const obs = new MutationObserver(() => setTheme(read()));
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => obs.disconnect();
    }, []);

    return (
        <iframe
            src={`https://event.times.co.id/api/horizontal/widget?theme=${theme}`}
            title="Widget Acara Times.co.id"
            frameBorder="0"
            loading="lazy"
            className="w-full border-none overflow-hidden h-[700px] md:h-[800px]"
        />
    )
}

export default EventWidget
