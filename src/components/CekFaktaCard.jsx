import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function CekFaktaCard({ CekFaktaNews }) {
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
          <div className="flex items-center gap-3 p-6">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Cek Fakta</h3>
              <p className="text-white/80 text-xs">Validasi apakah beritamu Hoax atau Fakta</p>
            </div>
          </div>

          {/* Content */}

          <div className="p-4 space-y-3">
            <div className="text-sm text-white/90 mb-3">
              Verifikasi berita terbaru dari sumber terpercaya
            </div>

            {/* Fact Check Items */}
            <div className="space-y-4">
              {/* Item 1 */}
              {CekFaktaNews.map((article, index) => (

                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-3">
                  <Link href={article.url_ci4} >
                    <div className="flex items-start gap-3">

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {/* <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <div className="text-sm font-medium text-white">Benar</div> */}
                        </div>
                        <div className="text-xs text-white/80">
                          {article.news_title}
                        </div>
                      </div>
                      <Image
                        src={article.news_image_new}
                        alt={article.news_title}
                        width={64}
                        height={64}
                        loading="lazy"
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                    </div>
                  </Link>
                </div>

              ))}


            </div>

            {/* Action Button */}
            <Link href={'/fokus/221/fakta-atau-hoaks'} className="w-full mt-4 px-4 py-2 btn bg-white text-neutral text-sm font-medium rounded-md hover:bg-white/90 transition-colors">
              Lihat Semua Cek Fakta
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
