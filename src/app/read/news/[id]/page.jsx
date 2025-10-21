import { getNewsDetail } from '@/lib/api/newsApi';
import { permanentRedirect } from 'next/navigation';


export default async function page({ params }) {
    const { id } = params;

    const news = await getNewsDetail({ id: id });

    permanentRedirect(news.url_ci4);
}