import { getNewsDetailUniq } from '@/lib/api/newsApi';
import { permanentRedirect, redirect } from 'next/navigation';
import React from 'react'

export default async function page({ params }) {
    const { uniq } = params;

    const news = await getNewsDetailUniq({ id: uniq });

    permanentRedirect(news.url_ci4);
}