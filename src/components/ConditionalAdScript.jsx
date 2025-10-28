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