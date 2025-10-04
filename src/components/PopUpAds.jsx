'use client'
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Button from "./ui/Button";
import Image from "next/image";

const PopupAd = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("popupAdShown");

    if (!hasShown) {
      const timer = setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.showModal();
          sessionStorage.setItem("popupAdShown", "true");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onClose && onClose();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box relative bg-gradient-to-br from-[#800b19] to-[#3e154f] text-white rounded-2xl shadow-2xl">
        {/* Tombol close */}
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-circle btn-sm absolute right-2 top-2 bg-base-100 hover:bg-base-200"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        {/* Konten iklan */}

        <div className="text-center space-y-4">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg text-muted-foreground font-normal">
              Jelajahi Wajah Baru
            </h2>
            <Image
              src="/logo.png"
              alt="News Logo"
              className="h-10 w-auto object-contain mx-auto lg:mx-0"
              width={100}
              height={60}
              priority
            />
          </div>

          {/* Separator */}
          <div className="flex justify-center py-2">
            <div className="w-32 h-px bg-border"></div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Mari Berkolaborasi untuk menemukan berita berkualitas tinggi
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={handleClose}
              className="bg-neutral hover:bg-neutral/90 text-white border-0 shadow-none font-semibold px-8 py-2 rounded-md"
            >
              Ikuti!
            </Button>
          </div>

          {/* Domain */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              timesindonesia.co.id
            </p>
          </div>
        </div>
      </div>


    </dialog>
  );
};

export default PopupAd;
