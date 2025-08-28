import React from 'react';
import { Calendar, Download, Eye, Newspaper } from 'lucide-react';
import Card from './ui/Card';


const EKoranCard = ({ edition }) => {

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
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <Card className="bg-base-100 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1  shadow-md rounded-lg p-4">
            <div className="flex flex-col items-center text-center">
                <div className="w-32 h-40 bg-base-200 rounded-lg shadow-md mb-4 relative overflow-hidden">
                    <img
                        src={edition.img1}
                        alt={edition.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-base-100/30 flex items-center justify-center">

                    </div>
                </div>

                <h3 className="font-semibold text-base-content mb-1">{edition.title}</h3>

                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-neutral" />
                    <span className="text-xs text-base-content/60">{formatDate(edition.datepub)}</span>
                </div>

                <div className="grid grid-cols-1 gap-2 w-full">
                    <a target='_blank' href={edition.url} className="btn btn-outline btn-sm w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        Baca
                    </a>

                </div>
            </div>
        </Card>
    );
};

export default EKoranCard;