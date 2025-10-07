"use client"; // <-- Tanda ini WAJIB ada

import React from 'react';

export default function ScrollButton({ url, children }) {
  const handleScrollClick = () => {
    if (typeof window !== "undefined") {
      const targetId = url.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <button
      onClick={handleScrollClick}
      className="p-0 m-0 bg-transparent border-none cursor-pointer text-left"
    >
      {children}
    </button>
  );
}