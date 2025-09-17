'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    Share2,
    X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useParams, useRouter } from 'next/navigation';
import { getDetailEkoran } from '@/lib/api/ekoran';
import EkoranReader from '@/components/EkoranReader';

function EkoranDetailStory() {
    const params = useParams();
    const { id } = params;
    const navigate = useRouter();

    // Mock data for the e-koran edition
    const [ekoranDetail, setEkoranDetail] = useState(null);

    useEffect(() => {
        getDetailEkoran(id).then(setEkoranDetail).catch(console.error);
    }, [id]);



    const ekoranArticle = ekoranDetail && {
        id: ekoranDetail.id,
        title: ekoranDetail.title,
        date: new Date(ekoranDetail.datepub).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        views: Number(ekoranDetail.views),
        image: [
            ekoranDetail.img1,
            ekoranDetail.img2,
            ekoranDetail.img3,
            ekoranDetail.img4,
            ekoranDetail.img5,
            ekoranDetail.img6,
            ekoranDetail.img7,
            ekoranDetail.img8,
            ekoranDetail.img9,
            ekoranDetail.img10,
            ekoranDetail.img11,
            ekoranDetail.img12,
            ekoranDetail.img13,
            ekoranDetail.img14,
            ekoranDetail.img15,
            ekoranDetail.img16,
            ekoranDetail.img17,
            ekoranDetail.img18,
            ekoranDetail.img19,
            ekoranDetail.img20,
            ekoranDetail.img21,
            ekoranDetail.img22,
            ekoranDetail.img23,
        ].filter(Boolean),
        pages: [
            ekoranDetail.img1,
            ekoranDetail.img2,
            ekoranDetail.img3,
            ekoranDetail.img4,
            ekoranDetail.img5,
            ekoranDetail.img6,
            ekoranDetail.img7,
            ekoranDetail.img8,
            ekoranDetail.img9,
            ekoranDetail.img10,
            ekoranDetail.img11,
            ekoranDetail.img12,
            ekoranDetail.img13,
            ekoranDetail.img14,
            ekoranDetail.img15,
            ekoranDetail.img16,
            ekoranDetail.img17,
            ekoranDetail.img18,
            ekoranDetail.img19,
            ekoranDetail.img20,
            ekoranDetail.img21,
            ekoranDetail.img22,
            ekoranDetail.img23,
        ].filter(Boolean).length,
        link: ekoranDetail.url_ci4,
    }



    // Keyboard navigation
    const handleClose = () => {
        navigate.back();
    };

    if (!ekoranDetail) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            {/* Story Progress Bar */}
            <div className="absolute top-4 left-4 right-4 z-20">
                {/* Header */}
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClose}
                            className="text-white hover:bg-white/20"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-semibold text-sm">{ekoranArticle.title}</h1>
                            <p className="text-xs text-white/70">{ekoranArticle.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                                // Handle share functionality
                                if (navigator.share) {
                                    navigator.share({
                                        title: ekoranArticle.title,
                                        text: ekoranArticle.date,
                                        url: window.location.href
                                    });
                                }
                            }}
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>

                    </div>
                </div>
            </div>

            <EkoranReader ekoranArticle={ekoranArticle} />

        </div>
    )
}

export default EkoranDetailStory