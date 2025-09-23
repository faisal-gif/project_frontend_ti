'use client'
import React, { useEffect, useRef } from "react";

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
            ✕
          </button>
        </form>

        {/* Konten iklan */}
        <div className="text-center space-y-4 p-4">
          <div className="bg-error text-white px-4 py-2 rounded-full inline-block text-sm font-bold">
            NEWS PORTAL
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">BERITA TERPERCAYA</h2>
            <h3 className="text-3xl font-extrabold text-yellow-300">
              SETIAP HARI!
            </h3>
            <p className="text-white/90 text-sm">
              Dapatkan informasi terkini dan terpercaya dari berbagai kategori berita
            </p>
          </div>

          <button
            onClick={handleClose}
            className="btn btn-error btn-lg rounded-full text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            MULAI BACA ▶
          </button>

          <p className="text-xs text-white/70 mt-4">
            Update berita 24/7 • Gratis • Terpercaya
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default PopupAd;
