import Image from "next/image";
import { Shield, CheckCircle, X } from "lucide-react";
import Card from "@/components/ui/Card";

export default function CekFaktaCard({ isMinimized = false }) {
  return (
    <div className="w-full">
      <Card className="relative border shadow-lg overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <Image
          src="/bg_cekfakta.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          quality={40}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral/90 via-neutral/80 to-base-200/70" />

        {/* Content with relative positioning */}
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-neutral text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold text-sm">Cek Fakta</span>
            </div>
          </div>

          {/* Content */}

          <div className="p-4 space-y-3">
            <div className="text-sm text-white/90 mb-3">
              Verifikasi berita terbaru dari sumber terpercaya
            </div>

            {/* Fact Check Items */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-3">
                <div className="flex items-start gap-3">

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <div className="text-sm font-medium text-white">Benar</div>
                    </div>
                    <div className="text-xs text-white/80">
                      Vaksin COVID-19 aman dan efektif menurut WHO
                    </div>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=150&q=80"
                    alt="Vaksin"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-3">
                <div className="flex items-start gap-3">

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <div className="text-sm font-medium text-white">Hoaks</div>
                    </div>
                    <div className="text-xs text-white/80">
                      Klaim air lemon dapat menyembuhkan kanker
                    </div>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&q=80"
                    alt="Hoaks"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-3">
                <div className="flex items-start gap-3">

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0" />
                      <div className="text-sm font-medium text-white">Misleading</div>
                    </div>
                    <div className="text-xs text-white/80">
                      Data statistik ekonomi perlu konteks lebih lengkap
                    </div>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80"
                    alt="Misleading"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-4 px-4 py-2 bg-white text-neutral text-sm font-medium rounded-md hover:bg-white/90 transition-colors">
              Lihat Semua Cek Fakta
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
