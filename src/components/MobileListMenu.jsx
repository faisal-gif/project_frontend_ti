'use client'
import { urlNav } from '@/lib/urlNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React from 'react'

function MobileListMenu() {
    const pathname = usePathname();
    return (
        <>
            <ul className=''>
                {urlNav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.id} className="py-1 ">
                            <Link className={`whitespace-nowrap transition-colors ${isActive
                                ? "text-[#b41d1d] font-semibold"
                                : "text-neutral hover:text-[#b41d1d]"
                                }`} href={item.href}>
                                {item.name}
                            </Link>
                        </li>
                    )
                }

                )}
            </ul>
            <h2 className="menu-title py-4">Kanal</h2>
        </>
    )
}

export default MobileListMenu