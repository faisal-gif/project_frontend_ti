export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-10">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Halaman yang kamu cari tidak ditemukan.</p>

      <a
        href="/"
        className="btn btn-primary"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
