import Link from 'next/link';

export default function ReadAlso({ articles = [], className = '' }) {
  return (
    <div className={`bg-base-100 border border-base-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-red-600 rounded-full"></span>
        Baca Juga
      </h3>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/news/${article.id}`} className="group block">
            <article className="flex gap-3 pb-4 border-b border-base-200 last:border-b-0 last:pb-0">
              <div className="flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-red-600 font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-base-content/60">
                    {article.timeAgo}
                  </span>
                </div>

                <h4 className="text-sm font-medium text-base-content group-hover:text-red-600 transition-colors line-clamp-2 leading-relaxed">
                  {article.title}
                </h4>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-4 transition-colors"
      >
        Lihat Semua Berita
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
