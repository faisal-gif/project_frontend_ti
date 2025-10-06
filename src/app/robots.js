// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },

    ],
    sitemap: 'https://www.timesindonesia.co.id/sitemap.xml',
  }
}
