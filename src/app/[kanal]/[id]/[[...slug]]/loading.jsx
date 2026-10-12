// Suspense boundary: tampil instan saat navigasi ke detail berita, sementara
// server memfetch data. Menghilangkan "freeze" pindah halaman dari home.
export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-18 animate-pulse">
      <div className="h-4 w-40 bg-base-300 rounded mb-6" />
      <div className="h-8 md:h-10 w-full bg-base-300 rounded mb-3" />
      <div className="h-8 md:h-10 w-3/4 bg-base-300 rounded mb-6" />
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-full bg-base-300" />
        <div className="h-4 w-32 bg-base-300 rounded" />
      </div>
      <div className="aspect-[16/9] w-full bg-base-300 rounded-lg mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 bg-base-300 rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </main>
  );
}
