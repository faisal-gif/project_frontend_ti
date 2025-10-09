
'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, memo } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyAdopAd = () => {
  const pathname = usePathname();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  // useEffect sekarang seharusnya berjalan dengan benar
  useEffect(() => {
    if (inView) {
      try {
        // Ganti 'window.adop.refresh' dengan nama fungsi yang benar
        if (window.adop && typeof window.adop.refresh === 'function') {
          window.adop.refresh();
          console.log('Adop ad refreshed on path:', pathname);
        }
      } catch (e) {
        console.error('Error refreshing Adop ad:', e);
      }
    }
  }, [inView, pathname]);

  return (
    <div ref={ref} className="my-2 " style={{ minHeight: '270px' }}>
      {inView && (
        <div className="">
          <p className="font-light text-sm mb-1 text-center">Advertisement</p>
          <ins
            className="adsbyadop"
            _adop_zon="424c828c-767f-47c2-bf93-4bb10c62e94e"
            _adop_type="re"
            style={{ display: 'inline-block', width: '300px', height: '250px' }}
            _page_url={pathname}
          ></ins>
        </div>
      )}
        <Script
        src="https://compass.adop.cc/assets/js/adop/adopJ.js?v=14"
        strategy="afterInteractive" // Anda bisa tetap gunakan lazyOnload atau hapus strategy
        crossOrigin="anonymous"
      />
    </div>
  );
};

// BUNGKUS EKSPOR DENGAN 'memo' SEPERTI INI
export default memo(LazyAdopAd);