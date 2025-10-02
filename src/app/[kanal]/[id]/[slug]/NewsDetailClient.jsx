'use client';
import React, { useEffect, useState, useCallback } from 'react';
import ArticleContent from '@/components/ArticleContent';
import EkoranNewsDetailCard from '@/components/EkoranNewsDetailCard';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import GoogleAds from '@/components/GoogleAds';
import ModalShare from '@/components/ModalShare';
import PopularNews from '@/components/PopularNews';
import Card from '@/components/ui/Card';
import NewsDetailSkeleton from '@/components/ui/NewsDetailSkeleton';
import { getEditorDetail } from '@/lib/api/editor';
import { getAllNews, getNewsDetail, updateView } from '@/lib/api/newsApi';
import { getNewsSecondSections } from '@/lib/data';
import { Car, Eye, Share, Share2, User, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function NewsDetailClient({ initialNewsDetail }) {
  const [size, setSize] = useState(2);
  const [newsDetail] = useState(initialNewsDetail);
  const [editorDetail, setEditorDetail] = useState(null);
  const [focusDetail, setFocusDetail] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [newsViews, setNewsViews] = useState([]);
  const [newsSecondSections, setNewsSecondSections] = useState([]);

  // Hooks selalu dipanggil, logic conditional di dalam
  useEffect(() => {
    if (newsDetail) {
      getEditorDetail({ slug: newsDetail.editor_alias }).then(setEditorDetail).catch(console.error);
      updateView({ id: newsDetail.news_id }).then(setNewsViews).catch(console.error);

      if (Number(newsDetail.focnews_id) !== 0) {
        getFocusDetail({ id: newsDetail.focnews_id }).then(setFocusDetail).catch(console.error);
      }

      const firstTag = (newsDetail.news_tags?.split(',').map(tag => tag.trim()).filter(Boolean)[0]) || '';
      if (firstTag) {
        getAllNews({ news_type: 'tag', title: firstTag, limit: 5, offset: 0 }).then(setRelatedNews).catch(console.error);
      }
    }
  }, [newsDetail]);

  useEffect(() => {
    getNewsSecondSections().then(setNewsSecondSections).catch(console.error);
  }, []);

  const tim = [
    { name: newsDetail?.news_writer || '', role: "Penulis", foto: null, url: `/writer/${newsDetail?.writer_slug}` || '' },
    { name: newsDetail?.editor_name || '', role: "Editor", foto: editorDetail?.editor_image || null, url: `/editor/${newsDetail?.editor_alias}` || '' },
    { name: newsDetail?.publisher_name || '', role: "Publisher", foto: null, url: '' }
  ];

  const getTextSizeClasses = () => {
    switch (size) {
      case 1: return 'text-sm md:text-base';
      case 2: return 'text-base md:text-lg';
      case 3: return 'text-lg md:text-xl';
      default: return 'text-base md:text-lg';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  const formatViews = (num) => (num >= 1_000_000 ? (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M' : num >= 1_000 ? (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k' : num.toString());

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 ">
      <div className='flex items-center justify-center'><GoogleAds size='top_banner' /></div>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_80px_320px] gap-8 mt-20'>
        {!newsDetail ? <NewsDetailSkeleton /> : (
          <>
            <main className="col-span-1">
              <article className="rounded-lg overflow-hidden">
                <Link href={`/kanal/${newsDetail.catnews_slug}`} className="btn btn-sm bg-[#b41d1d] text-white py-1 rounded-full text-sm font-medium">{newsDetail.catnews_title}</Link>

                {focusDetail?.focnews_title && focusDetail?.urlPath && (
                  <div className="py-4 md:py-2">
                    <Link href={focusDetail.urlPath} className="btn btn-error btn-xs btn-outline py-1 rounded-full text-sm font-medium">{focusDetail.focnews_title}</Link>
                  </div>
                )}

                <div className="py-4 md:py-2">
                  <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-snug">{newsDetail.news_title}</h1>
                  <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed italic">{newsDetail.news_description}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-4 border-b border-base-content/20 pb-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex flex-row items-center gap-1">
                    <span className='font-bold'>TIMES Indonesia</span>
                    <span>-</span>
                    <span>{formatDate(newsDetail.news_datepub)}</span>
                    <span className="font-bold">-</span>
                    <span className='flex flex-row gap-1 items-center pl-1'>
                      <Eye size={16} />
                      <div>{formatViews(Number(newsViews.pageviews || 0))}</div>
                    </span>
                  </div>
                  <div className='flex flex-row justify-between items-center'>
                    <div className="dropdown">
                      <button tabIndex={0} className="font-semibold flex flex-row items-center gap-3 cursor-pointer">
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                          {tim.map((t, i) => t.name && (
                            <div className="avatar avatar-placeholder" key={i}>
                              {t.foto ? (
                                <div className="w-8 bg-neutral rounded-full">
                                  <Image src={t.foto} alt={t.name} width={32} height={32} loading='lazy' />
                                </div>
                              ) : (
                                <div className="bg-neutral text-neutral-content w-8 rounded-full flex items-center justify-center">
                                  <span className="text-xs">{t.name.charAt(0).toUpperCase()}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <span className='hidden md:block'>{tim.filter(t => t.name).map(t => t.name).join(", ")}</span>
                        <span className='md:hidden'>Tim Redaksi</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Header Image */}
                <div className="flex flex-col justify-center items-center my-6">
                  {focusDetail?.focnews_image_body && (
                    <Image src={focusDetail.focnews_image_body} alt={focusDetail.focnews_title} width={380} height={250} className="h-auto max-h-[500px] w-full object-contain rounded-2xl mb-4" priority fetchPriority="high" />
                  )}
                  {newsDetail.news_image_new && (
                    <div className="w-[380px] h-[252px] md:w-[750px] md:h-[500px] relative">
                      <Image src={newsDetail.news_image_new} alt={newsDetail.news_title} fill className="object-contain" priority fetchPriority="high" sizes="(max-width: 768px) 380px, 750px" />
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-600 pt-2">{newsDetail.news_caption}</div>

                {/* ArticleContent */}
                <ArticleContent
                  htmlContent={newsDetail.news_content || ""}
                  getTextSizeClasses={getTextSizeClasses}
                  readAlsoArticles={relatedNews || []}
                  lokus={newsDetail.news_city || ""}
                  url={newsDetail.url_ci4 || ""}
                  className="mt-8 prose prose-sm sm:prose-base md:prose-lg max-w-none prose-a:text-red-800 prose-a:no-underline"
                />
              </article>

              <EkoranNewsDetailCard />
            </main>

            {/* Sidebar */}
            <aside className="hidden lg:block w-80">
              <div className="sticky top-28">
                <PopularNews />
                <div className='flex items-center justify-center'>
                  <GoogleAds size='inline_rectangle' />
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

export default NewsDetailClient;
