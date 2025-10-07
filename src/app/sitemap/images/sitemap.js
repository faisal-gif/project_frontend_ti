import { getAllFoto } from '@/lib/api/fotoApi'

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export default async function sitemap() {

  let getImageData = [];
  try {
    getImageData = await getAllFoto({ news_type: 'all', offset: 0, limit: 500 });
  } catch (error) {
    console.error("Failed to fetch foto data:", error);
  }

  return getImageData.map((foto) => ({
    url: process.env.NEXT_PUBLIC_URL + foto.url_ci4,
    lastModified: foto.gal_datepub.replace(' ', 'T') + '+07:00', // pakai format ISO
    images: [foto.gal_cover],
  }));
}
