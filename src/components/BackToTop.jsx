"use client";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
// 1. Impor ikon X
import { ArrowUpFromDot, X } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    // 2. State baru untuk visibilitas tombol WhatsApp
    const [isWaVisible, setIsWaVisible] = useState(true);

    // pantau scroll (tidak berubah)
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // scrollToTop (tidak berubah)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // 3. Handler untuk menutup tombol WhatsApp
    const closeWaButton = (e) => {
        // Mencegah link di belakangnya ter-klik
        e.preventDefault();
        e.stopPropagation();
        setIsWaVisible(false);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end justify-end">
                {/* Tombol Back to Top (tidak berubah) */}
                <Button
                    onClick={scrollToTop}
                    className={`p-3 rounded-full bg-[#7a0f1f] text-white shadow-lg hover:bg-[#3e154f] transition-all duration-300 ease-in-out ${
                        isVisible
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0 pointer-events-none"
                    }`}
                    aria-label="Kembali ke atas"
                    disabled={!isVisible}
                >
                    <ArrowUpFromDot size={16} />
                </Button>

                {/* 4. Bungkus tombol WhatsApp dengan conditional rendering */}
                {isWaVisible && (
                    // 5. Buat wrapper 'relative'
                    <div className="relative">
                        <Link
                            href={"https://www.whatsapp.com/channel/0029VaFG7TP29757xsqaDd2D"}
                            // 6. Tambahkan padding di kanan (pr-8) untuk memberi ruang bagi tombol X
                            className="p-3 pr-8 rounded-lg bg-green-500 text-white shadow-lg hover:bg-green-900 transition flex items-center gap-2"
                            aria-label="Whatsapp Channel"
                        >
                            <FaWhatsapp className="ml-5" size={18} />
                            <div className="text-sm font-semibold space-y-1 leading-tight flex flex-col">
                                <span>Berita Terkini, Eksklusif </span>
                                <span>di WhatsApp TIMES Indonesia</span>
                            </div>
                        </Link>
                        
                        {/* 7. Tombol Close (X) */}
                        <button
                            onClick={closeWaButton}
                            className="absolute top-1 right-1 p-0.5 rounded-full text-white/70 hover:text-white hover:bg-black/20 transition-colors"
                            aria-label="Tutup"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}