import React from 'react'
import FeaturedNewsCard from './FeaturedNewsCard'
import HorizontalNewsSection from './HorizontalNewsSection'
import { ChevronRight } from 'lucide-react'

function FirstHighlightHorizontalNewsSection({ articles }) {
    return (
        <div className="space-y-6 border-t-2 border-base-300">
            <div className="flex items-center justify-between mt-2">
                <h2 className="text-lg font-bold text-news-category flex items-center gap-2 uppercase">
                    <div className="w-1 h-6 bg-[#C31815] rounded-full "></div>
                    Wawancara Khusus
                    <ChevronRight className="w-6 h-6" />
                </h2>
            </div>
            <div>
                <FeaturedNewsCard
                className='md:h-[28rem]'
                    image={articles[0].news_image_new}
                    title={articles[0].news_title}
                    author={articles[0].news_writer}
                    datepub={articles[0].news_datepub}
                    url={articles[0].url_ci4}
                    source={articles[0].news_writer}
                    views={Number(articles[0].pageviews)}
                />
            </div>
            <HorizontalNewsSection articles={articles.slice(1)} />
        </div>
    )
}

export default FirstHighlightHorizontalNewsSection