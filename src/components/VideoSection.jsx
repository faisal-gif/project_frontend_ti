'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Play, Clock, Eye, MessageCircle, Heart, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import Button from './ui/Button';
import Carousel from './ui/Carousel';

function VideoSection() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [api, setApi] = useState(null);
    const autoplayRef = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    );


    const videosData = [
        {
            id: '1',
            title: "World's Most Peaceful 4K Video HDR 120FPS Dolby Vision - Relaxing Music for Stress Relief",
            thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
            duration: "2:30:45",
            timeAgo: "6 days ago",
            views: "2.1M",
            comments: "15K",
            likes: "89K",
            author: "4K HDR Ultra",
            isMain: true
        },
        {
            id: '2',
            title: "Best Dolby Vision 4K HDR Video ULTRA HD 120fps - Nature Sounds",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
            duration: "1:45:20",
            timeAgo: "3 days ago",
            views: "1.8M",
            comments: "12K",
            likes: "67K",
            author: "Nature 4K"
        },
        {
            id: '3',
            title: "The Best of The Best Dolby Vision 4K Video HDR 60FPS - Wildlife Documentary",
            thumbnail: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=250&fit=crop",
            duration: "3:15:10",
            timeAgo: "1 week ago",
            views: "3.2M",
            comments: "18K",
            likes: "95K",
            author: "Wildlife HD"
        },
        {
            id: '4',
            title: "JAW-DROPPING 4K HDR Video 60fps Dolby Vision - Ocean Life",
            thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
            duration: "2:05:30",
            timeAgo: "5 days ago",
            views: "1.5M",
            comments: "9K",
            likes: "54K",
            author: "Ocean 4K"
        },
        {
            id: '5',
            title: "World's Most Peaceful 4K Video HDR 120FPS Dolby Vision - Mountain Views",
            thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
            duration: "1:30:45",
            timeAgo: "2 weeks ago",
            views: "2.8M",
            comments: "14K",
            likes: "78K",
            author: "Mountain 4K"
        }
    ];

    const mainVideo = videosData[currentVideoIndex];

    useEffect(() => {
        if (!api) return;
        api.on("select", () => {
            setCurrentVideoIndex(api.selectedScrollSnap());
        });
    }, [api]);

    const handlePrev = () => {
        api?.scrollPrev();
    };

    const handleNext = () => {
        api?.scrollNext();
    };

    const handleVideoSelect = (videoIndex) => {
        api?.scrollTo(videoIndex);
    };

    const toggleAutoplay = () => {
        if (isAutoPlaying) {
            autoplayRef.current.stop();
        } else {
            autoplayRef.current.play();
        }
        setIsAutoPlaying(!isAutoPlaying);
    };


    return (
        <section className="w-full bg-neutral text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-foreground">LATEST NEWS VIDEOS</h2>
                    
                    </div>
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                        READ ALL
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Main Video Player */}
                <div className="hidden lg:block relative bg-black rounded-lg overflow-hidden mb-6">
                    <img src={mainVideo.thumbnail} alt={mainVideo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 group">
                            <Play className="w-8 h-8 text-black ml-1 group-hover:scale-110 transition-transform" fill="black" />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold mb-3 line-clamp-2">{mainVideo.title}</h3>
                        <div className="flex items-center gap-4 text-white/90 text-sm">
                            <div className="flex items-center gap-2">
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${mainVideo.author}`}
                                    alt={mainVideo.author}
                                    className="w-7 h-7 rounded-full border-2 border-white/30"
                                />
                                <span className="font-medium">{mainVideo.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{mainVideo.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{mainVideo.views}</span>
                                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{mainVideo.comments}</span>
                                <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{mainVideo.likes}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {mainVideo.duration}
                    </div>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Carousel
                        setApi={setApi}
                        plugins={[autoplayRef.current]}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <Carousel.Content className="-ml-2 md:-ml-4">
                            {videosData.map((video, index) => (
                                <Carousel.Item key={video.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4">
                                    <div
                                        onClick={() => handleVideoSelect(index)}
                                        className={`cursor-pointer transition-all duration-300 ${index === currentVideoIndex ? 'scale-105' : 'hover:scale-105'}`}
                                    >
                                        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                                    <Play className="w-4 h-4 text-black ml-0.5" fill="black" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                                                {video.duration}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">{video.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{video.author}</span>
                                                <span>•</span>
                                                <span>{video.timeAgo}</span>
                                                <span>•</span>
                                                <span>{video.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel.Content>
                    </Carousel>
                </div>

                {/* Thumbnail Navigation */}
                <div className="hidden lg:flex justify-center gap-2 mt-6">
                    {videosData.map((video, index) => (
                        <button
                            key={index}
                            onClick={() => handleVideoSelect(index)}
                            className={`group relative transition-all duration-300 ${index === currentVideoIndex ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'}`}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className={`w-16 h-10 object-cover rounded transition-all duration-300 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                            />
                            {index === currentVideoIndex && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                        <Play className="w-2 h-2 text-black ml-0.5" fill="black" />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VideoSection