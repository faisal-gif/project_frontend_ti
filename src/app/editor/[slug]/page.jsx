import { getEditorDetail } from '@/lib/api/editor';
import React from 'react'
import EditorClient from './EditorClient';

export async function generateMetadata({ params }) {
    const { slug } = params;
    const editorDetail = await getEditorDetail({ slug });

    if (!editorDetail) {
        return {
            title: "Editor tidak ditemukan - TIMES Indonesia",
            description: "Editor yang Anda cari tidak tersedia.",
        };
    }

    return {
        title: `${editorDetail.editor_name} - TIMES Indonesia`,
        description: editorDetail.editor_description,
        keywords: editorDetail.editor_alias,
        openGraph: {
            locale: 'id_ID',
            title: editorDetail.editor_name,
            description: "Editor TIMES Indonesia",
            images: [
                {
                    url: editorDetail.editor_image,
                    width: 500,
                    height: 500,
                    alt: editorDetail.editor_name,
                },
            ],
            type: "website",
          },
        twitter: {
            card: "summary_large_image",
            title: editorDetail.editor_name,
            description: editorDetail.editor_description,
            images: [editorDetail.editor_image],
        },
    };
}


export default async function page({ params }) {
    const { slug } = params;
    const editorDetail = await getEditorDetail({slug});
    return <EditorClient initialEditorDetail={editorDetail} />;
}