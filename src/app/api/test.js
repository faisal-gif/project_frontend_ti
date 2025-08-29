export default function handler(req, res) {
  res.json({
    API_URL: process.env.API_URL,
    hasSecret: !!process.env.SECRET_KEY
  });
}