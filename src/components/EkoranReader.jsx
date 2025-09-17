"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Button from "./ui/Button";

export default function EkoranReader({ ekoranArticle }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [progress, setProgress] = useState(0);
    const autoProgressRef = useRef(null);
    const touchStartX = useRef(null);
    const [scale, setScale] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const lastPageChange = useRef(Date.now());
    const [showDescription, setShowDescription] = useState(false);


    // ====================
    // Auto Progress
    // ====================
    useEffect(() => {
        if (scale > 1) {
            clearInterval(autoProgressRef.current);
            return;
        }

        clearInterval(autoProgressRef.current);
        setProgress(0);

        autoProgressRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    goToNextPage();
                    return 0;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(autoProgressRef.current);
    }, [scale]);

    // ====================
    // Navigasi Halaman
    // ====================
    const goToNextPage = () => {
        const now = Date.now();
        if (now - lastPageChange.current < 300) return;
        lastPageChange.current = now;

        setIsLoading(true);
        setCurrentPage((prev) =>
            prev < ekoranArticle.pages ? prev + 1 : 1
        );
    };

    const goToPrevPage = () => {
        const now = Date.now();
        if (now - lastPageChange.current < 300) return;
        lastPageChange.current = now;

        setIsLoading(true);
        setCurrentPage((prev) =>
            prev > 1 ? prev - 1 : ekoranArticle.pages
        );
    };

    // ====================
    // Swipe (mobile)
    // ====================
    const handleTouchStart = (e) => {
        if (scale > 1) return;
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (scale > 1 || touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;

        if (dx > 80) goToPrevPage();
        if (dx < -80) goToNextPage();

        touchStartX.current = null;
    };

    return (
        <div className="relative max-w-sm w-full mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 flex gap-1 p-2 z-20">
                {Array.from({ length: ekoranArticle.pages }).map((_, i) => (
                    <div
                        key={i}
                        className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                    >
                        <div
                            className="h-full bg-white transition-all duration-100"
                            style={{
                                width:
                                    i + 1 < currentPage
                                        ? "100%"
                                        : i + 1 === currentPage
                                            ? `${progress}%`
                                            : "0%",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Page Content */}
            <div
                className="aspect-auto overflow-hidden bg-black h-[500px] relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={5}
                    doubleClick={{ mode: "toggle" }}
                    wheel={{ step: 0.2 }}
                    pinch={{ step: 5 }}
                    panning={{ disabled: scale === 1 }}
                    onTransformed={(ref) => setScale(ref.state.scale)}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <TransformComponent>
                                <div className="relative w-full h-[500px] bg-black flex items-center justify-center">
                                    {isLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                                        </div>
                                    )}

                                    <Image
                                        src={
                                            ekoranArticle.image[
                                            (currentPage - 1) % ekoranArticle.image.length
                                            ]
                                        }
                                        alt={`${ekoranArticle.title} - Halaman ${currentPage}`}
                                        width={800}
                                        height={1200}
                                        sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                                        className="object-contain select-none"
                                        priority
                                        draggable={false}
                                        onLoadingComplete={() => setIsLoading(false)}
                                    />
                                  
                                </div>
                            </TransformComponent>

                            {/* Zoom Controls */}
                            <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => zoomIn()}
                                    className="text-white hover:bg-white/20 bg-black/30"
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => zoomOut()}
                                    className="text-white hover:bg-white/20 bg-black/30"
                                >
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => resetTransform()}
                                    className="text-white hover:bg-white/20 bg-black/30"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </TransformWrapper>
            </div>


  {/* Tombol baca deskripsi */}
                                    {!showDescription && (
                                        <button
                                            onClick={() => setShowDescription(true)}
                                            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs hover:bg-black/90 transition"
                                        >
                                            Baca Deskripsi
                                        </button>
                                    )}

                                    {/* Overlay deskripsi */}
                                    {showDescription && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
                                            <p className="text-sm md:text-base leading-relaxed">
                                                Merupakan Ekoran pertama di Indonesia berbasis media sosial. Isi Ekoran ini merupakan bagian tak terpisahkan dari TIMES Indonesia, Berita Positif Terbaru dan Terkini.
                                                Ekoran ini terbit setiap hari dan disebarkan melalui media sosial secara langsung.
                                            </p>
                                            <button
                                                onClick={() => setShowDescription(false)}
                                                className="mt-2 text-xs underline text-gray-300 hover:text-white"
                                            >
                                                Tutup
                                            </button>
                                        </div>
                                    )}



            {/* Tombol Navigasi (Desktop) */}
            <button
                onClick={goToPrevPage}
                className="hidden md:block absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                <ChevronLeft size={28} />
            </button>
            <button
                onClick={goToNextPage}
                className="hidden md:block absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                <ChevronRight size={28} />
            </button>

            {/* Page Number Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                    Halaman {currentPage} dari {ekoranArticle.pages}
                </div>
            </div>
        </div>
    );
}
