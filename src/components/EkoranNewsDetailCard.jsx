'use client'
import React, { useEffect, useState } from 'react'
import Card from './ui/Card'
import Link from 'next/link'
import { getAllEkoran } from '@/lib/api/ekoran';
import Image from 'next/image';

function EkoranNewsDetailCard() {

    const [ekoran, setEkoran] = useState([]);

    useEffect(() => {
        getAllEkoran({ offset: 0, limit: 5 }).then(setEkoran).catch(console.error);
    }, []);

    if (ekoran.length === 0) {
        return null;
    }

    return (
        <Card className="mt-8 bg-neutral rounded-lg">
            <Card.Body className="p-0 m-0">
                {/* Edition Header */}
                <div className="bg-[#7a0f1f] px-6 py-3 rounded-t-md">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{ekoran[0]?.title}</span>
                    </div>
                </div>
                {/* Main Content */}
                <div className="p-6 ">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Magazine Cover */}
                        <div className="relative">
                            <Image
                                src={ekoran[0]?.img1}
                                alt="TEMPO Magazine Cover"
                                width={450}
                                height={340}
                                className="w-full max-w-sm mx-auto rounded-lg shadow-lg object-cover"
                                loading='lazy'
                            />
                        </div>

                        {/* Headlines List */}
                        <div className="space-y-4">
                            <Link href={ekoran[0]?.url_ci4}>
                                <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">{ekoran[0]?.title.split(":")[0]}</h3>
                            </Link>

                            <div className="space-y-4 text-gray-200">

                                {ekoran.slice(1).map((edition) => (
                                    <div className="border-b border-gray-700 pb-3" key={edition.id}>
                                        <Link href={edition.url_ci4}>
                                            <h4 className="font-medium hover:text-white cursor-pointer transition-colors">
                                                {edition.title.split(":")[0]}
                                            </h4>
                                        </Link>
                                    </div>
                                ))}



                            </div>

                            {/* See Full Edition Button */}
                            <div className="mt-8">
                                <Link
                                    href="/ekoran"
                                    className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors group"
                                >
                                    <span className="font-medium">Lihat Edisi Selengkapnya</span>
                                    <svg
                                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default EkoranNewsDetailCard