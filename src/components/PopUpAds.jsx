'use client'
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Anda bisa mengganti URL default ini atau mengirimkannya sebagai prop
const PopupAd = ({ onClose, imageUrl = "/PopUpAds.jpg" }) => {
  const modalRef = useRef(null);

  // Logika untuk menampilkan popup sekali per sesi tetap sama
  useEffect(() => {
    const hasShown = sessionStorage.getItem("popupAdShown");

    if (!hasShown) {
      const timer = setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.showModal();
          sessionStorage.setItem("popupAdShown", "true");
        }
      }, 1000); // Muncul setelah 1 detik

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
      {/* Styling diubah: padding dihilangkan (p-0) dan overflow-hidden 
        agar gambar pas dengan kotak modal yang membulat.
      */}
      <div className="modal-box relative w-11/12 max-w-lg p-0 overflow-hidden rounded-lg">
        
        {/* Tombol close diposisikan di atas gambar */}
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-circle btn-sm absolute right-2 top-2 z-10 
                       bg-black bg-opacity-50 text-white border-none
                       hover:bg-opacity-75"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Tutup</span>
          </button>
        </form>

        {/* Konten Iklan: Hanya Gambar */}
        <Image
          src={imageUrl}
          alt="Iklan Promosi"
          width={800}
          height={1000}
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block'          
            }}
        />
      </div>
      
      {/* Ini agar bisa ditutup saat klik di luar area modal */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default PopupAd;