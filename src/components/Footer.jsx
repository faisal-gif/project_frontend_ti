import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import React from 'react'
import Button from "./ui/Button";

function Footer() {
  return (
   <footer className=" bg-gradient-to-b from-[#0f172a] to-[#222325] border-t border-footer-border">
      {/* Main Footer Content */}
      <div className="container p-8 max-w-[1400px]  mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#b51d1d] mb-2">  <img src="https://timesindonesia.co.id/themes/times/assets/images/logo-timesindonesia-white-web.png" alt="News Logo" className="h-8 w-auto object-contain mx-auto lg:mx-0"></img> </h2>
              <p className="text-white/65 leading-relaxed">
                Portal berita terpercaya yang menyajikan informasi terkini dan terpercaya dari seluruh Indonesia dan dunia.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-white/85 font-semibold mb-3">Ikuti Kami</h3>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-primary">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg w-10 h-10 p-0 border-footer-border hover:bg-[#9f1c1c] hover:border-[#9f1c1c]">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white/85 font-semibold mb-4">Kategori Berita</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors">Nasional</a></li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors">Internasional</a></li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors">Politik</a></li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors">Ekonomi</a></li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors">Olahraga</a></li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors">Entertainment</a></li>
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
                    Jl. Raya Dieng No. 23<br />
                    Malang, Jawa Timur 65146
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-[#b51d1d]" />
                  <span className="text-white/65 text-sm">(0341) 567890</span>
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
              <h3 className="text-white/85 font-semibold mb-4">Newsletter</h3>
              <p className="text-white/65 text-sm mb-4">
                Dapatkan berita terbaru langsung di inbox Anda
              </p>
              <div className="space-y-3">
                <input
                  type="email" 
                  placeholder="Email Anda" 
                  className="input bg-footer-light border-footer-border"
                />
                <Button className="w-full bg-[#b51d1d] rounded-lg border-none shadow-none hover:bg-[#9f1c1c]">
                  Berlangganan
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white/85 font-semibold mb-3">Lainnya</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/65 hover:text-primary transition-colors text-sm flex items-center">
                    TIMES TV <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors text-sm">E-Paper</a></li>
                <li><a href="#" className="text-white/65 hover:text-[#b51d1d] transition-colors text-sm">RSS Feed</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

   

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/65 text-sm">
            © 2025 TIMES Indonesia. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center space-x-6 text-sm">
            <a href="#" className="text-white/65 hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-white/65 hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="text-white/65 hover:text-primary transition-colors">Tentang Kami</a>
            <a href="#" className="text-white/65 hover:text-primary transition-colors">Karir</a>
            <a href="#" className="text-white/65 hover:text-primary transition-colors">Kontak Redaksi</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer