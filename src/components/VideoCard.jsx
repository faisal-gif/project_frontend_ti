import React from 'react'
import Card from './ui/Card';
import Image from 'next/image';
import FormattedDate from '@/utils/date/FormattedDate';
import ClientOnly from './ClientOnly';

function VideoCard({
    index,
    image,
    title,
    url,
    datepub,
}) {

    return (
        <Card key={index} className="w-full max-w-sm group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 ease-in-out">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="relative overflow-hidden h-40 w-full">
                    <Image
                        src={image}
                        alt="Video thumbnail"
                        width={750}
                        height={350}
                        quality={40}
                        loading='lazy'
                        className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent" />

                    {/* Title + Date inside image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-white group-hover:text-white transition-colors">
                            {title}
                        </h3>
                        <div className="text-xs opacity-80 mt-1">
                            <ClientOnly>
                                <FormattedDate dateString={datepub} />
                            </ClientOnly>
                        </div>
                    </div>
                </div>


            </a>
        </Card>
    )
}

export default VideoCard