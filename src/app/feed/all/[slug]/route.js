import { getKanalDetail } from "@/lib/api/kanalApi";
import { getAllNews, getAllNewsIndex } from "@/lib/api/newsApi";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

function xmlConvert(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function character_limiter(str, limit) {
    return str.substring(0, limit);
}

function setLocusNews(content, city) {
    const cityText = city ? `<strong>${city.trim().toUpperCase()}</strong>` : ''; 

    let result = content;

    if (cityText) {
        const firstPIndex = content.indexOf('<p>'); 
        
        const afterFirstPIndex = firstPIndex + 3;
        
        if (firstPIndex !== -1) {
            const beforeP = content.substring(0, firstPIndex);          
            const afterP = content.substring(afterFirstPIndex); 
            
            result = `${beforeP}<p>${cityText} ${afterP}`;
        } else {
            result = `${cityText} ${content}`;
        }
    }
    
   
    return result;
}

function paragraph_fig_gnews(content) {
    return content;
}


export async function GET(request, { params }) {
    const { slug } = await params;
    let news = [];
    let kanal = [];

    try {
        kanal = await getKanalDetail({ slug });
        news = await getAllNewsIndex({ news_type: 'cat', cat_id: kanal.catnews_id, offset: 0, limit: 60 }) || [];
    } catch (error) {
        console.error("Error fetch focus:", error);
        news = [];
    }

    const rssItems = news.map(r => {
        const newsUrl = `${process.env.NEXT_PUBLIC_URL}${r.url_ci4}`;
        const imageUrl = `${r.news_image_new}?v=7.0.0`;

        // Proses konten berita (jika perlu)
        const content = setLocusNews(r.news_content, r.news_city);

        // Tentukan nama kreator
        const creator = r.news_writer ? xmlConvert(r.news_writer) : xmlConvert(r.editor_name);

        return `
      <item>
        <title><![CDATA[${r.news_title}]]></title>
        <description><![CDATA[${character_limiter(r.news_description, 200)}]]></description>
        <link>${newsUrl}</link>
        <content:encoded><![CDATA[${content}]]></content:encoded>
        <dc:creator><![CDATA[${creator}]]></dc:creator>
        <enclosure url="${imageUrl}" length="0" type="image/jpeg"/>
        <guid>${newsUrl}</guid>
        <pubDate>${new Date(r.news_datepub).toUTCString().replace(' GMT', ' +0000')}</pubDate>
      </item>
        `;
    }).join('');



    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
  <channel>
    <title><![CDATA[RSS Feed TIMES Indonesia - ${kanal.catnews_title}]]></title>
    <description><![CDATA[Berita Positif Terbaru dan Terkini]]></description>
    <link>${process.env.NEXT_PUBLIC_URL}</link>
 
    <pubDate>${new Date(r.news_datepub).toUTCString().replace(' GMT', ' +0000')}</pubDate>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssFeed, {
      headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
