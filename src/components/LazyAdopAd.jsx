import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyAdopAd = () => {
 const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true, // Hanya trigger sekali saat pertama kali terlihat
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    // Effect ini akan berjalan setiap kali URL berubah ATAU saat iklan masuk ke viewport
    // Kita hanya menjalankan refresh jika slot iklan sudah terlihat (inView)
    if (inView) {
      try {
        // Cek apakah fungsi refresh dari Adop sudah siap
        if (window.adop && typeof window.adop.refresh === 'function') {
          window.adop.refresh();
          console.log('Adop ad refreshed on path:', router.asPath);
        }
      } catch (e) {
        console.error('Error refreshing Adop ad:', e);
      }
    }
  }, [inView, router.asPath]); // Dependensi: inView dan perubahan URL

  return (
    <div ref={ref} className="my-2 mx-auto" style={{ minHeight: '270px' }}>
      {/* Hanya render slot iklan <ins> jika sudah masuk viewport */}
      {inView && (
        <>
          <p className="font-light text-sm mb-1">Advertisement</p>
          <ins
            className="adsbyadop"
            _adop_zon="424c828c-767f-47c2-bf93-4bb10c62e94e"
            _adop_type="re"
            style={{ display: 'inline-block', width: '300px', height: '250px' }}
            _page_url={router.asPath} // Bisa ditambahkan untuk mengirim URL saat ini
          ></ins>
        </>
      )}
    </div>
  );
};

export default LazyAdopAd;