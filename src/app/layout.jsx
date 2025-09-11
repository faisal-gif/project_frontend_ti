import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link'
import "./globals.css";
import { Focus, Home, List, Menu, Newspaper, Search } from 'lucide-react'
import Footer from "@/components/Footer";
import FloatingFactCheck from "@/components/FloatingFactCheck";
import Image from "next/image";
import TopLoader from "@/components/ui/TopLoader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-EB-Garamond",
  subsets: ["latin"],
});


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

const urlNav = [
  {
    id: 'home',
    name: 'Home',
    icon: Home,
    href: '/',
  },
  {
    id: 'kanal',
    name: 'Kanal',
    icon: List,
    href: '/kanal',
  },

  {
    id: 'fokus',
    name: 'Fokus',
    icon: Focus,
    href: '/fokus',
  },

  {
    id: 'ekoran',
    name: 'Ekoran',
    icon: Newspaper,
    href: '/ekoran',
  },

]

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light">
      <head>

        {/* Article metadata */}
        <meta
          property="article:publisher"
          content="https://www.facebook.com/timesindonesia.co.id"
        />
        <meta
          property="article:author"
          content="https://www.facebook.com/timesindonesia.co.id"
        />
        <meta
          property="article:tag"
          content="times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times"
        />

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
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased`}
      >
        <div className="drawer">
          <input id="drawer-nav" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="fixed top-0 w-full z-50">
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
                    <Image
                      src="/logo.png"
                      alt="News Logo"
                      className="h-10 w-auto object-contain mx-auto lg:mx-0"
                      width={200}
                      height={400}
                      priority
                    />
                    <div className="flex gap-6 max-md:hidden">
                      {urlNav.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-white" />
                          <Link
                            key={item.id}
                            href={item.href}
                            className="hover:text-red-300 transition-colors whitespace-nowrap text-white"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Search */}
                  <div className="md:ml-auto ml-4 dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="border-0">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-white rounded-box w-sm mt-6 shadow-sm relative"
                    >
                      <label className="input w-full z-80">
                        <Search className="w-6 h-6" />
                        <input type="search" className="grow" placeholder="Search" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navbar Bawah */}
              <div className="w-full bg-[#7a0f1f] shadow-sm border border-none">
                <div className="max-w-6xl mx-auto flex gap-6 px-4 overflow-x-auto text-sm">
                  {[
                    "Politik",
                    "Hukum",
                    "Ekonomi",
                    "Lingkungan",
                    "Wawancara",
                    "Investigasi",
                  ].map((menu) => (
                    <Link
                      key={menu}
                      href="#"
                      className="py-2 text-white/80  hover:text-white whitespace-nowrap"
                    >
                      {menu}
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
          <div className="drawer-side z-80">
            <label htmlFor="drawer-nav" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu text-black bg-base-100  min-h-full w-60 p-4">
              <li className="text-xl font-bold text-white mb-10"><img
                src="https://timesindonesia.co.id/themes/times/assets/images/logo-timesindonesia-white-web.png"
                alt="News Logo"
                className="h-10 w-auto object-contain"
              /></li>
              {urlNav.map((item) => (
                <li key={item.id} className="py-1"><a href={item.href}>{item.name}</a></li>
              ))}
              {/* Sidebar content here */}

            </ul>
          </div>
        </div>

        <FloatingFactCheck />
      </body>
    </html>
  );
}
