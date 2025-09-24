import React from 'react'
import {
    Users,
    Edit,
    Heart,
    Info,
    Shield,
    FileText,
    Globe,
    Lock,
    Bot,
    AlertTriangle,
    ScrollText,
    Eye,
    Hash,
} from "lucide-react";
import Card from './ui/Card';
import Link from 'next/link';


const menuItems = [
    { title: "Tentang Kami", url: "/page/tentang-kami", icon: Users },
    { title: "Redaksi", url: "/page/redaksi", icon: Edit },
    { title: "Jurnalisme Positif", url: "/page/jurnalisme-positif", icon: Heart },
    { title: "Info Iklan", url: "/page/info-iklan", icon: Info },
    { title: "Standar Perlindungan Profesi Wartawan", url: "/page/standar-perlindungan-profesi-wartawan", icon: Shield },
    { title: "Kode Etik Jurnalis", url: "/page/kode-etik-jurnalis", icon: FileText },
    { title: "Pedoman Media Siber", url: "/page/pedoman-media-cyber", icon: Globe },
    { title: "Kebijakan Data Pribadi", url: "/page/legal-privacy", icon: Lock },
    { title: "Pedoman Penggunaan Konten AI", url: "/page/pedoman-penggunaan-ai", icon: Bot },
    { title: "Disclaimer", url: "/page/disclaimer", icon: AlertTriangle },
    { title: "Term of Use", url: "/page/terms-of-use", icon: ScrollText },
    { title: "Privacy Policy", url: "/page/privacy-policy", icon: Eye },
];

function PageStaticMenu() {
    return (
        <div className=' flex flex-col items-center justify-start gap-2'>
            <Card className="bg-[#7b0f1f] shadow-lg rounded-lg p-2 w-full flex flex-row items-center gap-2 text-white">
                <Hash size={16} />
                <h3 className="text-lg font-semibold "> Halaman</h3>
            </Card>
            <Card className="bg-white shadow-xl rounded-lg  w-full space-y-2 p-4">
                {menuItems.map((item) => (
                    <Link href={item.url} key={item.title} className="btn btn-ghost flex flex-row items-center justify-start gap-2 text-sm text-muted-foreground hover:text-[#C31815] transition-colors duration-200">
                        <item.icon size={16} />
                        <span className='text-xs'>{item.title}</span>
                    </Link>
                ))}
            </Card>
        </div>
    )
}

export default PageStaticMenu