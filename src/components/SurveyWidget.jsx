import React from 'react'
import Card from './ui/Card'

function SurveyWidget() {
    return (
        <Card className="p-4 bg-base-100 space-y-4 border border-base-300">
            <div>
                <h3 className="font-bold text-foreground text-lg">Survei Kelayakan Web</h3>
                <p className="text-sm text-muted-foreground">Bantu kami meningkatkan kualitas layanan dengan mengisi survei singkat</p>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfFWTWv_kQTz_gQJ6Un1u9leJfbicgzVhNvdILGspOTMbNXLQ/viewform?embedded=true"
                    width="100%"
                    height="500"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="w-full"
                    title="Survei Kelayakan Web"
                >
                    Memuat…
                </iframe>
            </div>
        </Card>
    )
}

export default SurveyWidget