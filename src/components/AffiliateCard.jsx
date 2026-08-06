'use client'
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X } from 'lucide-react';

/**
 * Kartu afiliasi generik (Shopee / Instagram / Tokopedia / TikTok / dll).
 * - Kartu utama: float di badan artikel (teks membungkus).
 * - Saat kartu utama tergulung ke atas layar → muncul mini-card `fixed`
 *   di atas tombol scroll (bisa ditutup).
 * Memakai <img> biasa supaya tak perlu whitelist host tiap platform & gambar
 * (mis. Instagram yang URL-nya kedaluwarsa) difetch langsung oleh browser.
 */
function domainName(url = '') {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '').replace(/^s\./, '');
    const base = host.split('.')[0];
    return base ? base.charAt(0).toUpperCase() + base.slice(1) : '';
  } catch {
    return '';
  }
}

// `platform` dari backend adalah sumber kebenaran; fallback ke domain URL.
function platformInfo(platform, url = '') {
  const name = (platform || domainName(url) || '').trim();
  const key = name.toLowerCase();
  if (key.includes('shopee')) return { label: 'Beli di Shopee', cls: 'bg-[#ee4d2d]' };
  if (key.includes('tokopedia')) return { label: 'Beli di Tokopedia', cls: 'bg-[#03ac0e]' };
  if (key.includes('lazada')) return { label: 'Beli di Lazada', cls: 'bg-[#0f146d]' };
  if (key.includes('tiktok')) return { label: 'Lihat di TikTok', cls: 'bg-black' };
  if (key.includes('instagram'))
    return { label: 'Lihat di Instagram', cls: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]' };
  if (name) return { label: `Kunjungi ${name}`, cls: 'bg-[#C31815]' };
  return { label: 'Kunjungi', cls: 'bg-[#C31815]' };
}

export default function AffiliateCard({ image, title, description, url, platform }) {
  const [imgOk, setImgOk] = useState(true);
  const [floatImgOk, setFloatImgOk] = useState(true);
  const [showFloat, setShowFloat] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [slot, setSlot] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    // Slot di dalam BackToTop tempat mini-card diportal (biar urut & tak tabrakan).
    setSlot(document.getElementById('affiliate-float-slot'));
    const el = ref.current;
    if (!el) return;
    // Tampilkan mini-card hanya jika kartu utama sudah tergulung ke ATAS layar.
    const obs = new IntersectionObserver(
      ([e]) => setShowFloat(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!url) return null;

  const { label, cls } = platformInfo(platform, url);
  const showBadge = ['shopee', 'tokopedia'].includes((platform || '').toLowerCase());

  return (
    <>
      {/* === KARTU UTAMA (float di konten) === */}
      <aside
        ref={ref}
        className="not-prose clear-both mb-4 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-md md:float-right md:mb-3 md:ml-5 md:w-64"
      >
        <a href={url} target="_blank" rel="sponsored nofollow noopener" className="group block">
          {image && imgOk && (
            <div className="relative aspect-square w-full bg-base-200">
              <img
                src={image}
                alt={title || 'Afiliasi'}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setImgOk(false)}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {showBadge && (
                <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                  Afiliasi
                </span>
              )}
            </div>
          )}

          <div className="p-3">
            {(!image || !imgOk) && showBadge && (
              <span className="mb-1 inline-block rounded bg-base-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-base-content/60">
                Afiliasi
              </span>
            )}
            {title && (
              <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-base-content transition-colors group-hover:text-[#C31815]">
                {title}
              </h4>
            )}
            {description && (
              <p className="mt-1 line-clamp-2 text-xs text-base-content/60">{description}</p>
            )}
            <span className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition group-hover:brightness-95 ${cls}`}>
              <ExternalLink className="h-4 w-4" />
              {label}
            </span>
          </div>
        </a>
      </aside>

      {/* === MINI-CARD — diportal ke stack BackToTop (urut: scroll button, ini, WhatsApp) === */}
      {showFloat && !dismissed && slot &&
        createPortal(
          <div className="not-prose relative w-64 max-w-[85vw] overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-xl ring-1 ring-black/5 animate-[affiliateFloatIn_0.25s_ease-out]">
            {/* Tombol tutup (di luar <a> agar tak jadi interaktif bertingkat) */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Tutup"
              className="absolute right-1.5 top-1.5 z-10 rounded-full bg-base-100/80 p-0.5 text-base-content/50 shadow-sm backdrop-blur transition hover:text-base-content"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <a href={url} target="_blank" rel="sponsored nofollow noopener" className="group block">
              <div className="flex items-center gap-2.5 p-2.5">
                {image && floatImgOk && (
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFloatImgOk(false)}
                    className="shrink-0 rounded-lg ring-1 ring-base-300"
                    style={{ height: '4.5rem', width: '4.5rem', objectFit: 'cover', margin: 0 }}
                  />
                )}
                <span className="min-w-0 flex-1 pr-4">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-base-content/40">
                    Rekomendasi
                  </span>
                  <span className="mt-0.5 block line-clamp-2 text-xs font-semibold leading-snug text-base-content transition-colors group-hover:text-[#C31815]">
                    {title || label}
                  </span>
                </span>
              </div>

              {/* CTA berwarna platform, full-width */}
              <span className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white transition group-hover:brightness-95 ${cls}`}>
                <ExternalLink className="h-4 w-4" />
                {label}
              </span>
            </a>
          </div>,
          slot
        )}
    </>
  );
}
