'use client'
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Kartu afiliasi generik (Shopee / Instagram / Tokopedia / TikTok / dll).
 * Data dari news_commerce. Tombol menyesuaikan platform dari domain link.
 * Memakai <img> biasa (bukan next/image) supaya:
 *  - tak perlu whitelist host tiap platform di next.config,
 *  - gambar (mis. Instagram, URL-nya kedaluwarsa) difetch langsung oleh browser,
 *    bukan diproksi optimizer kita yang bisa diblokir/expired.
 */
// Ambil nama domain dari URL sebagai fallback jika `platform` dari backend kosong.
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

export default function AffiliateCard({ image, title, description, url, platform, variant = 'inline' }) {
  const [imgOk, setImgOk] = useState(true);
  if (!url) return null;

  const { label, cls } = platformInfo(platform, url);

  // 'sidebar' = blok full-width di sidebar sticky (desktop).
  // 'inline'  = di badan artikel: HP blok, tablet float kanan; disembunyikan di
  //             desktop (lg+) karena versi sidebar yang tampil.
  const wrap =
    variant === 'sidebar'
      ? 'mb-4 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-md'
      : 'not-prose clear-both mb-4 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-md md:float-right md:mb-3 md:ml-5 md:w-64 lg:hidden';

  return (
    <aside className={wrap}>
      <a href={url} target="_blank" rel="sponsored nofollow noopener" className="group block">
        {image && imgOk && (
          <div className="relative aspect-square w-full bg-base-200">
            {/* img biasa + inline style: mengalahkan aturan global `.prose img`.
                referrerPolicy no-referrer membantu gambar hotlink (mis. Instagram) termuat. */}
            <img
              src={image}
              alt={title || 'Afiliasi'}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgOk(false)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {(platform.toLowerCase() == "shopee" || platform.toLowerCase() == "tokopedia") && (
              <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                Afiliasi
              </span>
            )}
          </div>
        )}

        <div className="p-3">
          {(!image || !imgOk) && (
            (platform.toLowerCase() == "shopee" || platform.toLowerCase() == "tokopedia") && (
              <span className="mb-1 inline-block rounded bg-base-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-base-content/60">
                Afiliasi
              </span>
            )
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
  );
}
