'use client';
import React, { useEffect, useState } from 'react';
import { X, Shield, CheckCircle, Minimize2, Maximize2 } from 'lucide-react';
import Card from './ui/Card';


const FloatingFactCheck = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
     // cek ukuran layar saat pertama kali render client
    if (window.innerWidth < 768) {
      setIsMinimized(true) // otomatis minimized kalau mobile
    }
  }, []);



  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[80vw]">
      <Card className="bg-base-100 border shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-neutral text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold text-sm">Cek Fakta</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
                {
                    isMinimized ? (<Maximize2 className="w-4 h-4" />) : ( <Minimize2 className="w-4 h-4" />)
                }
             
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 space-y-3">
            <div className="text-sm text-black/50 mb-3">
              Verifikasi berita terbaru dari sumber terpercaya
            </div>
            
            {/* Fact Check Items */}
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Benar</div>
                    <div className="text-xs text-black/50">
                      Vaksin COVID-19 aman dan efektif menurut WHO
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-3 py-2">
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Hoaks</div>
                    <div className="text-xs text-black/50">
                      Klaim air lemon dapat menyembuhkan kanker
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-yellow-500 pl-3 py-2">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Misleading</div>
                    <div className="text-xs text-black/50">
                      Data statistik ekonomi perlu konteks lebih lengkap
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-4 px-4 py-2 btn btn-neutral rounded-lg">
              Lihat Semua Cek Fakta
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FloatingFactCheck;