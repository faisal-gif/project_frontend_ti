import Link from 'next/link'
import React from 'react'
import Card from './ui/Card'

function KanalCard({ id, name, url, description, news_count,Icon }) {

    return (
        <Link href={url} key={id} className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg">
                <Card.Body className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-[#7a0f1f]/10 to-[#7a0f1f]/5 group-hover:from-[#7a0f1f]/20 group-hover:to-[#7a0f1f]/10 transition-all duration-300">
                            <Icon className="w-6 h-6 text-[#7a0f1f]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-black group-hover:text-[#7a0f1f] transition-colors">
                                {name}
                            </h3>
                            <p className="text-sm text-black/60 mt-1 line-clamp-2">
                                {description}
                            </p>
                            {news_count && (
                                <div className="mt-3 text-xs text-[#7a0f1f] font-medium">
                                    {Number(news_count).toLocaleString()} jumlah artikel
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            Klik untuk membaca
                        </span>
                        <div className="w-6 h-0.5 bg-[#7a0f1f]/20 group-hover:bg-[#7a0f1f] transition-colors"></div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default KanalCard