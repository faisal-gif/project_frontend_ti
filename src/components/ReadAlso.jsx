import Link from 'next/link';

export default function ReadAlso({ articles = [], className = '' }) {
  return (
    <div className={`bg-base-100 border border-base-200 rounded-lg p-6 ${className}`}>
      <h6 className="text-md font-bold text-base-content  flex items-center gap-2">
        <span className="w-1 h-6 bg-red-600 rounded-full"></span>
        Baca Juga
      </h6>

      <div className="space-y-2">
        {articles.map((article) => (
          <Link key={article.news_id} href={article.url_ci4} className="group block">
             <div className="flex-1 min-w-0" >
              
                <h4 className="text-sm font-medium text-base-content group-hover:text-red-600 transition-colors line-clamp-2 leading-relaxed">
                  {article.news_title}
                </h4>
              </div>
           
          </Link>
        ))}
      </div>
    </div>
  );
}
