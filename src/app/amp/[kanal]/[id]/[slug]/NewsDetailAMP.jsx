
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import FormattedDateDetail from '@/utils/date/FormattedDateDetail';

import EkoranNewsDetailCard from '@/components/EkoranNewsDetailCard';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import PopularNews from '@/components/PopularNews';
import Card from '@/components/ui/Card';

const slugify = (text) => {
    if (!text) return "";
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
};

/**
 * Versi AMP dari NewsDetail.
 * SEMUA data (termasuk editor, focus, related) harus dilewatkan sebagai props.
 */
function NewsDetailAMP({
    newsDetail,
    writerDetail,
    editorDetail,
    focusDetail,
    relatedNews,
    newsViews,
    newsFirstSections
}) {

    // Semua logic state (useState, useEffect, useRef) DIHAPUS
    // Data datang langsung dari props.

    const tim = [
        { name: writerDetail?.name || '', role: "Penulis", foto: writerDetail?.image, url: `/writer/${writerDetail?.slug || ''}` },
        { name: newsDetail?.editor_name || '', role: "Editor", foto: editorDetail?.editor_image || null, url: `/editor/${newsDetail?.editor_alias || ''}` },
        { name: newsDetail?.publisher_name || '', role: "Publisher", foto: null, url: '' }
    ];

    const getTags = () => {
        if (!newsDetail || !newsDetail.news_tags) return [];
        return newsDetail.news_tags.split(',').map(tag => tag.trim()).filter(Boolean);
    };

    return (
        <>
            {/* 1. AMP STATE
               Menggantikan useState untuk mengelola ukuran font.
            */}
            <amp-state id="articleState">
                <script type="application/json">
                    {`{ "size": 2 }`}
                </script>
            </amp-state>

            <div className="max-w-6xl mx-auto px-4 py-24 ">

                <div className='hidden md:flex items-center justify-center'>
                    {/* 2. AMP AD
                       Menggantikan komponen <GoogleAds>
                    */}
                    <amp-ad
                        width="728"
                        height="90"
                        type="adsense"
                        data-ad-client="ca-pub-YOUR_CLIENT_ID" // GANTI DENGAN ID ANDA
                        data-ad-slot="YOUR_SLOT_ID" // GANTI DENGAN ID ANDA
                        layout="fixed"
                    >
                    </amp-ad>
                </div>

                {/* Breadcrumbs (Link) aman digunakan */}
                <div className="breadcrumbs text-sm mt-6">
                    <ul>
                        <li className='hover:text-[#b41d1d]'><Link href={'/'}>Home</Link></li>
                        <li className='hover:text-[#b41d1d]'><Link href={`/kanal/${newsDetail.catnews_slug}`}>{newsDetail.catnews_title}</Link></li>
                        <li className='text-[#b41d1d] font-semibold'>{newsDetail.news_title}</li>
                    </ul>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_80px_320px] gap-8 mt-6'>
                    {/* Tidak perlu Skeleton, data sudah ada dari server */}
                    <main className="col-span-1" >
                        <article className="rounded-lg overflow-hidden">
                            <Link href={`/kanal/${newsDetail.catnews_slug}`} className="btn btn-sm bg-[#b41d1d] text-white py-1 rounded-full text-sm font-medium">
                                {newsDetail.catnews_title}
                            </Link>
                            {focusDetail && (
                                <div className="py-4 md:py-2">
                                    <Link href={focusDetail.urlPath} className="btn btn-error btn-xs btn-outline py-1 rounded-full text-sm font-bold">
                                        {focusDetail.focnews_title}
                                    </Link>
                                </div>
                            )}

                            <div className="py-4 md:py-2">
                                <h1 className="text-xl md:text-4xl font-bold text-foreground mb-4 leading-snug">
                                    {newsDetail.news_title}
                                </h1>
                                <h2 className="text-sm md:text-lg text-gray-600 mb-6 leading-relaxed italic">
                                    {newsDetail.news_description}
                                </h2>
                            </div>
                            
                            {/* Meta */}
                            <div className="flex flex-col gap-4 border-b border-base-content/20 pb-4 mb-6 text-sm text-muted-foreground">
                                <div className="flex flex-row items-center gap-1">
                                    <span className='font-bold'>TIMES Indonesia</span>
                                    <span className="font-bold">-</span>
                                    <span className='flex flex-row gap-1 items-center pl-1'>
                                        {/* 3. IKON SVG
                                           Menggantikan <Eye> dari lucide-react
                                        */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                        <div>
                                            <FormattedViews count={newsViews} />
                                        </div>
                                    </span>
                                </div>
                                <span>
                                    <FormattedDateDetail dateString={newsDetail.news_datepub} />
                                </span>
                                <div className='flex flex-row justify-between items-center'>
                                    {/* Dropdown (CSS-only dari DaisyUI) aman digunakan */}
                                    <div className="dropdown">
                                        <button tabIndex={0} className="font-semibold flex flex-row items-center gap-3 cursor-pointer">
                                            {/* ... Avatar Group ... (Kode Image aman) */}
                                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                                {tim.map((tim, index) => (
                                                    tim.name && (
                                                        <div className="avatar avatar-placeholder" key={index} >
                                                            {tim.foto ? (
                                                                <div className="w-8 bg-neutral rounded-full">
                                                                    <Image src={tim.foto} alt={tim.name} width={32} height={32} loading='lazy' />
                                                                </div>
                                                            ) : (
                                                                <div className="bg-neutral text-neutral-content w-8 rounded-full flex items-center justify-center">
                                                                    <span className="text-xs">{tim.name.charAt(0).toUpperCase()}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                            <span className='hidden md:block'>{tim.filter((m) => m.name).map((m) => m.name).join(", ")}</span>
                                            <span className='md:hidden'>Tim Redaksi</span>
                                        </button>
                                        {/* ... Dropdown Content ... (Kode Link dan Image aman) */}
                                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-sm w-80 shadow">
                                            {tim.map((tim, index) => (
                                                tim.name && (
                                                    <li key={index}>
                                                        <Link href={tim.url} className="avatar avatar-placeholder" >
                                                            {/* ... Avatar ... */}
                                                            <span className=''>{tim.name}<span className='text-xs text-base-content/50'> - {tim.role}</span></span>
                                                        </Link>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='lg:hidden'>
                                        <Card className="py-2 flex flex-row items-center">
                                            <div className="dropdown dropdown-end">
                                                {/* 3. IKON SVG (Volume2) */}
                                                <button tabIndex={0} className="btn btn-ghost btn-sm text-sm font-bold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                                </button>
                                            </div>
                                            <div>
                                                {/* 4. EVENT AMP
                                                   Menggantikan onClick dengan 'on="tap:..."'
                                                */}
                                                <button on="tap:modal_share_lightbox.open" className="btn btn-ghost btn-sm text-sm font-bold">
                                                    {/* 3. IKON SVG (Share2) */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                                </button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className='flex-1'>
                                    {/* next/image aman digunakan */}
                                    <div className="flex flex-col justify-center items-center my-2">
                                        {focusDetail && focusDetail.focnews_image_body && (
                                            <Image
                                                src={focusDetail.focnews_image_body}
                                                alt={focusDetail.focnews_title}
                                                width={380}
                                                height={250}
                                                className="h-auto max-h-[500px] w-full object-contain rounded-2xl mb-4"
                                                priority
                                            />
                                        )}
                                        <div className="w-[340px] h-[252px] md:w-[750px] md:h-[500px] relative">
                                            <Image
                                                src={newsDetail.news_image_new}
                                                alt={newsDetail.news_title}
                                                fill
                                                className="object-contain"
                                                priority
                                                sizes="(max-width: 768px) 340px , 750px"
                                            />
                                        </div>
                                    </div>
                                    <figcaption className="mt-2 text-sm italic text-gray-600 text-center">{newsDetail.news_caption} </figcaption>

                                    {/* 5. KONTROL FONT AMP
                                       Menggantikan input 'range' yang dikontrol React
                                    */}
                                    <div className='w-1/2 max-w-xs mx-auto my-2'>
                                        <input
                                            type="range"
                                            min={1}
                                            max="3"
                                            defaultValue="2" // Gunakan defaultValue
                                            className="range range-xs [--range-bg:#7b0f1f]"
                                            step="1"
                                            // 'on' menggantikan 'onChange'
                                            on="input-throttled:AMP.setState({ articleState: { size: event.value } })"
                                        />
                                        <div className="flex justify-between text-sm font-semibold mt-2 px-2.5">
                                            <span>A-</span>
                                            <span>A</span>
                                            <span>A+</span>
                                        </div>
                                    </div>


                                    {/* 6. KONTEN ARTIKEL AMP
                                       Menggantikan <ArticleContent>
                                       Menggunakan data-amp-bind-class untuk ukuran font
                                    */}
                                    <div
                                        className="mt-8 prose prose-sm sm:prose-base md:prose-lg max-w-none prose-a:text-red-800 prose-a:no-underline"
                                        // Class akan berubah berdasarkan 'articleState.size'
                                        data-amp-bind-class="`mt-8 prose max-w-none prose-a:text-red-800 prose-a:no-underline ${
                                            articleState.size == 1 ? 'text-sm md:text-base' :
                                            articleState.size == 3 ? 'text-xl md:text-xl' :
                                            'text-base md:text-lg'
                                        }`"
                                        // Asumsi `news_content` sudah di-sanitize di server
                                        dangerouslySetInnerHTML={{ __html: newsDetail.news_content }}
                                    />
                                    {/* Catatan: readAlsoArticles tidak bisa disisipkan seperti di client.
                                      Jika ini penting, logic penyisipan harus terjadi di server 
                                      SEBELUM `news_content` dikirim ke komponen ini.
                                      Atau, render 'relatedNews' secara terpisah di bawah ini.
                                    */}
                                </div>
                            </div>
                            
                            {/* Tags (Link) aman */}
                            <div className="mt-8 pt-6 border-t border-base-content/20 flex flex-wrap gap-2">
                                {getTags().map((tag, index) => (
                                    <Link
                                        key={index}
                                        href={`/tag/${slugify(tag)}`}
                                        className="badge badge-soft text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-base-200 transition"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>

                            {/* Profil Penulis (statis) aman */}
                            {writerDetail && newsDetail.writer_slug && (
                                <div className="mt-8 pt-6 border-t border-base-content/20">
                                    <Card className="bg-gradient-to-r from-[#800b19] to-[#3e154f] p-9 flex md:flex-row flex-col items-center gap-8">
                                        {/* ... (Kode Kartu Penulis aman) ... */}
                                    </Card>
                                </div>
                            )}
                        </article>

                        {/* Asumsi EkoranNewsDetailCard AMP-compatible */}
                        <EkoranNewsDetailCard />
                    </main>

                    {/* Float Menu */}
                    <div className="hidden lg:block w-16">
                        <Card className=" shadow-md py-2 sticky top-36 flex flex-col items-center gap-4 mt-[29rem]">
                            <div className="dropdown dropdown-end">
                                <button tabIndex={0} className="btn btn-ghost text-lg font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                    <span className='sr-only'>Listen</span>
                                </button>
                            </div>
                            <div>
                                <button on="tap:modal_share_lightbox.open" className="btn btn-ghost text-lg font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                    <span className='sr-only'>Share</span>
                                </button>
                            </div>
                        </Card>
                    </div>

                    <aside className="hidden lg:block w-80">
                        <div className=" sticky top-28">
                            {/* Asumsi PopularNews AMP-compatible */}
                            <PopularNews />
                            <div className='flex items-center justify-center'>
                                {/* 2. AMP AD */}
                                <amp-ad
                                    width="300"
                                    height="250"
                                    type="adsense"
                                    data-ad-client="ca-pub-YOUR_CLIENT_ID" // GANTI
                                    data-ad-slot="YOUR_SLOT_ID_SIDEBAR" // GANTI
                                    layout="fixed"
                                >
                                </amp-ad>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="mx-auto grid  grid-cols-1 md:grid-cols-2 gap-6 py-8 lg:grid-cols-3">
                    {newsFirstSections.map((section, index) => (
                        <div key={index} className="space-y-8">
                            <FirstHightlightNewsSection title={section.title} news={section.news} />
                        </div>
                    ))}
                </div>

              
                <amp-lightbox id="modal_share_lightbox" layout="nodisplay">
                    <div className="modal-box relative" role="dialog" tabIndex="-1" style={{ display: 'block', margin: 'auto', background: 'white', padding: '20px', borderRadius: '8px', maxWidth: '400px', width: '90%' }}>
                        {/* Tombol close AMP */}
                        <button on="tap:modal_share_lightbox.close" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        
                        <h3 className="font-bold text-lg">Bagikan Berita Ini</h3>
                        <p className="py-4 text-sm">{newsDetail.news_title}</p>
                        
                        {/* Tombol share AMP */}
                        <div className="flex justify-center gap-4 py-4">
                            <amp-social-share type="facebook" data-param-app_id="YOUR_FB_APP_ID" width="40" height="40" style={{borderRadius: '50%'}}></amp-social-share>
                            <amp-social-share type="twitter" width="40" height="40" style={{borderRadius: '50%'}}></amp-social-share>
                            <amp-social-share type="whatsapp" width="40" height="40" style={{borderRadius: '50%'}}></amp-social-share>
                            <amp-social-share type="linkedin" width="40" height="40" style={{borderRadius: '50%'}}></amp-social-share>
                            <amp-social-share type="line" width="40" height="40" style={{borderRadius: '50%'}}></amp-social-share>
                        </div>
                    </div>
                </amp-lightbox>
            </div>
        </>
    )
}

export default NewsDetailAMP;