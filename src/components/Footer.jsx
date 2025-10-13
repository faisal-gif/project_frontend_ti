import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import React from 'react'
import Button from "./ui/Button";
import Link from "next/link";
import Image from "next/image";
import Logo_x from '@/../public/logo_x.svg';

function Footer() {
  return (
    <footer className=" bg-gradient-to-b from-[#0f172a] to-[#222325] border-t border-footer-border">
      {/* Main Footer Content */}
      <div className="container p-8 max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#b51d1d] mb-2">
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
              </h2>
              <p className="text-white/65 leading-relaxed">
                Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white/85 font-semibold mb-3">Ikuti Kami</h3>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/timesindonesia.co.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Times Indonesia on Facebook"
                  className="btn btn-outline btn-sm text-white rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://x.com/timescoid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Times Indonesia on Twitter"
                  className="btn btn-outline btn-sm text-white rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Image src={Logo_x} alt="Logo X" width={16} height={16} className="h-4 w-4" />
                  <span className="sr-only">X</span>
                </a>
                <a href="https://www.instagram.com/timesindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Times Indonesia on Instagram"
                  className="btn btn-outline btn-sm text-white rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.youtube.com/@timesIDN"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Times Indonesia on Youtube"
                  className="btn btn-outline btn-sm text-white rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">Youtube</span>
                </a>
              </div>
            </div>

          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white/85 font-semibold mb-4">Kanal Utama</h3>
              <ul className="space-y-2">
                <li><Link href="/kanal/peristiwa-nasional" className="text-white/65 hover:text-[#b51d1d] transition-colors">Nasional</Link></li>
                <li><Link href="/kanal/peristiwa-internasional" className="text-white/65 hover:text-[#b51d1d] transition-colors">Internasional</Link></li>
                <li><Link href="/kanal/politik" className="text-white/65 hover:text-[#b51d1d] transition-colors">Politik</Link></li>
                <li><Link href="/kanal/ekonomi" className="text-white/65 hover:text-[#b51d1d] transition-colors">Ekonomi</Link></li>
                <li><Link href="/kanal/olahraga" className="text-white/65 hover:text-[#b51d1d] transition-colors">Olahraga</Link></li>
                <li><Link href="/kanal/entertainment" className="text-white/65 hover:text-[#b51d1d] transition-colors">Entertainment</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white/85 font-semibold mb-4">Kontak Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-[#b51d1d] mt-1 flex-shrink-0" />
                  <span className="text-white/65 text-sm">
                    Jl. Besar Ijen No.90, Oro-oro Dowo, Kec. Klojen, Kota Malang, Jawa Timur 65116
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-[#b51d1d]" />
                  <span className="text-white/65 text-sm">(0341) 563566</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-[#b51d1d]" />
                  <a href="mailto:redaksi@timesindonesia.co.id" className="text-white/65 hover:text-primary transition-colors text-sm">
                    redaksi@timesindonesia.co.id
                  </a>
                </li>
              </ul>
            </div>




          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white/85 font-semibold mb-4">Berlangganan</h3>
              <p className="text-white/65 text-sm mb-4">
                Dapatkan berita terbaru langsung di inbox Anda
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="input bg-footer-light border-footer-border w-full"
                />
                <Button className="w-full bg-[#b51d1d] rounded-lg border-none shadow-none hover:bg-[#9f1c1c]">
                  Berlangganan
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            {/* <div>
              <h3 className="text-white/85 font-semibold mb-3">Lainnya</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.youtube.com/@timesIDN" className="text-white/65 hover:text-primary transition-colors text-sm flex items-center">
                    TIMES TV <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li><Link href="/ekoran" className="text-white/65 hover:text-[#b51d1d] transition-colors text-sm">Ekoran</Link></li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <h3 className="text-white/85 mb-6 font-bold text-center">Member Of</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4  place-items-center justify-center items-center">
          <a href="https://wan-ifra.org/" target="_blank" rel="noopener noreferrer">
            <Image src="/logo-wanifra.png" alt="Logo WANIFRA" width={100} height={50} className="object-contain" />
          </a>
          <a href="https://amsi.or.id/" target="_blank" rel="noopener noreferrer">
            <Image src="/logo-amsi.png" alt="Logo AMSI" width={100} height={50} className="object-contain" />
          </a>
          <a href="https://dewanpers.or.id/" target="_blank" rel="noopener noreferrer">
            <Image src="/logo-Verified-By-Dewan-Pers-v2.png" alt="Logo Dewan Pers" width={100} height={50} className="object-contain" />
          </a>
          <a href="https://cdn-1.timesmedia.co.id/images/2023/07/08/ekoran-edisi-8-juli-23-trustworthy-indicatorss-by-sony.jpg" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
            <Image src="/trusted-web.png" alt="Logo Trusted" width={30} height={30} className="object-contain" />
          </a>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-6">

        <h3 className="text-white/85 mb-6 font-bold text-center">SUPPORTED BY</h3>
        <div className="flex flex-col md:flex-row gap-20 justify-center items-center space-y-4 md:space-y-0">
          <a href="https://www.varnion.com" target="_blank" rel="noopener noreferrer">
            <Image src="/logo_varnion.png" alt="Logo Varnion" width={90} height={30} className="object-contain" />
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center text-xs md:text-sm">
            <Link href="/page/legal-privacy" className="text-white/65 hover:text-[#b51d1d] transition-colors">Kebijakan Privasi</Link>
            <Link href="/page/terms-and-conditions" className="text-white/65 hover:text-[#b51d1d] transition-colors">Syarat & Ketentuan</Link>
            <Link href="/page/tentang-kami" className="text-white/65 hover:text-[#b51d1d] transition-colors">Tentang Kami</Link>
            <Link href="/page/contact-us" className="text-white/65 hover:text-[#b51d1d] transition-colors">Kontak Redaksi</Link>
          </div>
          <div className="text-white/65 text-sm">
            © 2025 TIMES Indonesia. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer