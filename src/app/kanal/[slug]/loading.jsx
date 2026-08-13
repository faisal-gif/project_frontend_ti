// Suspense boundary: skeleton instan saat buka detail kanal, sementara server
// memfetch cat_detail + berita.
export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-18 animate-pulse">
      <div className="h-4 w-40 bg-base-300 rounded mb-6" />
      <div className="bg-base-300/60 rounded-lg h-40 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <div className="aspect-[16/9] w-full bg-base-300" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-full bg-base-300 rounded" />
              <div className="h-4 w-2/3 bg-base-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
