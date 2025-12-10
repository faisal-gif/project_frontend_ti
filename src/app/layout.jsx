import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'
import "./globals.css";
import Footer from "@/components/Footer";
import Image from "next/image";
import TopLoader from "@/components/ui/TopLoader";
import DesktopListMenu from "@/components/DesktopListMenu";
import dynamic from 'next/dynamic'
import DrawerAutoClose from "@/components/DrawerAutoClose";
import BackToTop from "@/components/BackToTop";
import ConditionalAdScript from '@/components/ConditionalAdScript';

const MobileListMenu = dynamic(() => import('@/components/MobileListMenu'))
const MobileMenuKanal = dynamic(() => import('@/components/MobileMenuKanal'))
const SearchDropdown = dynamic(() => import('@/components/SearchDropdown'))

const menu = [
  { name: "Internasional", slug: "internasional", src: "/kanal/peristiwa-internasional" },
  { name: "Nasional", slug: "nasional", src: "/kanal/peristiwa-nasional" },
  { name: "Daerah", slug: "daerah", src: "/kanal/peristiwa-daerah" },
  { name: "Cek Fakta", slug: "cek-fakta", src: "/kanal/cek-fakta" },
  { name: "Kopi Times", slug: "kopi-times", src: "/kanal/kopi-times" },
  { name: "Ekonomi", slug: "ekonomi", src: "/kanal/ekonomi" },
  { name: "Tekno", slug: "tekno", src: "/kanal/tekno" },
  { name: "Pendidikan", slug: "pendidikan", src: "/kanal/pendidikan" },
  { name: "Olahraga", slug: "olahraga", src: "/kanal/olahraga" },
  { name: "Otomotif", slug: "otomotif", src: "/kanal/otomotif" },
  { name: "Kesehatan", slug: "kesehatan", src: "/kanal/kesehatan" },
  { name: "Kuliner", slug: "kuliner", src: "/kanal/kuliner" },
  { name: "Wisata", slug: "wisata", src: "/kanal/wisata" },
  { name: "Sosok", slug: "sosok", src: "/kanal/sosok" },
  { name: "Religi", slug: "religi", src: "/kanal/religi" },
];


export const metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
  },
  // ✅ Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  // ✅ Verification
  verification: {
    google: "f_UQJ0dttE_Hbkmc7kY2eFeziynxv8c9PKr1HqidotA",
    yandex: "c38836340e1bc1d9",
    yahoo: "7efd2f6c70c35e36de7007d34b5ac59e",
    other: {
      "msvalidate.01": "C9F7D1AE364FEE927DA747F2ECE6F497",
      "p:domain_verify": "7efd2f6c70c35e36de7007d34b5ac59e",
    },
  },

  other: {
    "fb:app_id": "902622399777757",
    "fb:admins": "1489514926",
    "fb:pages": "258635271160588",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light" className='scroll-smooth'>
      <head>
        {/* Extra SEO */}
        <meta name="city" content="Jakarta" />
        <meta name="language" content="id" />
        <meta name="geo.country" content="id" />
        <meta httpEquiv="content-language" content="In-Id" />
        <meta name="geo.placename" content="Indonesia" />
        <meta name="subject" content="News, Media" />
        <meta name="copyright" content="TIMES Indonesia" />
        <meta
          name="standout"
          content="https://timesindonesia.co.id/kanal"
        />

        {/* Microsoft tile */}
        <meta
          name="msapplication-TileImage"
          content="https://timesindonesia.co.id/themes/times/assets/images/timesindonesia-favicon-144.png"
        />

      </head>
      <body
        className={`antialiased`}
      >

        <DrawerAutoClose />
        <div className="drawer">
          <input id="drawer-nav" type="checkbox" aria-label="Drawer toggle" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="fixed top-0 w-full z-[9999]">
              {/* Navbar Atas */}
              <div className="navbar bg-gradient-to-r from-[#800b19] to-[#3e154f] backdrop-blur-sm shadow-sm border-b border-[#7a0f1f]">
                <div className="max-w-6xl w-full md:px-4 mx-auto flex gap-4 justify-between items-center">

                  {/* Mobile Menu Button */}
                  <div className="flex-none md:hidden">
                    <label
                      htmlFor="drawer-nav"
                      aria-label="open sidebar"
                      className="btn btn-ghost hover:bg-white/30 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </label>
                  </div>

                  {/* Logo + Menu Utama */}
                  <div className="lg:flex-1 flex items-center gap-6">
                    <Link href={'/'}>
                      <Image
                        src="/logo.png"
                        alt="News Logo"
                        className="h-10 w-auto object-contain mx-auto lg:mx-0"
                        width={200}
                        height={60}
                        priority
                      />
                    </Link>

                    <DesktopListMenu />

                  </div>

                  {/* Search */}
                  <div children="">
                    <SearchDropdown />

                  </div>
                </div>
              </div>

              {/* Navbar Bawah */}
              <div className="w-full bg-[#7a0f1f] shadow-sm border border-none">
                <div className="max-w-6xl mx-auto flex gap-6 px-4 overflow-x-auto text-sm">
                  {menu.map((menu) => (
                    <Link
                      key={menu.slug}
                      href={menu.src}
                      className="py-2 text-white/80  hover:text-white whitespace-nowrap"
                    >
                      {menu.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <TopLoader />
            {/* Page content here */}
            <div className="my-12">
              {children}
            </div>

            {/* Footer */}
            <Footer />
          </div>
          <div className="drawer-side z-[9999]">
            <label htmlFor="drawer-nav" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu text-black bg-base-200  min-h-full w-72">
              <li className="text-xl font-bold text-white mb-6">
                <Link href={'/'}>
                  <Image
                    src="/logo_white.png"
                    alt="News Logo"
                    className="h-10 w-auto object-contain mx-auto lg:mx-0"
                    width={200}
                    height={60}
                    priority
                  />
                </Link>
              </li>
              <h2 className="menu-title py-4">Menu Utama</h2>
              <li>
                <MobileListMenu />
              </li>
              <li>
                <MobileMenuKanal />
              </li>
              {/* Sidebar content here */}

            </ul>
          </div>
        </div>
        <BackToTop />
        <GoogleAnalytics gaId='G-VWQ4STDNVX' strategy="worker" />
        <ConditionalAdScript />
      </body>
    </html>
  );
}
