'use client'
import React, { useEffect, useState } from 'react'
import Carousel from './ui/Carousel'
import Autoplay from 'embla-carousel-autoplay'
import FeaturedNewsCard from './FeaturedNewsCard';
import Fade from 'embla-carousel-fade';
import { apiNews } from '@/lib/api';
import { getAllNews } from '@/lib/api/newsApi';
import HeadlineCardSkeleton from './ui/HeadlineCardSkeleton';

function HeadlineNewsHome() {

    const [headlineNews, setHeadlineNews] = useState([]);
    useEffect(() => {
        getAllNews({
            news_type: "headline",
            offset: 0,
            limit: 10,
        }).then(setHeadlineNews).catch(console.error);
    }, []);

    function formatRelativeTime(dateString) {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now - date // selisih dalam milidetik
        const diffSec = Math.floor(diffMs / 1000)
        const diffMin = Math.floor(diffSec / 60)
        const diffHour = Math.floor(diffMin / 60)
        const diffDay = Math.floor(diffHour / 24)

        if (diffSec < 60) return `${diffSec} seconds ago`
        if (diffMin < 60) return `${diffMin} minutes ago`
        if (diffHour < 24) return `${diffHour} hours ago`
        if (diffDay < 7) return `${diffDay} days ago`

        // kalau lebih dari seminggu, tampilkan tanggal normal
        return date.toLocaleDateString()
    }

    // map popular articles to a format suitable for rendering
    const headlineArticle = headlineNews.map(article => ({
        id: article.news_id,
        image: article.news_image_new,
        title: article.news_title,
        author: article.news_writer,
        timeAgo: formatRelativeTime(article.news_datepub),
        views: Number(article.pageviews),
        url: article.url_ci4
    }));


    if (headlineArticle.length === 0) {
        return <HeadlineCardSkeleton />;
    }

    return (
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
            <Carousel.Content>
                {headlineArticle.map((article) => (
                    <Carousel.Item key={article.id} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                        <FeaturedNewsCard
                            title={article.title}
                            source={article.author}
                            author={article.author}
                            timeAgo={article.timeAgo}
                            image={article.image}
                            comments='0'
                            views={article.views}
                            likes='1'
                            url={article.url}
                        />
                    </Carousel.Item>
                ))}

            </Carousel.Content>

            <Carousel.Previous position={'inner'} />
            <Carousel.Next position={'inner'} />


        </Carousel>
    )
}

export default HeadlineNewsHome