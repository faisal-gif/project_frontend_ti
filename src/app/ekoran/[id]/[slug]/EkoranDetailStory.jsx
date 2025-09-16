'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    ArrowLeft,
    ArrowRight,
    Download,
    Share2,
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCcw
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useParams, useRouter } from 'next/navigation';
import { getDetailEkoran } from '@/lib/api/ekoran';

function EkoranDetailStory() {
    const params = useParams();
    const { id } = params;
    const navigate = useRouter();

    // State for story-like navigation
    const [currentPage, setCurrentPage] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [touchEndY, setTouchEndY] = useState(null);
    const storyRef = useRef(null);

    // Zoom and pan state
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lastPinchDistance, setLastPinchDistance] = useState(0);
    const [lastTap, setLastTap] = useState(0);
    const [showSwipeUpHint, setShowSwipeUpHint] = useState(true);
    const imageRef = useRef(null);
    // Mock data for the e-koran edition
    const [ekoranDetail, setEkoranDetail] = useState(null);
    // Auto-progress (optional - can be enabled for demo)
    const [isAutoProgressing, setIsAutoProgressing] = useState(true);
    const autoProgressInterval = useRef(null);


    useEffect(() => {
        getDetailEkoran(id).then(setEkoranDetail).catch(console.error);
    }, [id]);



    const ekoranArticle = ekoranDetail && {
        id: ekoranDetail.id,
        title: ekoranDetail.title,
        date: new Date(ekoranDetail.datepub).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        views: Number(ekoranDetail.views),
        image: [
            ekoranDetail.img1,
            ekoranDetail.img2,
            ekoranDetail.img3,
            ekoranDetail.img4,
            ekoranDetail.img5,
            ekoranDetail.img6,
            ekoranDetail.img7,
            ekoranDetail.img8,
            ekoranDetail.img9,
            ekoranDetail.img10,
            ekoranDetail.img11,
            ekoranDetail.img12,
            ekoranDetail.img13,
            ekoranDetail.img14,
            ekoranDetail.img15,
            ekoranDetail.img16,
            ekoranDetail.img17,
            ekoranDetail.img18,
            ekoranDetail.img19,
            ekoranDetail.img20,
            ekoranDetail.img21,
            ekoranDetail.img22,
            ekoranDetail.img23,
        ].filter(Boolean),
        pages: [
            ekoranDetail.img1,
            ekoranDetail.img2,
            ekoranDetail.img3,
            ekoranDetail.img4,
            ekoranDetail.img5,
            ekoranDetail.img6,
            ekoranDetail.img7,
            ekoranDetail.img8,
            ekoranDetail.img9,
            ekoranDetail.img10,
            ekoranDetail.img11,
            ekoranDetail.img12,
            ekoranDetail.img13,
            ekoranDetail.img14,
            ekoranDetail.img15,
            ekoranDetail.img16,
            ekoranDetail.img17,
            ekoranDetail.img18,
            ekoranDetail.img19,
            ekoranDetail.img20,
            ekoranDetail.img21,
            ekoranDetail.img22,
            ekoranDetail.img23,
        ].filter(Boolean).length,
        link: ekoranDetail.url_ci4,
    }


    // Touch handlers for swipe navigation and zoom
    const minSwipeDistance = 50;

    const getDistance = (touch1, touch2) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e) => {
        if (e.touches.length === 1) {
            setTouchEnd(null);
            setTouchEndY(null);
            setTouchStart(e.targetTouches[0].clientX);
            setTouchStartY(e.targetTouches[0].clientY);

            // Hide swipe up hint after first interaction
            if (showSwipeUpHint) {
                setTimeout(() => setShowSwipeUpHint(false), 3000);
            }

            // Double tap to zoom
            const now = Date.now();
            const DOUBLE_TAP_DELAY = 300;
            if (now - lastTap < DOUBLE_TAP_DELAY) {
                e.preventDefault();
                if (zoomLevel === 1) {
                    setZoomLevel(2);
                } else {
                    setZoomLevel(1);
                    setPanX(0);
                    setPanY(0);
                }
            }
            setLastTap(now);
        } else if (e.touches.length === 2) {
            // Pinch to zoom start
            const distance = getDistance(e.touches[0], e.touches[1]);
            setLastPinchDistance(distance);
            e.preventDefault();
        }
    };

    const onTouchMove = (e) => {
        if (e.touches.length === 1) {
            setTouchEnd(e.targetTouches[0].clientX);
            setTouchEndY(e.targetTouches[0].clientY);

            // Pan when zoomed
            if (zoomLevel > 1 && isDragging) {
                const touch = e.touches[0];
                const rect = imageRef.current?.getBoundingClientRect();
                if (rect) {
                    const newX = (touch.clientX - rect.left - rect.width / 2) * 0.5;
                    const newY = (touch.clientY - rect.top - rect.height / 2) * 0.5;
                    setPanX(newX);
                    setPanY(newY);
                }
                e.preventDefault();
            }
        } else if (e.touches.length === 2 && lastPinchDistance > 0) {
            // Pinch to zoom
            const distance = getDistance(e.touches[0], e.touches[1]);
            const ratio = distance / lastPinchDistance;
            const newZoom = Math.min(Math.max(zoomLevel * ratio, 0.5), 5);
            setZoomLevel(newZoom);
            setLastPinchDistance(distance);
            e.preventDefault();
        }
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !touchStartY || !touchEndY) return;

        const distanceX = touchStart - touchEnd;
        const distanceY = touchStartY - touchEndY;
        const minSwipeDistance = 50;

        // Only navigate if not zoomed and not dragging
        if (zoomLevel === 1 && !isDragging && Math.abs(distanceY) < minSwipeDistance) {
            const isLeftSwipe = distanceX > minSwipeDistance;
            const isRightSwipe = distanceX < -minSwipeDistance;

            if (isLeftSwipe && currentPage < ekoranArticle.pages) {
                setCurrentPage(prev => prev + 1);
            }
            if (isRightSwipe && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            }
        }

        setIsDragging(false);
        setLastPinchDistance(0);
    };

    // Navigation functions
    const handlePreviousPage = () => {
        if (zoomLevel === 1) {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }
    };

    const handleNextPage = () => {
        if (zoomLevel === 1) {
            setCurrentPage(prev => Math.min(prev + 1, ekoranArticle.pages));
        }
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 5));
    };

    const handleZoomOut = () => {
        const newZoom = Math.max(zoomLevel - 0.5, 0.5);
        setZoomLevel(newZoom);
        if (newZoom <= 1) {
            setPanX(0);
            setPanY(0);
        }
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setPanX(0);
        setPanY(0);
    };




    // Keyboard navigation
    const handleClose = () => {
        navigate.back();
    };

    useEffect(() => {
        if (!ekoranArticle) return;
        if (isAutoProgressing) {
            autoProgressInterval.current = setInterval(() => {
                setCurrentPage(prev => {
                    if (prev >= ekoranArticle.pages) {
                        setIsAutoProgressing(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 3000); // 3 seconds per page
        }

        return () => {
            if (autoProgressInterval.current) {
                clearInterval(autoProgressInterval.current);
            }
        };
    }, [isAutoProgressing, ekoranArticle]);


    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') {
                handlePreviousPage();
            } else if (e.key === 'ArrowRight') {
                handleNextPage();
            } else if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);


    if (!ekoranDetail) {
        return (
            <div className="flex items-center justify-center w-full h-screen text-white">
                Loading...
            </div>
        );
    }




    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            {/* Story Progress Bar */}
            <div className="absolute top-4 left-4 right-4 z-20">
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: ekoranArticle.pages }, (_, index) => (
                        <div
                            key={index}
                            className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
                        >
                            <div
                                className={`h-full bg-white transition-all duration-300 ${index < currentPage ? 'w-full' : index === currentPage - 1 ? 'w-full' : 'w-0'
                                    }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClose}
                            className="text-white hover:bg-white/20"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-semibold text-sm">{ekoranArticle.title}</h1>
                            <p className="text-xs text-white/70">{ekoranArticle.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                                // Handle share functionality
                                if (navigator.share) {
                                    navigator.share({
                                        title: ekoranArticle.title,
                                        text: ekoranArticle.date,
                                        url: window.location.href
                                    });
                                }
                            }}
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Story Content */}
            <div
                ref={storyRef}
                className="relative w-full h-full flex items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Navigation Areas - only active when not zoomed */}
                <button
                    className={`absolute left-0 top-0 w-1/3 h-full z-10 focus:outline-none ${zoomLevel > 1 ? 'pointer-events-none' : ''}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || zoomLevel > 1}
                />
                <button
                    className={`absolute right-0 top-0 w-1/3 h-full z-10 focus:outline-none ${zoomLevel > 1 ? 'pointer-events-none' : ''}`}
                    onClick={handleNextPage}
                    disabled={currentPage === ekoranArticle.pages || zoomLevel > 1}
                />

                {/* Zoom Controls */}
                {zoomLevel > 1 && (
                    <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleZoomIn}
                            className="text-white hover:bg-white/20 bg-black/30"
                        >
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleZoomOut}
                            className="text-white hover:bg-white/20 bg-black/30"
                        >
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={resetZoom}
                            className="text-white hover:bg-white/20 bg-black/30"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Story Card */}
                <div className="relative max-w-sm w-full mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl">
                    {/* Page Content */}
                    <div className="aspect-auto relative overflow-hidden bg-black">
                        <img
                            ref={imageRef}
                            src={ekoranArticle.image[(currentPage - 1) % ekoranArticle.image.length]}
                            alt={`${ekoranArticle.title} - Halaman ${currentPage}`}
                            className="w-full h-full object-contain transition-transform duration-200"
                            style={{
                                transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`,
                                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                            }}
                            onMouseDown={(e) => {
                                if (zoomLevel > 1) {
                                    setIsDragging(true);
                                    e.preventDefault();
                                }
                            }}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={() => setIsDragging(false)}
                            onMouseMove={(e) => {
                                if (isDragging && zoomLevel > 1) {
                                    const rect = imageRef.current?.getBoundingClientRect();
                                    if (rect) {
                                        const newX = (e.clientX - rect.left - rect.width / 2) * 0.5;
                                        const newY = (e.clientY - rect.top - rect.height / 2) * 0.5;
                                        setPanX(newX);
                                        setPanY(newY);
                                    }
                                }
                            }}
                        />

                        {/* Zoom Indicator */}
                        {zoomLevel > 1 && (
                            <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                {Math.round(zoomLevel * 100)}%
                            </div>
                        )}

                        {/* Page Number Overlay */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                                Halaman {currentPage} dari {ekoranArticle.pages}
                            </div>
                        </div>

                        {/* Zoom Instructions */}
                        {zoomLevel === 1 && (
                            <div className="absolute top-4 right-4 text-white/70 text-xs bg-black/30 px-2 py-1 rounded">
                                Ketuk 2x untuk zoom
                            </div>
                        )}
                    </div>


                </div>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:block">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextPage}
                        disabled={currentPage === ekoranArticle.pages}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30"
                    >
                        <ArrowRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default EkoranDetailStory