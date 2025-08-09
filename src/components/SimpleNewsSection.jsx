import React from 'react'
import SimpleNewsCard from './SimpleNewsCard'
import { ChevronRight } from 'lucide-react'

function SimpleNewsSection({ title, news }) {
    return (
        <section className="space-y-6 border-t-2 border-base-300">
            <div className="flex items-center justify-between mt-2">
                <h2 className="text-sm font-bold text-news-category flex items-center gap-2">
                    {title}
                    <ChevronRight className="w-6 h-6" />
                </h2>
            </div>
            <div className="space-y-3 font-serif">
                {news.map((item) => (
                    <SimpleNewsCard
                        key={item.id}
                        title={item.title}
                        source={item.source}
                        timeAgo={item.timeAgo}
                        image={item.image}
                    />
                ))}
            </div>
        </section>
    )
}

export default SimpleNewsSection