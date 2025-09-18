import Link from 'next/link';

export default function ReadAlso({ articles = [], className = '' }) {
  if (!articles.length) return null;

  return (
    <div className={`text-sm text-foreground italic my-4 ${className}`}>
      <span className="font-semibold not-italic">Baca juga:</span>{' '}
      {articles.map((article, idx) => (
        <span key={article.news_id}>
          <Link
            href={article.url_ci4}
            className="hover:text-red-600 transition-colors hover:underline"
          >
            {article.news_title}
          </Link>
          {idx < articles.length - 1 && ', '}
        </span>
      ))}
    </div>
  );
}
