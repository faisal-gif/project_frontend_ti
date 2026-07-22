'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ANIM_MS = 220;

/**
 * Lightbox fullscreen tanpa library, dengan animasi buka/tutup dan
 * transisi antar foto.
 *
 * Props:
 * - open          : boolean
 * - index         : index foto aktif
 * - slides        : array foto [{ gi_image, gi_caption, gi_id }]
 * - onClose       : () => void
 * - onIndexChange : (nextIndex) => void
 */
export default function PhotoLightbox({ open, index, slides = [], onClose, onIndexChange }) {
    // mounted: komponen masih ada di DOM (termasuk selama animasi keluar)
    const [mounted, setMounted] = useState(false);
    // entered: kelas "masuk" sudah dipasang -> memicu transisi
    const [entered, setEntered] = useState(false);
    // arah geser saat ganti foto: 1 = ke kanan, -1 = ke kiri
    const [direction, setDirection] = useState(0);
    const [imageKey, setImageKey] = useState(0);

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const closeTimer = useRef(null);

    const total = slides.length;
    const current = slides[index];

    /* ---------- buka / tutup ---------- */

    useEffect(() => {
        if (open) {
            clearTimeout(closeTimer.current);
            setMounted(true);
            // Tunggu satu frame supaya transisi dari state awal benar-benar terjadi
            const raf = requestAnimationFrame(() => setEntered(true));
            return () => cancelAnimationFrame(raf);
        }

        if (mounted) {
            setEntered(false);
            closeTimer.current = setTimeout(() => setMounted(false), ANIM_MS);
        }
    }, [open, mounted]);

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    /* ---------- navigasi ---------- */

    const goTo = useCallback(
        (next, dir) => {
            if (next < 0 || next > total - 1) return;
            setDirection(dir);
            setImageKey((k) => k + 1);
            onIndexChange(next);
        },
        [total, onIndexChange]
    );

    const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
    const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

    /* ---------- keyboard ---------- */

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowLeft') goPrev();
            else if (e.key === 'ArrowRight') goNext();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose, goPrev, goNext]);

    /* ---------- kunci scroll ---------- */

    useEffect(() => {
        if (!mounted) return;

        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [mounted]);

    /* ---------- swipe ---------- */

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;

        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;

        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) goPrev();
            else goNext();
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (!mounted || !current) return null;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto"
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`fixed inset-0 z-[999] flex flex-col bg-black/95 transition-opacity duration-200 ease-out ${
                entered ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Bar atas */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center justify-between px-4 py-3 text-white transition-all duration-200 ease-out ${
                    entered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
            >
                <span className="text-sm text-white/70">
                    {index + 1} / {total}
                </span>
                <button
                    onClick={onClose}
                    aria-label="Tutup"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 active:scale-95"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Area foto */}
            <div className="relative flex flex-1 items-center justify-center px-4 pb-2">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`relative h-full w-full max-w-6xl transition-all ease-out ${
                        entered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                    style={{ transitionDuration: `${ANIM_MS}ms` }}
                >
                    <PhotoFrame
                        key={imageKey}
                        src={current.gi_image}
                        alt={current.gi_caption || `Foto ${index + 1}`}
                        direction={direction}
                    />
                </div>

                {total > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            disabled={index === 0}
                            aria-label="Foto sebelumnya"
                            className={`absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 ease-out hover:bg-white/20 active:scale-95 disabled:pointer-events-none disabled:opacity-25 md:left-6 ${
                                entered ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            disabled={index === total - 1}
                            aria-label="Foto berikutnya"
                            className={`absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 ease-out hover:bg-white/20 active:scale-95 disabled:pointer-events-none disabled:opacity-25 md:right-6 ${
                                entered ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <ChevronRight size={22} />
                        </button>
                    </>
                )}
            </div>

            {/* Caption */}
            {current.gi_caption && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`px-6 pb-6 pt-2 transition-all duration-200 ease-out ${
                        entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                >
                    <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-white/70">
                        {current.gi_caption}
                    </p>
                </div>
            )}
        </div>,
        document.body
    );
}

/**
 * Satu bingkai foto. Di-remount tiap ganti foto (lewat key) sehingga
 * animasi masuknya berjalan ulang, arah geser mengikuti navigasi.
 */
function PhotoFrame({ src, alt, direction }) {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    const offset = direction === 0 ? '0px' : direction > 0 ? '24px' : '-24px';

    return (
        <div
            className="absolute inset-0 transition-all duration-300 ease-out"
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'translateX(0)' : `translateX(${offset})`,
            }}
        >
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-contain" />
        </div>
    );
}