'use client';
import React, { useState } from 'react';
import { Facebook, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import logo_telegram from '@/../public/logo_telegram.svg';
import logo_whatsapp from '@/../public/logo_whatsapp.svg';
import logo_x_black from '@/../public/logo_x_black.png';

const ModalShare = ({ title = 'TIMES Indonesia', url = '' }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `${title}\n\nKlik Untuk Baca\n${url}\n\nDapatkan akses berita TIMES Indonesia lebih mudah dan cepat.`;

  const copyToClipboard = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <dialog id="modal_share" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box sm:w-full sm:max-w-lg">
        <h3 className="font-bold text-lg text-center">Bagikan Artikel Ini</h3>
        <div className="flex flex-row gap-2 items-center my-3">
          <input type="text" value={url} readOnly className="input input-bordered w-full" />
          <button onClick={copyToClipboard} className="btn btn-outline btn-neutral">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-blue-600"
          >
            <Facebook size={24} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-neutral"
          >
            <Image src={logo_x_black} alt="Logo X" width={24} height={24} />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-blue-800"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-green-500"
          >
            <Image src={logo_whatsapp} alt="Logo WhatsApp" width={24} height={24} />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-blue-400"
          >
            <Image src={logo_telegram} alt="Logo Telegram" width={24} height={24} />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-gray-500"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalShare;
