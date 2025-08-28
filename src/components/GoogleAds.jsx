import React from 'react'

export default function GoogleAds({ size = 'rectangle', className = '' }) {
    const adSizes = {
        banner: { width: 'full', height: '180px' },
        rectangle: { width: '300px', height: '250px' },
        leaderboard: { width: '728px', height: '90px' },
        skyscraper: { width: '300px', height: '600px' }
    };

    const currentSize = adSizes[size];
    return (
        <div
            className={`bg-gray-100 border border-gray-200 rounded-[3px] flex items-center justify-center ${className}`}
            style={{
                width: currentSize.width,
                height: currentSize.height,
                maxWidth: '100%'
            }}
        >
            <div className="text-center text-gray-500">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs opacity-70"></div>
                {/* Google AdSense code would go here */}
                {/* <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"></ins> */}
            </div>
        </div>
    )
}
