// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search/*', '/search*', '/tag/*', '/tag*']
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
        allow: '/',
        disallow: ['/search/*', '/search*', '/tag/*', '/tag*']
      },
      {
        userAgent: 'SerpstatBot',
        crawlDelay: 10,
        allow: '/',
        disallow: ['/search/*', '/search*', '/tag/*', '/tag*']
      },


    ],
    sitemap: 'https://www.timesindonesia.co.id/sitemap.xml',
  }
}
