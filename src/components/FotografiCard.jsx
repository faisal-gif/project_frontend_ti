
import React from 'react'
import Card from './ui/Card'
import Carousel from './ui/Carousel'
import { Eye, Newspaper } from 'lucide-react'

function FotografiCard({
    datepub,
    gal_title,
    gal_cover,
    gal_view,
}) {

    return (
        <Card className="group cursor-pointer transition-all duration-300 hover:bg-news-hover border-2 border-base-300 bg-card overflow-hidden w-full max-w-sm">
            <div className="aspect-[5/6] relative overflow-hidden rounded-t-lg">
                <img
                    src={gal_cover}
                    alt={gal_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {gal_view.toLocaleString()}
                </div>
            </div>
            <div className="bg-base-200 p-4 space-y-6 ">
                <h3 className="font-serif text- font-light leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {gal_title}
                </h3>
                <div className="text-xs text-black/50">
                    <span>{datepub}</span>
                </div>
            </div>

        </Card>
    )
}

export default FotografiCard