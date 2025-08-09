'use client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import React, { useState } from 'react';

function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
