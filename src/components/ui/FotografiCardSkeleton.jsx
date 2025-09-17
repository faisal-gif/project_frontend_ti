import React from 'react'
import Card from './Card'

function FotografiCardSkeleton() {
  return (
    <Card className="group cursor-pointer border-2 border-base-300 bg-card overflow-hidden w-full max-w-sm">
      <div className="aspect-[10/16] relative overflow-hidden rounded-t-lg animate-pulse">
        {/* Gambar placeholder */}
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />

        {/* Views badge */}
        <div className="absolute top-3 right-3">
          <div className="h-4 w-12 bg-gray-400/70 dark:bg-gray-600/70 rounded-md" />
        </div>

        {/* Title + Date inside image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <div className="h-4 w-3/4 bg-gray-400/70 dark:bg-gray-600/70 rounded" />
          <div className="h-3 w-1/3 bg-gray-400/50 dark:bg-gray-600/50 rounded" />
        </div>
      </div>
    </Card>
  )
}

export default FotografiCardSkeleton
