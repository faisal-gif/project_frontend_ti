
import React from 'react'
import Card from './ui/Card';
import FormattedDate from '@/utils/date/FormattedDate';
import ClientOnly from './ClientOnly';

function DetailEditor({ authorData }) {
    if (!authorData) {
        return null;
    }

    return (
        <div>

            {/* Author Profile Section */}
            <Card className="bg-white shadow-[0px_2px_14px_rgba(42,42,42,0.24)] rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="avatar avatar-placeholder">
                        {authorData.editor_image ? (
                            <div className="w-28 bg-neutral rounded-xl">
                                <img src={authorData.editor_image} alt={authorData.editor_name} />
                            </div>
                        ) : (
                            <div className="bg-neutral text-neutral-content w-28 rounded-full flex items-center justify-center">
                                <span className="text-5xl">
                                    {authorData.editor_name.charAt(0).toUpperCase()}
                                </span>

                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">{authorData.editor_name}</h1>
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
                            <div>Bergabung sejak {''}
                                <ClientOnly>
                                     <FormattedDate dateString={authorData.created} />
                                </ClientOnly>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>



        </div>
    )
}

export default DetailEditor