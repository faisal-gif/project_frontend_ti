import React from 'react';
import { Calendar, Download, Eye, Newspaper } from 'lucide-react';
import Card from './ui/Card';
import FormattedDate from '@/utils/date/FormattedDate';


const EKoranCard = ({ edition }) => {

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
                    <span className="text-xs text-base-content/60"> <FormattedDate dateString={edition.datepub} /> </span>
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