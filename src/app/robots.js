// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
        Sitemap: 'https://www.timesindonesia.co.id/sitemap.xml'
      },

    ],
  }
}
