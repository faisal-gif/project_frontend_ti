"use client";
import GoogleAds from "@/components/GoogleAds";
import NewsCard from "@/components/NewsCard";
import Button from "@/components/ui/Button";
import { getAllNews } from "@/lib/api/newsApi";
import { Grid, List } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

function SearchDetail({ keyword }) {
  const [viewMode, setViewMode] = useState("grid");
  const [searchNews, setSearchNews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [loadCount, setLoadCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchNews = async (currentOffset) => {
    try {
      setIsLoading(true);
      const res = await getAllNews({
        news_type: "search",
        title: keyword,
        limit: limit,
        offset: currentOffset,
      });
      const newData = res || [];

      setSearchNews((prev) => {
        const existingIds = new Set(prev.map((item) => item.news_id));
        const filtered = newData.filter(
          (item) => !existingIds.has(item.news_id)
        );
        return [...prev, ...filtered];
      });

      if (newData.length < limit) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!keyword) return;
    setSearchNews([]);
    setOffset(0);
    setHasMore(true);
    fetchNews(0);
  }, [keyword]);

  useEffect(() => {
    if (offset > 0) fetchNews(offset);
  }, [offset]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && loadCount < 4 && hasMore && !isLoading) {
        setOffset((prev) => prev + limit);
        setLoadCount((prev) => prev + 1);
      }
    },
    [limit, loadCount, hasMore, isLoading]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);

    const timer = setTimeout(() => {
      if (loaderRef.current) observer.observe(loaderRef.current);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const loadMoreManually = () => {
    if (hasMore && !isLoading) {
      setOffset((prev) => prev + limit);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-18">
      <div className="flex items-center justify-center mb-8">
        <GoogleAds size="top_banner" />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#7a0f1f]/10 via-[#7a0f1f]/5 to-transparent rounded-lg p-8 mb-12 border border-[#7a0f1f]/10">
        <div className="max-w-4xl">
          <h1 className="text-lg md:text-4xl font-bold text-black/80 mb-4">
            Hasil Pencarian: "{keyword}"
          </h1>
          <p className="text-md md:text-lg text-black/60 mb-6">
            Menampilkan berita yang cocok dengan kata kunci pencarian.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-black/60">
          Ditemukan {searchNews.length} berita
        </h2>

        <div className="flex border border-base-300 rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "btn-active" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "btn-active" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && searchNews.length === 0 && (
        <div className="text-center py-12">Loading hasil pencarian...</div>
      )}

      {/* Hasil News */}
      {searchNews.length > 0 && (
        <div
          className={`mb-12 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }`}
        >
          {searchNews.map((news) => (
            <NewsCard
              key={news.news_id}
              layout={viewMode}
              title={news.news_title}
              description={news.news_description}
              writer={news.news_writer}
              datePub={news.news_datepub}
              image={news.news_image_new}
              views={Number(news.pageviews)}
              url={news.url_ci4}
              category={news.cat_title}
            />
          ))}
        </div>
      )}

      {/* Loader area */}
      {hasMore && loadCount < 4 && <div ref={loaderRef} className="h-16" />}

      {hasMore && loadCount >= 4 && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreManually}
            className="btn btn-error btn-outline"
            hidden={isLoading}
          >
            Berita Lainnya
          </button>
        </div>
      )}
    </main>
  );
}

export default SearchDetail;
