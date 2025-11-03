import React from 'react'

function EventWidget() {
    return (
        <iframe
            src="https://event.times.co.id/api/horizontal/widget"
            title="Widget Acara Times.co.id"
            width="100%"
            height="950"
            frameBorder="0"
            loading="lazy"
            style={{ border: 'none', overflow: 'hidden' }}
        />
    )
}

export default EventWidget