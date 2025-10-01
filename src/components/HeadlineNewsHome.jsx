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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date; // selisih dalam ms
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) {
            return "just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} menit${diffMinutes > 1 ? '' : ''} lalu`;
        } else if (diffHours < 24) {
            return `${diffHours} jam${diffHours > 1 ? '' : ''} lalu`;
        } else if (diffDays < 7) {
            return `${diffDays} hari${diffDays > 1 ? '' : ''} lalu`;
        }

        // fallback pakai format lokal
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // map popular articles to a format suitable for rendering
    const headlineArticle = headlineNews.map(article => ({
        id: article.news_id,
        image: article.news_image_new,
        title: article.news_title,
        author: article.news_writer,
        timeAgo: formatDate(article.news_datepub),
        views: Number(article.pageviews),
        url: article.url_ci4
    }));


    if (headlineArticle.length === 0) {
        return <HeadlineCardSkeleton />;
    }

    return (
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
            <Carousel.Content>
                {headlineArticle.map((article, index) => (
                    <Carousel.Item key={index} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                        <FeaturedNewsCard
                         className='md:h-[33rem]'
                            index={index}
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