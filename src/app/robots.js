// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 10,
        disallow: ['/search/*', '/search*']
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
        allow: '/',
        disallow: ['/search/*', '/search*']
      },
      {
        userAgent: 'SerpstatBot',
        crawlDelay: 10,
        allow: '/',
        disallow: ['/search/*', '/search*']
      },


    ],
    sitemap: 'https://www.timesindonesia.co.id/sitemap.xml',
  }
}
