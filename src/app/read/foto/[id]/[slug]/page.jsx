import { getFotoDetail } from '@/lib/api/fotoApi';
import { permanentRedirect } from 'next/navigation';


export default async function page({ params }) {
    const { id } = params;

    const news = await getFotoDetail({ id: id });

    permanentRedirect(news.url_ci4);
}