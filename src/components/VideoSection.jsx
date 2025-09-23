"use client";
import React, { useState } from "react";
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

const slides = [
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/G8PKu6-Zaj0?si=E-1a1OmduH1p_fhC",
    thumbnail: "https://img.youtube.com/vi/G8PKu6-Zaj0/hqdefault.jpg",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/TkAEL4H_YrI?si=6QFEoFMBf_TFOY3K",
    thumbnail: "https://img.youtube.com/vi/TkAEL4H_YrI/hqdefault.jpg",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/nFJfOiJ44lQ?si=7KQWZM6O8zQvoUnJ",
    thumbnail: "https://img.youtube.com/vi/nFJfOiJ44lQ/hqdefault.jpg",
  },
];

function VideoSection() {
  const [index, setIndex] = useState(0);

  return (
    <section className="w-full bg-neutral text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-foreground">Video Terbaru</h2>
          </div>
          <Link href={'https://www.youtube.com/@timesIDN'} className="text-sm  hover:text-[#b41d1d] flex items-center gap-1">
            Lebih Banyak
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop (Lightbox grid) */}
        <div className="hidden md:block">
          <Lightbox
            index={index}
            close={() => null}
            slides={slides}
            plugins={[Inline, Thumbnails]}
            thumbnails={{
              width: 120,
              border: 0,
              height: 80,
            }}
            inline={{
              style: {
                width: "100%",
                aspectRatio: "16/10",
                background: "transparent",
              },
            }}
            carousel={{ finite: true }}
            on={{
              view: ({ index }) => setIndex(index),
            }}
            render={{
              slide: ({ slide }) =>
                <div className="w-full h-full flex items-center justify-center">
                  <iframe
                    key={index}
                    src={slide.src}
                    title="YouTube video"
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
            }}
          />
        </div>

        {/* Mobile (Carousel swipe) */}
        <div className="block md:hidden">

          <Carousel opts={{ align: "start", loop: true, dragFree: true, }} className="w-full">
            <Carousel.Content className="-ml-4">

              {slides.map((slide, i) => (
                <Carousel.Item
                  key={i}
                  className="pl-4 min-w-0 shrink-0 grow-0 basis-9/12 sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div key={i} className="flex-shrink-0 w-full snap-center">
                    <iframe
                      key={i}
                      src={slide.src}
                      title="YouTube video"
                      width="100%"
                      height="200"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous position="outer" />
            <Carousel.Next position="outer" />
          </Carousel>

        </div>
      </div>
    </section>
  );
}

export default VideoSection;
