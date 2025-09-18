'use client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// plugin thumbnails
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const slides = [
    {
      src: "https://picsum.photos/id/1018/1000/600/",
      description: "Foto 1 - demo deskripsi gambar",
    },
    {
      src: "https://picsum.photos/id/1015/1000/600/",
      description: "Foto 2 - demo deskripsi gambar",
    },
    {
      src: "https://picsum.photos/id/1019/1000/600/",
      description: "Foto 3 - demo deskripsi gambar",
    },
  ];


  return (
    <div className="container mx-auto p-4">
      <Card className="w-full bg-base-100 shadow-xl">
        <Card.Body>
          <Card.Title>Selamat Datang!</Card.Title>
          <p>Ini adalah contoh implementasi komponen Card dan Modal.</p>
          <ol className="mt-4 list-inside list-decimal font-mono text-sm/6">
            <li className="mb-2 tracking-[-.01em]">
              Mulai dengan mengedit{" "}
              <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono font-semibold dark:bg-white/[.06]">
                src/app/example/page.jsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">Simpan dan lihat perubahan Anda secara instan.</li>
          </ol>
          <Card.Actions className="mt-4 justify-end">
            <Button onClick={openModal} className="btn-primary">
              Buka Modal
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>

       <div className="max-w-6xl mx-auto">
      {/* Inline Lightbox (embed di halaman) */}
      <Lightbox
        index={index}
        close={() => null} // supaya inline tetap muncul
        slides={slides}
        plugins={[Inline]}
        inline={{
          style: { width: "100%", maxWidth: "900px", aspectRatio: "3 / 2" },
        }}
        carousel={{ finite: true, preload: 2, padding: 0 }}
        animation={{ zoom: false }}
        on={{
          view: ({ index }) => setIndex(index), // update index saat inline ganti slide
          click: () => setOpen(true), // klik gambar inline -> buka fullscreen
        }}
      />

      {/* Fullscreen Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{
          view: ({ index }) => setIndex(index), // update index global
        }}
      />
    </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Modal.Header>Contoh Modal</Modal.Header>
        <Modal.Body>
          <p>Ini adalah konten di dalam modal. Anda bisa menambahkan form, gambar, atau komponen lainnya di sini.</p>
          <p className="mt-2">Tekan tombol `Esc` atau klik di luar untuk menutup.</p>
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={closeModal}>Tutup</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ExamplePage;
