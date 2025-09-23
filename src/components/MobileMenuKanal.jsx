'use client'
import { getAllKanal } from '@/lib/api/kanalApi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function MobileMenuKanal() {
    const pathname = usePathname();

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        getAllKanal().then(setChannels).catch(console.error);
    }, []);

    // Slugs to exclude
    const excludedSlugs = [
        "kopi-times-opini",
        "kopi-times-forum-dosen",
        "kopi-times-resensi",
        "kopi-times-forum-guru",
        "kopi-times-jurnal",
        "kopi-times-forum-mahasiswa",
    ];
    return (
        <>
            <h2 className="menu-title py-4">Kanal</h2>
            <ul>
                {channels.length === 0 ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <li key={index} className="py-1 ">
                            <div className="skeleton h-4 w-full"></div>
                        </li>
                    ))

                ) : (
                    channels
                        .filter(channel => !excludedSlugs.includes(channel.slug))
                        .map((channel) => {
                            return (
                                <li key={channel.id} className="py-1 ">
                                    <Link className={`whitespace-nowrap transition-colors ${pathname === channel.url
                                        ? "text-[#b41d1d] font-semibold"
                                        : "text-neutral hover:text-[#b41d1d]"}`} href={channel.url}>
                                        {channel.name}
                                    </Link>
                                </li>
                            )
                        })
                )}
            </ul>
        </>
    )
}

export default MobileMenuKanal