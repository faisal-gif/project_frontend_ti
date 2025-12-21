import Link from 'next/link';
import Image from 'next/image';

export default function ReadAlso({ articles = [], className = '' }) {
  if (!articles.length) return null;

  return (
    <div className={`not-prose my-4 space-y-2 ${className}`}>
      <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
        Baca juga
      </h4>
      
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <Link 
            key={article.news_image_new} 
            href={article.url_ci4}
            className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all"
          >
            {/* Thumbnail Image */}
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-gray-200">
              <Image
                src={article.news_image_new || '/placeholder-news.jpg'} // Gunakan placeholder jika gambar kosong
                alt={article.news_title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <div className="flex-1">
              <h3 className="text-md md:text-lg font-semibold leading-snug text-red-600 underline group-hover:text-red-700 transition-colors line-clamp-2">
                {article.news_title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}