import React from 'react';
import Script from 'next/script';
import { useInView } from 'react-intersection-observer';

const LazyAdopAd = () => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref} className="my-2 mx-auto" style={{ minHeight: '270px' }}> {/* Beri tinggi minimum agar observer bekerja */}
      {/* Hanya render iklan dan skrip JIKA inView adalah true */}
      {inView && (
        <>
          <p className="font-light text-sm text-center mb-1">Advertisement</p>
          <ins
            className="adsbyadop"
            _adop_zon="424c828c-767f-47c2-bf93-4bb10c62e94e"
            _adop_type="re"
            style={{ display: 'inline-block', width: '300px', height: '250px' }}
            _page_url=""
          ></ins>
          <Script
            src="https://compass.adop.cc/assets/js/adop/adopJ.js?v=14"
            strategy="lazyOnload" // Anda bisa tetap gunakan lazyOnload atau hapus strategy
            crossOrigin="anonymous"
          />
        </>
      )}
    </div>
  );
};

export default LazyAdopAd;