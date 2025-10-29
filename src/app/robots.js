// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search/*', '/search*']
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
        allow: '/',
      },
      {
        userAgent: 'SerpstatBot',
        crawlDelay: 10,
        allow: '/',
      },
      

    ],
    sitemap: 'https://www.timesindonesia.co.id/sitemap.xml',
  }
}
