import React from 'react'
import Carousel from './ui/Carousel'
import Autoplay from 'embla-carousel-autoplay'
import FeaturedNewsCard from './FeaturedNewsCard';
import Fade from 'embla-carousel-fade';

function HeadlineNewsHome() {
    const sportsNews = [
        {
            id: "1",
            title: "Just a coincidence: Tendulkar on India winning without Bumrah",
            source: "Times of India",
            timeAgo: "16 hours ago",
            image: "https://cdn-1.timesmedia.co.id/images/2025/08/07/Dunia-Voli-Putri-U-21.jpg",
        },
        {
            id: "2",
            title: "That mentality...': Sacked by BCCI, ex-India coach finally breaks silence",
            source: "Times of India",
            timeAgo: "17 hours ago",
            image: "https://cdn-1.timesmedia.co.id/images/2025/08/07/Dunia-Voli-Putri-U-21.jpg",
        },
        {
            id: "3",
            title: "Cricket Rankings: Siraj achieves career-high ranking; Prasidh climbs...",
            source: "Times of India",
            timeAgo: "17 hours ago",
            image: "https://cdn-1.timesmedia.co.id/images/2025/08/07/Dunia-Voli-Putri-U-21.jpg",
        },
        {
            id: "4",
            title: "You are great': Virat Kohli's sister pens emotional note for Siraj - READ",
            source: "Times of India",
            timeAgo: "18 hours ago",
            image: "https://cdn-1.timesmedia.co.id/images/2025/08/07/Dunia-Voli-Putri-U-21.jpg",
        },
    ];

    return (
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
            <Carousel.Content>
                {sportsNews.map((article) => (
                    <Carousel.Item key={article.id}>
                        <FeaturedNewsCard
                            title={article.title}
                            source={article.source}
                            timeAgo={article.timeAgo}
                            image={article.image}
                            comments={article.comments}
                            views={article.views}
                            likes={article.likes}
                        />
                    </Carousel.Item>
                ))}

            </Carousel.Content>

        </Carousel>
    )
}

export default HeadlineNewsHome