'use client'
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getDetailEkoran } from '@/lib/api/ekoran';
import {
  ArrowLeft,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Calendar,
  Newspaper,
  Eye,
  Heart,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function EkoranDetailNormal() {
  const params = useParams();
  const { id } = params;

  const [ekoranDetail, setEkoranDetail] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [rotation, setRotation] = useState(0);
  const currentDate = new Date()

  useEffect(() => {
    getDetailEkoran(id).then(setEkoranDetail).catch(console.error);
  }, [id]);

  const ekoranArticle = ekoranDetail && {
    id: ekoranDetail.id,
    title: ekoranDetail.title,
    date: new Date(ekoranDetail.datepub).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    views: Number (ekoranDetail.views),
    image: [
      ekoranDetail.img1,
      ekoranDetail.img2,
      ekoranDetail.img3,
      ekoranDetail.img4,
      ekoranDetail.img5,
      ekoranDetail.img6,
      ekoranDetail.img7,
      ekoranDetail.img8,
      ekoranDetail.img9,
      ekoranDetail.img10,
      ekoranDetail.img11,
      ekoranDetail.img12,
      ekoranDetail.img13,
      ekoranDetail.img14,
      ekoranDetail.img15,
      ekoranDetail.img16,
      ekoranDetail.img17,
      ekoranDetail.img18,
      ekoranDetail.img19,
      ekoranDetail.img20,
      ekoranDetail.img21,
      ekoranDetail.img22,
      ekoranDetail.img23,
    ].filter(Boolean),
    pages: [
      ekoranDetail.img1,
      ekoranDetail.img2,
      ekoranDetail.img3,
      ekoranDetail.img4,
      ekoranDetail.img5,
      ekoranDetail.img6,
      ekoranDetail.img7,
      ekoranDetail.img8,
      ekoranDetail.img9,
      ekoranDetail.img10,
      ekoranDetail.img11,
      ekoranDetail.img12,
      ekoranDetail.img13,
      ekoranDetail.img14,
      ekoranDetail.img15,
      ekoranDetail.img16,
      ekoranDetail.img17,
      ekoranDetail.img18,
      ekoranDetail.img19,
      ekoranDetail.img20,
      ekoranDetail.img21,
      ekoranDetail.img22,
      ekoranDetail.img23,
    ].filter(Boolean).length,
    url: ekoranDetail.url_ci4,
  }

  // Zoom functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Navigation functions
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, ekoranArticle.pages));
  };

  const handlePageSelect = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!ekoranArticle) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-6xl flex-1 mx-auto px-4 lg:px-8 py-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/ekoran" className="hover:text-black/60 transition-colors">
            Ekoran
          </Link>
          <span>/</span>
          <span className="text-black/60">Detail</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Reader */}
        <div className="lg:col-span-2">
          <Card className="mb-6 shadow-lg border border-base-300">
            <Card.Body className="p-6">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Button className="rounded-md" variant="outline" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-2 min-w-[60px] text-center">{zoomLevel}%</span>
                  <Button className="rounded-md" variant="outline" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button className="rounded-md" variant="outline" size="sm" onClick={handleRotate}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button className="rounded-md" variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </div>

              {/* E-Koran Viewer */}
              <div className="bg-[#F1F5F9] rounded-lg p-8 text-center overflow-hidden">
                <div className="max-w-md mx-auto" style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.3s ease' }}>
                  <img
                    src={ekoranArticle?.image[(currentPage - 1) % ekoranArticle?.image.length]}
                    alt={`${ekoranArticle?.title} - Halaman ${currentPage}`}
                    className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                </div>

                {/* Page Navigation */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    className="rounded-md"
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    ← Prev
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Halaman {currentPage} dari {ekoranArticle?.pages}
                  </span>
                  <Button
                    className="rounded-md"
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === ekoranArticle?.pages}
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Page Thumbnails */}
          <Card className="mb-6 shadow-lg border border-base-300">
            <Card.Body className="p-6">
              <h3 className="text-lg font-semibold mb-4">Semua Halaman</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {Array.from({ length: ekoranArticle?.pages }, (_, index) => (
                  <div
                    key={index}
                    onClick={() => handlePageSelect(index + 1)}
                    className={`aspect-[3/4] bg-[#F1F5F9] rounded cursor-pointer hover:ring-2 hover:ring-[#b51d1d] transition-all relative overflow-hidden ${currentPage === index + 1 ? 'ring-2 ring-[#b51d1d]' : ''
                      }`}
                  >
                    <img
                      src={ekoranArticle?.image[index % ekoranArticle?.image.length]}
                      alt={`Halaman ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                      <span className={`text-xs font-medium px-1 rounded ${currentPage === index + 1
                        ? 'text-white bg-[#b51d1d]'
                        : 'text-foreground bg-white/80'
                        }`}>
                        {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Sidebar - Info */}
        <div className="space-y-6">
          {/* Edition Info */}
          <Card className="mb-6 shadow-lg border border-base-300">
            <Card.Body className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-[#b51d1d]/10 rounded-lg">
                  <Newspaper className="h-6 w-6 text-[#b51d1d]" />
                </div>
                <div className="flex-1">
                  <div className="badge badge-ghost mb-2">Edisi Terbaru</div>
                  <h1 className="text-xl font-bold text-foreground mb-1">
                    {ekoranArticle?.title}
                  </h1>
                  <p className="text-sm text-black/60">
                    Berita Terkini & Terpercaya 
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-[#b51d1d]" />
                  <span className="text-sm text-black/60">
                    {ekoranArticle?.date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-[#b51d1d]" />
                  <span className="text-sm text-black/60">
                    {ekoranArticle?.views.toLocaleString()} kali dibaca
                  </span>
                </div>
                <div className="flex justify-between text-sm text-black/60">
                  <span>{ekoranArticle?.pages} halaman</span>
                  <span>{ekoranArticle?.size}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-1" />
                  Suka
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-1" />
                  Simpan
                </Button>
              </div>
            </Card.Body>
          </Card>


          {/* Related Editions */}
          <Card className="mb-6 shadow-lg border border-base-300">
            <Card.Body className="p-6">
              <h3 className="font-semibold mb-4">Edisi Terkait</h3>
              <div className="space-y-1">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3 p-1 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-12 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img
                        src={ekoranArticle?.image[item - 1]}
                        alt={`Edisi ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        E-Koran {item} Hari Lalu
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(currentDate.getTime() - item * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

    </main>
  )
}

export default EkoranDetailNormal