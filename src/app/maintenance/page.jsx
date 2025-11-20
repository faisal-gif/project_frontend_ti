export default function Maintenance() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">
            <h1 className="text-4xl font-bold mb-4">Maintenance Mode</h1>
            <p className="text-lg">Website sedang dalam perbaikan. Silakan kembali nanti.</p>

            <a
                href="/"
                className="btn btn-primary rounded-2xl mt-8"
            >
                Kembali ke Beranda
            </a>
        </div>
    );
}
