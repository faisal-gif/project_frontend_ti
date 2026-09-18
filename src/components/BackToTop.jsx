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

                {/* Slot mini-card afiliasi — diisi via portal dari AffiliateCard.
                    display:contents → saat kosong tak menambah gap; saat terisi,
                    kartunya jadi item flex di urutan ini (setelah scroll button). */}
                <div id="affiliate-float-slot" className="contents transition-all duration-300 ease-in-out" />

                {/* Tombol WhatsApp: default hanya logo bulat, melebar ke kiri saat hover */}
                {isWaVisible && (
                    <div className="group relative">
                        <Link
                            href={"https://www.whatsapp.com/channel/0029VaFG7TP29757xsqaDd2D"}
                            className="flex items-center rounded-full bg-green-700 text-white shadow-lg transition-all duration-200 hover:bg-green-800 hover:shadow-xl active:scale-90"
                            aria-label="Channel WhatsApp TIMES Indonesia"
                        >
                            {/* Teks — lebar 0 & tersembunyi, muncul melebar ke kiri saat hover */}
                            <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-w-[240px] group-hover:pl-4 group-hover:opacity-100">
                                <span className="block whitespace-nowrap text-sm font-semibold leading-tight">
                                    Berita Terkini, Eksklusif
                                    <br />
                                    di WhatsApp TIMES Indonesia
                                </span>
                            </span>
                            {/* Logo — jangkar tetap di kanan */}
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                                <FaWhatsapp size={22} />
                            </span>
                        </Link>

                        {/* Tombol Close (X) — muncul saat hover */}
                        <button
                            onClick={closeWaButton}
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#b41d1d] text-white shadow opacity-0 pointer-events-none transition-opacity hover:bg-[#7b0f1f] group-hover:opacity-100 group-hover:pointer-events-auto"
                            aria-label="Tutup"
                        >
                            <X size={12} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}