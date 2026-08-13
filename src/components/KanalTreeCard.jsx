import Link from 'next/link'
import React from 'react'
import Card from './ui/Card'

// Kartu kanal dengan sub-kanal (children). Parent & children dirender sebagai
// link terpisah (bukan anchor bersarang) agar HTML valid.
function KanalTreeCard({ name, url, description, children = [], Icon }) {
    const hasChildren = children.length > 0

    return (
        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg">
            <Card.Body className="p-6 flex flex-col h-full">
                <Link href={url} className="group flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-[#7a0f1f]/10 to-[#7a0f1f]/5 group-hover:from-[#7a0f1f]/20 group-hover:to-[#7a0f1f]/10 transition-all duration-300">
                        <Icon className="w-6 h-6 text-[#7a0f1f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-base-content group-hover:text-[#7a0f1f] transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
                            {description}
                        </p>
                    </div>
                </Link>

                {hasChildren ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {children.map((child) => (
                            <Link
                                key={child.id}
                                href={child.url}
                                className="text-xs font-medium px-3 py-1 rounded-full bg-[#7a0f1f]/8 text-[#7a0f1f] hover:bg-[#7a0f1f] hover:text-white transition-colors"
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Klik untuk membaca</span>
                        <div className="w-6 h-0.5 bg-[#7a0f1f]/20"></div>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default KanalTreeCard
