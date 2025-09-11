
import React from 'react'
import Card from './ui/Card';

function DetailWriter({ authorData }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date; // selisih dalam ms
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) {
            return "just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }

        // fallback pakai format lokal
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',

        });
    };

    if (!authorData) {
        return null;
    }

    return (
        <div>

            {/* Author Profile Section */}
            <Card className="bg-white shadow-[0px_2px_14px_rgba(42,42,42,0.24)] rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="avatar avatar-placeholder">
                        {authorData.image ? (
                            <div className="w-28 bg-neutral rounded-full">
                                <img src={authorData.image} alt={authorData.name} />
                            </div>
                        ) : (
                            <div className="bg-neutral text-neutral-content w-28 rounded-full flex items-center justify-center">
                                <span className="text-5xl">
                                    {authorData.name.charAt(0).toUpperCase()}
                                </span>

                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground mb-2">{authorData.name}</h1>
                        <p className="text-black/50 mb-4 leading-relaxed">
                            {authorData.editor_description ? authorData.editor_description : "Editor TIMES Indonesia"}
                        </p>

                        {/* <div className="flex flex-wrap gap-2 mb-4">
                            {authorData.expertise.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div> */}

                        <div className="flex flex-wrap gap-6 text-sm text-black/50">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">180</span>
                                <span>Artikel</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">100</span>
                                <span>Pengikut</span>
                            </div>
                            <div>Bergabung sejak {formatDate(authorData.created)}</div>
                        </div>
                    </div>
                </div>
            </Card>

           

        </div>
    )
}

export default DetailWriter