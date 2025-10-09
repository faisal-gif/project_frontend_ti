'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    Share2,
    X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import EkoranReader from '@/components/EkoranReader';
import ModalShare from '@/components/ModalShare';
import FormattedDate from '@/utils/date/FormattedDate';
import ClientOnly from '@/components/ClientOnly';

function EkoranDetailStory({ InitialEkoranDetail }) {

    const navigate = useRouter();

    // Mock data for the e-koran edition
    const [ekoranDetail] = useState(InitialEkoranDetail);

    const ekoranArticle = ekoranDetail && {
        id: ekoranDetail.id,
        title: ekoranDetail.title,
        date: ekoranDetail.datepub,
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
    // const handleClose = () => {
    //     navigate.back();
    // };

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
                            className="text-white hover:bg-white/20"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-semibold text-sm">{ekoranArticle.title}</h1>
                            <p className="text-xs text-white/70">
                                <ClientOnly>
                                    <FormattedDate dateString={ekoranArticle.date} />
                                </ClientOnly>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => document.getElementById('modal_share').showModal()} className="btn btn-ghost btn-sm text-sm font-bold text-white hover:bg-white/20"><Share2 className="w-5 h-5 cursor-pointer" /></button>
                    </div>
                </div>
            </div>

            <EkoranReader ekoranArticle={ekoranArticle} />
            <ModalShare title={ekoranArticle.title} />
        </div>
    )
}

export default EkoranDetailStory