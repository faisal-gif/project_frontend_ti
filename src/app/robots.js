// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // blokir API
          '/_next/',      // blokir folder internal Next.js
        ],
      },
    ],
  }
}
