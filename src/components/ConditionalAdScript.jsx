'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const DISABLED_AD_PATHS = [
    '/glutera-news/374306/7-posisi-hubungan-suami-istri-favorit-pria',
    '/glutera-news/373806/12-bagian-sensitif-tubuh-wanita-yang-mudah-terangsang',
    '/gaya-hidup/475149/mengeksplorasi-gspot-aspot-dan-cspot-kunci-rahasia-orgasme',
    '/glutera-news/374546/8-posisi-berhubungan-suami-istri-favorit-wanita-pria-harus-tahu',
    '/glutera-news/432953/5-cara-ampuh-membuat-wanita-orgasme-berkalikali',
    '/glutera-news/394036/7-tanda-wanita-mencapai-kenikmatan',
    '/cek-fakta/500746/cek-fakta-hoaks-video-mayat-tergantung-di-jembatan-layang-kotalama-malang',
    '/glutera-news/374548/4-tips-nyaman-saat-hubungan-suami-istri-tanpa-rasa-nyeri',
    '/glutera-news/380365/6-gerakan-fitnes-yang-bikin-pria-makin-perkasa-di-ranjang',
    '/glutera-news/145748/heboh-glutera-sexy-award-2017-54-wanita-cantik-adu-bodi',
    '/peristiwa/104960/waduh--praktik-prostitusi-ternyata-masih-ada-di-malang',
    '/glutera-news/210144/buah-jeruk-dan-wanita-setengah-baya',
    '/glutera-news/226244/tips-tidak-cepat-kehabisan-napas-saat-berhubungan-intim',
    '/glutera-news/365758/7-faktor-yang-bikin-orgasme-hebat',
    '/gaya-hidup/246607/haji-iin-sang-kolektor-pipa-cangklong-dari-Yogyakarta',
    '/pendidikan/377041/inspiratif-pemuda-kampung-di-pangandaran-berhasil-dirikan-taman-bacaan-masyarakat',
    '/glutera-news/374373/16-katakata-nakal-yang-bisa-diucapkan-saat-bercinta',
    '/glutera-news/373635/6-hal-yang-disukai-pria-dari-wanita-saat-berhubungan-seksual',
    '/gaya-hidup/398043/doa-serta-adab-berhubungan-suami-istri-dalam-kitab-qurrotul-uyun-dan-fathul-izar',
    '/peristiwa/117515/jiad-kalau-bersih-mui-tak-usah-takut-diaudit',
    '/politik/486020/gawagus-muda-jombang-haramkan-pilih-pemimpin-cacat-etik-dan-moral',
    '/glutera-news/373804/8-bagian-tubuh-pria-yang-mudah-terangsang',
    '/glutera-news/432578/6-tips-istri-memuaskan-suami-di-ranjang'
];

export default function ConditionalAdScript() {
    const pathname = usePathname();

    // Cek apakah URL saat ini dimulai dengan salah satu path yang dilarang
    const isDisabled = DISABLED_AD_PATHS.some(prefix =>
        pathname.startsWith(prefix)
    );

    // Jika ya (ini halaman berita/penulis/dll), jangan render script (return null)
    if (isDisabled) {
        return null;
    }

    // Jika tidak (ini halaman homepage, dll), baru render script iklannya
    return (
        <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5117046027656864"
            crossOrigin="anonymous"
        />
    );
}