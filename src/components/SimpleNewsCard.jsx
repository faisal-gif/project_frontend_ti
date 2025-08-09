import React from 'react'
import Card from './ui/Card'

function SimpleNewsCard({ title, source, timeAgo, image, }) {
    return (
        <Card className="card-sm group cursor-pointer transition-all duration-300 rounded-b-none border-b-1 border-base-300 bg-card overflow-hidden">
            <Card.Body className="p-0">
                <div className="flex gap-4 p-4">
                    <div className="flex-1">
                        <h3 className=" font-light text-sm leading-tight mb-3 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span>{timeAgo}</span>
                            <span className="font-medium text-neutral/50">{source}</span>
                        </div>
                    </div>
                    <div className="w-20 h-16 flex-shrink-0">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover rounded-md transform scale-100  transition group-hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SimpleNewsCard