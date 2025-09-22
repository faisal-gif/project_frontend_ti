"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

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
    type: "image",
    src: "https://picsum.photos/id/1015/1000/600/",
    width: 1000,
    height: 600,
    thumbnail: "https://picsum.photos/id/1015/250/150",
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
            <h2 className="text-lg font-bold text-foreground">LATEST NEWS VIDEOS</h2>
          </div>
          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            READ ALL
            <ChevronRight className="w-4 h-4" />
          </button>
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
              height: 80,
            }}
            inline={{
              style: {
                width: "100%",
                maxWidth: "900px",
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
                slide.type === "youtube" ? (
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
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.src}
                      alt="Gallery image"
                      fill
                      sizes="(max-width: 900px) 100vw, 900px"
                      className="object-cover"
                    />
                  </div>
                ),
            }}
          />
        </div>

        {/* Mobile (Carousel swipe) */}
        <div className="block md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {slides.map((slide, i) => (
              <div key={i} className="flex-shrink-0 w-[85%] snap-center">
                {slide.type === "youtube" ? (
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
                ) : (
                  <Image
                    src={slide.src}
                    alt="Gallery image"
                    width={400}
                    height={250}
                    className="rounded-lg object-cover w-full h-52"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
