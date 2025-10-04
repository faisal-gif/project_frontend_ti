import React from 'react'
import Carousel from './ui/Carousel'
import Autoplay from 'embla-carousel-autoplay'
import FeaturedNewsCard from './FeaturedNewsCard';
import Fade from 'embla-carousel-fade';
import HeadlineCardSkeleton from './ui/HeadlineCardSkeleton';

function HeadlineNewsHome({initialHeadlineNews}) {

    
    if (initialHeadlineNews.length === 0) {
        return <HeadlineCardSkeleton />;
    }

    return (
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
            <Carousel.Content>
                {initialHeadlineNews.map((article, index) => (
                    <Carousel.Item key={index} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                        <FeaturedNewsCard
                         className='md:h-[33rem]'
                            index={index}
                            title={article.news_title}
                            source={article.news_writer}
                            timeAgo={article.news_datepub}
                            image={article.news_image_new}
                            views={Number(article.pageviews)}
                            url={article.url_ci4}
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