import React from 'react'
import Card from './ui/Card'
import ClientOnly from './ClientOnly'
import Image from 'next/image'
import FormattedDate from '@/utils/date/FormattedDate'
import { Eye } from 'lucide-react'
import FormattedViews from '@/utils/view/FormattedViews'

function LandscapeNewsCard({ index, image, title, url, datepub, pageviews }) {
    return (
        <Card key={index} className="w-full max-w-sm group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 ease-in-out">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="relative overflow-hidden h-56 w-full">
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
                        <h3 className="text-xl font-semibold leading-tight line-clamp-2 text-white group-hover:text-white transition-colors">
                            {title}
                        </h3>
                        <div className='flex flex-row justify-between'>
                            <div className="text-xs opacity-80 mt-1">
                                <ClientOnly>
                                    <FormattedDate dateString={datepub} />
                                </ClientOnly>
                            </div>

                            <div className="text-xs opacity-80 mt-1">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>
                                        <ClientOnly>
                                            <FormattedViews count={pageviews} />
                                        </ClientOnly>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </a>
        </Card>
    )
}

export default LandscapeNewsCard