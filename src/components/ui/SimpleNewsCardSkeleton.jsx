import React from 'react'

function SimpleNewsCardSkeleton() {
  return (
   <section className="space-y-6 border-t-2 border-base-300 animate-pulse">
      {/* Header Title */}
      <div className="flex items-center justify-between mt-2">
        <div className="h-4 w-32 bg-base-300 rounded"></div>
        <div className="h-4 w-4 bg-base-300 rounded-full"></div>
      </div>
      
      {/* List of Simple News Card */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-20 h-16 bg-base-300 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-base-300 rounded"></div>
              <div className="h-3 w-1/3 bg-base-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SimpleNewsCardSkeleton