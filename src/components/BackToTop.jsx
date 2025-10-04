"use client";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { ArrowUpFromDot } from "lucide-react";

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
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#7a0f1f] text-white shadow-lg hover:bg-[#3e154f] transition"
                    aria-label="Kembali ke atas"
                >
                    <ArrowUpFromDot size={16} />
                </Button>
            )}
        </>
    );
}
