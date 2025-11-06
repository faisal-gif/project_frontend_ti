import React from 'react'

function EventWidget() {
    return (
        <iframe
            src="https://event.times.co.id/api/horizontal/widget"
            title="Widget Acara Times.co.id"
            frameBorder="0"
            loading="lazy"
            className="w-full border-none overflow-hidden h-[700px] md:h-[800px]"
        />
    )
}

export default EventWidget