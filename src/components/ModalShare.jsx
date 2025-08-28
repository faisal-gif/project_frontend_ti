
'use client';
import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Copy, Check, Share2, Send, Mail, MessageSquare, Paperclip } from 'lucide-react';

const ModalShare = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <dialog id="modal_share" className="modal modal-bottom sm:modal-middle" onClick={() => document.getElementById('modal_share').close()}>
            <div className="modal-box sm:w-full sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">Bagikan Artikel Ini</h3>
                <p className="text-center text-sm text-base-content/60">Bagikan artikel ini ke teman-temanmu</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 py-4 justify-items-center">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-circle btn-outline text-blue-600 hover:bg-blue-600 hover:text-white" title="Facebook">
                        <Facebook size={32} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-circle btn-outline text-sky-500 hover:bg-sky-500 hover:text-white" title="Twitter">
                        <Twitter size={32} />
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-circle btn-outline text-blue-800 hover:bg-blue-800 hover:text-white" title="LinkedIn">
                        <Linkedin size={32} />
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-circle btn-outline text-green-500 hover:bg-green-500 hover:text-white" title="WhatsApp">
                        <MessageSquare size={32} />
                    </a>
                    <a href={`https://t.me/share/url?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-circle btn-outline text-blue-400 hover:bg-blue-400 hover:text-white" title="Telegram">
                        <Paperclip size={32} />
                    </a>
                    <a href={`mailto:?body=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-circle btn-outline text-gray-500 hover:bg-gray-500 hover:text-white" title="Email">
                        <Mail size={32} />
                    </a>
                </div>
                <div className="relative">
                    <input type="text" value={window.location.href} readOnly className="input input-bordered w-full" />
                    <button onClick={copyToClipboard} className="absolute top-1/2 right-1 transform -translate-y-1/2 btn btn-ghost btn-sm" title="Salin Tautan">
                        {copied ? <span className="text-green-500 flex items-center text-sm"><Check size={16} /><span className="ml-1">Disalin!</span></span> : <Copy size={20} />}
                    </button>
                </div>
                
            </div>
        </dialog>
    );
};

export default ModalShare;
