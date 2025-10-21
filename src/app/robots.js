// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/search/*', '/search*']
      },

    ],
    sitemap: 'https://www.timesindonesia.co.id/sitemap.xml',
  }
}
