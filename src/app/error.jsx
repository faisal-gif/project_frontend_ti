'use client'; // Wajib menggunakan 'use client'

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error ke console
    console.error("Client-side error caught:", error);
  }, [error]);

  return (
    // bg-base-200 memberikan warna latar belakang yang lembut dari tema daisyUI
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="max-w-md text-center">
        {/* Ikon opsional untuk mempermanis UI */}
        <div className="mb-6 text-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-base-content mb-4">
          Waduh, terjadi kesalahan!
        </h2>
        
        <p className="text-base-content/70 mb-8">
          Maaf, kami mengalami masalah saat memuat halaman ini di browser Anda.
        </p>
        
        {/* Menggunakan class 'btn' dan 'btn-primary' dari daisyUI */}
        <button 
          className="btn btn-primary px-8"
          onClick={() => reset()}
        >
          Coba Muat Ulang
        </button>
      </div>
    </div>
  );
}