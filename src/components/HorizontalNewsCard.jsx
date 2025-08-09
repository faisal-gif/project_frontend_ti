import Link from 'next/link'
import React from 'react'
import Card from './ui/Card';
import { Eye } from 'lucide-react';

function HorizontalNewsCard({
    id,
    image,
    title,
    description,
    datepub,
    author,
    views,

}) {
    const slugify = (str) =>
        str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');

    return (
        <Card key={id} className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 ease-in-out">
            <Link href={`/news/${id}/${slugify(title)}`} className="block h-full">
                <div className="relative overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {views.toLocaleString()}
                    </div>
                </div>

                <div className="p-4 flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2 hover:text-red-600 transition-colors duration-200">
                            {title}
                        </h3>

                        
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 ">
                        <time>{datepub}</time>
                        <span>By {author}</span>
                    </div>
                </div>
            </Link>
        </Card>
    )
}

export default HorizontalNewsCard