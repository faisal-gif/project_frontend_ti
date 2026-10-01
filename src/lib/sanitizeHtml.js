import sanitizeHtml from 'sanitize-html';

// Konfigurasi sanitasi untuk konten artikel/halaman (buang <script>, handler on*,
// skema berbahaya) tapi tetap izinkan tag umum + embed dari host tepercaya.
const OPTIONS = {
    allowedTags: [
        'p', 'br', 'hr', 'span', 'div', 'blockquote', 'pre', 'code',
        'b', 'i', 'strong', 'em', 'u', 's', 'sub', 'sup', 'mark', 'small',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'dl', 'dt', 'dd',
        'a', 'img', 'figure', 'figcaption', 'picture', 'source',
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'colgroup', 'col',
        'iframe', // embed (YouTube, Instagram, dll) — dibatasi host di bawah
    ],
    allowedAttributes: {
        '*': ['class', 'id', 'style'],
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'srcset', 'sizes', 'alt', 'title', 'width', 'height', 'loading'],
        source: ['src', 'srcset', 'type', 'media', 'sizes'],
        iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'scrolling', 'title', 'loading'],
        blockquote: ['cite', 'data-instgrm-permalink', 'data-instgrm-version'],
        td: ['colspan', 'rowspan'],
        th: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['http', 'https', 'data'] },
    // iframe hanya dari host tepercaya → cegah iframe sembarangan.
    allowedIframeHostnames: [
        'www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com',
        'player.vimeo.com', 'www.instagram.com', 'instagram.com',
        'www.tiktok.com', 'platform.twitter.com',
        'www.google.com', 'maps.google.com',
        'www.facebook.com', 'web.facebook.com',
    ],
    // style divalidasi; hanya properti aman yang lolos (cegah expression/url berbahaya).
    allowedStyles: {
        '*': {
            'text-align': [/^(left|right|center|justify)$/],
            'width': [/^\d+(?:px|%|em|rem)$/],
            'height': [/^\d+(?:px|%|em|rem)$/],
        },
    },
    disallowedTagsMode: 'discard',
};

export function sanitizeArticleHtml(dirty) {
    return sanitizeHtml(String(dirty ?? ''), OPTIONS);
}
