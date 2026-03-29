import React from 'react';
import Home from './Home';
import {
  getCekFaktaNewsServer,
  getNewsFirstSectionsServer,
  getNewsSecondSectionsServer,
  getWansusNewsServer
} from '@/lib/data';
import { getAllNewsServer } from '@/lib/api/newsApi';
import { getViewAds, getViewAdsList } from '@/lib/api/adsApi';

export const metadata = {
  title: "TIMES Indonesia - Berita Positif Terbaru dan Terkini",
  description: "Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
  keywords: "times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
  openGraph: {
    locale: 'id_ID',
    title: "TIMES Indonesia - Berita Positif Terbaru dan Terkini",
    description: "Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
    keywords: "times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
    type: "website",
    url: 'https://timesindonesia.co.id/',
    siteName: 'TIMES Indonesia',
    images: [
      {
        url: `${process.env.API_URL}\\icon.png`,
        width: 500,
        height: 500,
        alt: "TIMES Indonesia Logo",
      },
    ],
  },
};

export default async function Page() { // Biasakan menggunakan huruf kapital untuk Server Component utama

  // =====================================================================
  // 1. INISIALISASI SEMUA PROMISE (API CALL BERJALAN BERSAMAAN)
  // =====================================================================
  const firstSectionsPromise = getNewsFirstSectionsServer();
  const secondSectionsPromise = getNewsSecondSectionsServer();
  const wansusPromise = getWansusNewsServer();
  const allNewsPromise = getAllNewsServer({ news_type: "all", offset: 0, limit: 4 });
  const headlineNewsPromise = getAllNewsServer({ news_type: "headline", offset: 0, limit: 10 });
  const cekFaktaNewsPromise = getCekFaktaNewsServer();

  const adsPremiumPromise = getViewAds({ id: 1 });
  const adsPremiumMobilePromise = getViewAds({ id: 43 });
  const adsLeaderboard1Promise = getViewAds({ id: 3 });
  const adsLeaderboard2Promise = getViewAds({ id: 7 });
  const adsRectangle1Promise = getViewAds({ id: 4 });
  const adsRectangle2Promise = getViewAds({ id: 5 });
  const adsRectangle3Promise = getViewAds({ id: 6 });
  const adsRectangle4Promise = getViewAds({ id: 93 });
  const adsRectangle5Promise = getViewAds({ id: 94 });
  const adsRectangle6Promise = getViewAds({ id: 95 });
  const adsRectangle7Promise = getViewAds({ id: 96 });
  const adsRectangle8Promise = getViewAds({ id: 97 });
  const adsRectangle9Promise = getViewAds({ id: 98 });
  const adsRectangle10Promise = getViewAds({ id: 99 });
  const adsListRectangle11Promise = getViewAdsList({ id: 100 });

  const adsRectangleLeaderboard1Promise = getViewAds({ id: 44 });
  const adsRectangleLeaderboard2Promise = getViewAds({ id: 47 });

  // =====================================================================
  // 2. TAHAN (AWAIT) HANYA UNTUK DATA "ABOVE THE FOLD"
  // FCP & LCP Lighthouse aman karena server tidak menunggu 20 API yang lain.
  // =====================================================================
  const [
    headlineNews,
    adsPremium,
    adsPremiumMobile
  ] = await Promise.all([
    headlineNewsPromise,
    adsPremiumPromise,
    adsPremiumMobilePromise
  ]);

  // =====================================================================
  // 3. OPER KE COMPONENT CLIENT ('Home')
  // Sebagian data sudah matang, sisanya masih berupa Promise.
  // =====================================================================
  return (
    <>
      <Home
        // --- DATA MATANG (Langsung render tanpa loading) ---
        initialHeadlineNews={headlineNews}
        initialAdsPremium={adsPremium}
        initialAdsPremiumMobile={adsPremiumMobile}

        // --- DATA PROMISE (Di-unwrap menggunakan use() dan Suspense di Home.jsx) ---
        newsFirstSectionsPromise={firstSectionsPromise}
        newsSecondSectionsPromise={secondSectionsPromise}
        wansusNewsPromise={wansusPromise}
        allNewsPromise={allNewsPromise}
        initialCekFaktaNewsPromise={cekFaktaNewsPromise}

        initialAdsLeaderboard1Promise={adsLeaderboard1Promise}
        initialAdsLeaderboard2Promise={adsLeaderboard2Promise}
        initialAdsRectangle1Promise={adsRectangle1Promise}
        initialAdsRectangle2Promise={adsRectangle2Promise}
        initialAdsRectangle3Promise={adsRectangle3Promise}
        initialAdsRectangle4Promise={adsRectangle4Promise}
        initialAdsRectangle5Promise={adsRectangle5Promise}
        initialAdsRectangle6Promise={adsRectangle6Promise}
        initialAdsRectangle7Promise={adsRectangle7Promise}
        initialAdsRectangle8Promise={adsRectangle8Promise}
        initialAdsRectangle9Promise={adsRectangle9Promise}
        initialAdsRectangle10Promise={adsRectangle10Promise}
        initialAdsListRectangle11Promise={adsListRectangle11Promise}
        initialAdsRectangleLeaderboard1Promise={adsRectangleLeaderboard1Promise}
        initialAdsRectangleLeaderboard2Promise={adsRectangleLeaderboard2Promise}
      />
    </>
  );
}