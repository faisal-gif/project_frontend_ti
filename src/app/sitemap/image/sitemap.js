import { getAllFoto } from '@/lib/api/fotoApi'

export default async function sitemap() {
  const getImageData = await getAllFoto({ news_type: 'all', offset: 0, limit: 1000 });

  return getImageData.map((foto) => ({
    url: process.env.NEXT_PUBLIC_API_URL + foto.url_ci4,
    lastModified: new Date(foto.gal_datepub).toISOString(), // pakai format ISO
    images:[foto.gal_cover],
  }));
}
