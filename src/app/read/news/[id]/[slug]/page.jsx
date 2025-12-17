import { getNewsDetail } from '@/lib/api/newsApi';
import { notFound, permanentRedirect } from 'next/navigation';


export default async function page({ params }) {
    const { id } = params;

    const news = await getNewsDetail({ id: id });

    if (!news) {
        notFound();
    }

    permanentRedirect(news.url_ci4);
}