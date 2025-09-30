"use client";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Carousel from "./ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { getAllYoutubeVideos } from "@/lib/api/youtubeApi";
import VideoCard from "./VideoCard";

import VideoCardSkeleton from "./ui/VideoCardSkeleton";


function VideoSection() {

  const [ytVideo, setytVideo] = useState([]);

  useEffect(() => {
    getAllYoutubeVideos().then(setytVideo).catch(console.error);
  }, []);

  return (
    <section className="w-full text-white py-8  relative overflow-hidden">
      {/* Background pakai Next/Image */}
      <Image
        src="/video_bg.webp" // bisa juga pakai article.img1 kalau dinamis
        alt="Background video"
        fill
        priority="high"
        loading='lazy'
        className="object-cover object-center -z-10" // taruh di belakang konten
      />

      {/* Overlay gelap biar teks terbaca */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h3 className="text-2xl font-bold text-foreground">Ekoran</h3> */}
            <Link href={'https://www.youtube.com/@timesIDN'} className="text-2xl font-bold text-foreground hover:text-[#b41d1d] flex items-center gap-2">
              <Image
                src="/logo_times_tv.png"
                alt="Video Logo"
                width={120}
                height={40}
                priority="high"
                loading='lazy'
                className="object-contain h-auto w-[120px]"
              />
            </Link>
          </div>

        </div>


        {/* Mobile (Carousel swipe) */}
        <Carousel opts={{ align: "start", loop: true, }} className="w-full" plugins={[Autoplay()]}>
          <Carousel.Content className="-ml-4">

            {
              ytVideo.length === 0 && (
                [1, 2, 3, 4, 5].map((index) => (
                  <Carousel.Item
                    key={index}
                    className="pl-4 min-w-0 shrink-0 grow-0 basis-9/12 sm:basis-1/2 md:basis-1/4 rounded-lg"
                  >
                    <div className="p-1 h-full">
                      <VideoCardSkeleton />
                    </div>
                  </Carousel.Item>
                ))
              )
            }


            {ytVideo.map((slide, i) => (
              <Carousel.Item
                key={i}
                className="pl-4 min-w-0 shrink-0 grow-0 basis-9/12 sm:basis-1/2 md:basis-1/4 rounded-lg"
              >
                <div className="p-1 h-full">

                  <VideoCard
                    index={i}
                    title={slide.title}
                    image={slide.thumbnail}
                    datepub={slide.published}
                    url={slide.link}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>

        </Carousel>

      </div>

    </section>
  );
}

export default VideoSection;
