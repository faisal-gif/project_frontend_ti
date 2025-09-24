import { NextResponse } from "next/server";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  try {
    const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC_oaQ5H-K9oA3V0JaXiB6ww";
    const { data } = await axios.get(url);

    const parser = new XMLParser({
      ignoreAttributes: false, // penting biar @atribut ikut terbaca
    });
    const parsed = parser.parse(data);

    const videos = parsed.feed.entry.map((item) => ({
      id: item["yt:videoId"],
      title: item.title,
      link: item.link["@_href"],
      published: item.published,
      updated: item.updated,
      author: item.author.name,
      thumbnail: `https://img.youtube.com/vi/${item["yt:videoId"]}/hqdefault.jpg`,
      views: item["media:group"]["media:community"]["media:statistics"]["@_views"],
      description: item["media:group"]["media:description"],
    }));

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
