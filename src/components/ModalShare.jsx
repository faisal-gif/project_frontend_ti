'use client';
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Copy, Check, MessageSquare, Paperclip, Mail } from 'lucide-react';

const ModalShare = ({ title = 'TIMES Indonesia' }) => {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(""); // default kosong
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setUrl(currentUrl);

      // teks share konsisten
      setShareText(
        `${title}\n${currentUrl}\n\nDapatkan akses berita TIMES Indonesia lebih mudah dan cepat.\nWA Channel: https://bit.ly/timeswac\nTelegram Channel: https://t.me/timesindonesia\nGoogle News: https://bit.ly/timesgn `
      );
    }
  }, [title]);

  const copyToClipboard = () => {
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
            {copied ? <Check size={20} className="text-green-500" /> : "Copy"}
          </button>
        </div>

        {/* Tombol share */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-blue-600"> <Facebook size={24}/> </a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sky-500"> <Twitter size={24}/> </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-blue-800"> <Linkedin size={24}/> </a>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-green-500"> <MessageSquare size={24}/> </a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-blue-400"> <Paperclip size={24}/> </a>
          <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-gray-500"> <Mail size={24}/> </a>
        </div>
      </div>
        <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
    </dialog>
  );
};

export default ModalShare;
