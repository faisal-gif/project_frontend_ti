'use client'
import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { Focus, Home, List, Menu, Newspaper, Search } from 'lucide-react'
import { urlNav } from '@/lib/urlNav';

function DesktopListMenu() {
    const pathname = usePathname();
    const icons = {
        Home: Home,
        Focus: Focus,
        List: List,
        Menu: Menu,
        Newspaper: Newspaper,
    };

    return (
        <div className="flex gap-6 max-md:hidden">
            {urlNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = icons[item.icon]; // ambil component sesuai string
                return (
                    <div key={item.id} className="flex items-center gap-2">
                        {Icon && (
                            <Icon
                                className={`w-4 h-4 ${isActive ? "text-red-500" : "text-white"
                                    }`}
                            />
                        )}
                        <Link
                            href={item.href}
                            className={`whitespace-nowrap transition-colors ${isActive
                                    ? "text-red-500 font-semibold"
                                    : "text-white hover:text-red-300"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default DesktopListMenu