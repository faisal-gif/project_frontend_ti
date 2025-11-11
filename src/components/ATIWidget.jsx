import React from 'react'

function ATIWidget() {
    return (
        <a href="https://ati.timesindonesia.co.id/" target='_blank' rel="noreferrer" >
            <iframe
                src="https://ati.timesindonesia.co.id/widget"
                title="Widget ATI Times.co.id"
                frameBorder="0"
                loading="lazy"
                className="w-full border-none overflow-hidden h-[480px] md:h-[400px]"
            />
        </a>
    )
}

export default ATIWidget