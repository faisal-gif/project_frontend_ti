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
                    <div key={item.id} className="flex items-center gap-2 group">
                        {Icon && (
                            <Icon
                                className={`w-4 h-4 group-hover:text-white ${isActive ? "text-white" : "text-white/70"
                                    }`}
                            />
                        )}
                        <Link
                            href={item.href}
                            className={`whitespace-nowrap transition-colors ${isActive
                                    ? "text-white font-semibold"
                                    : "text-white/70 group-hover:text-white"
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