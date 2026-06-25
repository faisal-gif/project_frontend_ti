'use client'; // Wajib dideklarasikan sebagai Client Component

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke service monitoring seperti Sentry atau tampilkan di console
    console.error("Terjadi error di sisi klien:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Waduh, terjadi kesalahan!</h2>
      <p className="text-gray-600 mb-6">Maaf, kami mengalami masalah saat memuat halaman ini di browser Anda.</p>
      <button
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        onClick={
          // Fungsi reset() akan mencoba me-render ulang komponen yang error
          () => reset()
        }
      >
        Coba Muat Ulang
      </button>
    </div>
  );
}