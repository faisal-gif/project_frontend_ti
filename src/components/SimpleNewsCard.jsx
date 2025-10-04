import React from 'react'
import Card from './ui/Card'
import Image from 'next/image';
import Link from 'next/link';
import FormattedDate from '@/utils/date/FormattedDate';

function SimpleNewsCard({ title, timeAgo, image, url, layout }) {
  

    return (
        <Link href={url}>
            <Card className="card-sm group cursor-pointer transition-all duration-300 rounded-b-none border-b-1 border-base-300 bg-card overflow-hidden">
                <Card.Body className="p-0">
                    {
                        layout === 'grid' && (
                            <div className="w-full">
                                <div className="relative aspect-square w-full h-[98] overflow-hidden rounded-lg ">
                                    <Image
                                        src={image}
                                        alt={title}
                                        layout="fill"
                                        
                                        loading='lazy'
                                        className="object-cover"
                                    />
                                </div>
                                <div className="py-3">
                                    <h3 className=" font-semibold text-sm leading-tight line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
                                        {title}
                                    </h3>
                                    
                                </div>
                            </div>

                        )
                    }
                    {
                        layout !== 'grid' && (
                            <div className={`flex ${layout === 'reverse' ? ' flex-row-reverse gap-4' : 'gap-4'} p-2`}>
                                <div className="w-20 h-17 flex-shrink-0 relative">
                                    <Image
                                        src={image}
                                        alt={title}
                                        width={80}
                                        height={50}
                                        className="object-cover rounded-md transform scale-100 transition group-hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className=" font-semibold text-sm leading-tight line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
                                        {title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span><FormattedDate dateString={timeAgo} /></span>
                                    </div>
                                </div>

                            </div>
                        )
                    }


                </Card.Body>
            </Card>
        </Link>
    )
}

export default SimpleNewsCard