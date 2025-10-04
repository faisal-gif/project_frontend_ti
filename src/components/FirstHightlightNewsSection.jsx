
import React from 'react'
import Card from './ui/Card'
import SimpleNewsCard from './SimpleNewsCard'
import { ChevronRight, Eye, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';

function FirstHightlightNewsSection({ title, news, layout = 'normal' }) {

    return (
        <section className="space-y-6 border-t-2 border-base-300">
            <div className="flex items-center justify-between mt-2">
                <h2 className="text-lg font-bold text-news-category flex items-center gap-2 uppercase">
                    <div className="w-1 h-6 bg-[#C31815] rounded-full "></div>
                    {title}
                    <ChevronRight className="w-6 h-6" />
                </h2>
            </div>
            <div className="space-y-6">
                <Link href={news[0].url_ci4}>
                    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-card overflow-hidden">
                        <div className="relative">
                            <div className="aspect-[16/9] relative overflow-hidden">
                                <Image
                                    src={news[0].news_image_new}
                                    alt={news[0].news_title}
                                    fill
                                    loading='lazy'
                                    quality={70}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                {news[0].category && (
                                    <div className="absolute top-4 left-4 bg-black/80 text-white px-2 py-1 text-xs font-semibold rounded">
                                        {news[0].cat_title}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="text-xs mb-2 opacity-90"><FormattedDate dateString={news[0].news_datepub} /></div>
                                    <h3 className="text-sm font-bold leading-tight line-clamp-2 mb-4 text-white/70  group-hover:text-white transition-colors">
                                        {news[0].news_title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-medium">{news[0].news_writer}</span>
                                        <div className="flex items-center gap-4">
                                            {/* <div className="flex items-center gap-1">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{news[0].comments}</span>
                                        </div> */}
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span><FormattedViews count={news[0].pageviews} /></span>
                                            </div>
                                            {/* <div className="flex items-center gap-1">
                                            <Heart className="w-4 h-4" />
                                            <span>{news[0].likes}</span>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
            <div className={` ${layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}`}>
                {news.slice(1).map((item) => (
                    <SimpleNewsCard
                        layout={layout}
                        key={item.news_id}
                        title={item.news_title}
                        source={item.news_writer}
                        timeAgo={item.news_datepub}
                        image={item.news_image_new}
                        url={item.url_ci4}
                    />
                ))}
            </div>
        </section>
    )
}

export default FirstHightlightNewsSection