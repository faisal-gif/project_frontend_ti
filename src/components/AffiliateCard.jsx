import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

/**
 * Kartu produk afiliasi yang float di dalam badan artikel (teks membungkus).
 * Data dari news_commerce (product_image, product_title, product_description, affiliate_link).
 * Tombol "Beli" memakai affiliate_link ASLI agar komisi terlacak.
 */
export default function AffiliateCard({ image, title, description, url }) {
  if (!image || !url) return null;

  return (
    // not-prose: cegah gaya typography (prose) merusak kartu.
    // Mobile: block full-width. Desktop (md+): float kanan, teks membungkus.
    <aside className="not-prose clear-both mb-4 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-md md:float-right md:mb-3 md:ml-5 md:w-64">
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="group block"
      >
        <div className="relative aspect-square w-full bg-base-200">
          <Image
            src={image}
            alt={title || 'Produk afiliasi'}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-cover"
          />
          <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
            Afiliasi
          </span>
        </div>

        <div className="p-3">
          <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-base-content transition-colors group-hover:text-[#ee4d2d]">
            {title}
          </h4>
          {description && (
            <p className="mt-1 line-clamp-2 text-xs text-base-content/60">{description}</p>
          )}
          <span className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#ee4d2d] px-3 py-2 text-xs font-bold text-white transition group-hover:brightness-95">
            <ShoppingBag className="h-4 w-4" />
            Beli di Shopee
          </span>
        </div>
      </a>
    </aside>
  );
}
