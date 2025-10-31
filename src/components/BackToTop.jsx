"use client";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { ArrowUpFromDot } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // pantau scroll
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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
         
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end justify-end">
                <Button
                    onClick={scrollToTop}
                    className={`p-3 rounded-full bg-[#7a0f1f] text-white shadow-lg hover:bg-[#3e154f] transition-all duration-300 ease-in-out ${
                        isVisible
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0 pointer-events-none"
                    }`}
                    aria-label="Kembali ke atas"
                    disabled={!isVisible} // Nonaktifkan tombol saat tidak terlihat
                >
                    <ArrowUpFromDot size={16} />
                </Button>

                {/* Tombol WhatsApp tetap sama, selalu terlihat */}
                <Link
                    href={"https://www.whatsapp.com/channel/0029VaFG7TP29757xsqaDd2D"}
                    className="p-3 rounded-lg bg-green-500 text-white shadow-lg hover:bg-green-900 transition flex items-center gap-2"
                    aria-label="Whatsapp Channel"
                >
                    <FaWhatsapp className="ml-5" size={18} />
                    <div className="text-sm font-semibold space-y-1 leading-tight flex flex-col">
                        <span >Berita Terkini Eksklusif </span>
                        <span>di WhatsApp TIMES Indonesia</span>
                    </div>
                   
                </Link>
            </div>
        </>
    );
}