import React from 'react'
import SimpleNewsCard from './SimpleNewsCard'
import { ChevronRight } from 'lucide-react'

function SimpleNewsSection({ title, news, layout = 'normal' }) {
    return (
        <section className="space-y-6 border-t-2 border-base-300">
            <div className="flex items-center justify-between mt-1">
                <h2 className="text-lg font-bold text-news-category flex items-center gap-2">
                      <div className="w-1 h-6 bg-[#C31815] rounded-full"></div>
                    {title}
                    <ChevronRight className="w-6 h-6" />
                </h2>
            </div>
            <div className="space-y-3">
                {news.map((item) => (
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

export default SimpleNewsSection