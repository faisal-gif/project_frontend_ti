import React, { useCallback, useEffect } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ReadAlso from './ReadAlso.jsx';
// import LazyAdopAd from './LazyAdopAd.jsx';
import GoogleAds from './GoogleAds.jsx';

/**
 * Convert inline style string to React style object
 */
const parseStyleString = (style = '') =>
  style.split(';').reduce((acc, item) => {
    const [key, value] = item.split(':');
    if (!key || !value) return acc;
    acc[key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase())] = value.trim();
    return acc;
  }, {});

const ArticleContent = ({
  htmlContent = '',
  readAlsoArticles = [],
  getTextSizeClasses,
  lokus = '',
  className = '',
  url = ''
}) => {
  let paragraphCount = 0;

  const totalParagraphs = (htmlContent.match(/<p[\s>]/g) || []).length;
  const totalReadAlso = readAlsoArticles.length;

  let distributeIndexes = [];
  if (totalParagraphs > 0 && totalReadAlso > 0) {
    const step = Math.ceil(totalParagraphs / totalReadAlso);
    distributeIndexes = readAlsoArticles.map((_, i) => (i + 2) * step);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [htmlContent]);

  const transform = (node, index) => {
    if (node.type !== 'tag') return;

    /**
     * =====================
     * HANDLE <span>
     * =====================
     */
    if (node.name === 'span') {
      return <>{domToReact(node.children, { replace: transform })}</>;
    }

    /**
     * =====================
     * HANDLE <p>
     * =====================
     */
    if (node.name === 'p') {
      paragraphCount++;

      const { style, class: htmlClass } = node.attribs || {};
      const reactStyle = style ? parseStyleString(style) : undefined;

      const firstTagChild = node.children?.find(
        child => child.type === 'tag'
      );

      /**
       * === P with IMAGE ===
       */
      if (firstTagChild?.name === 'img') {
        const { style: imgStyle, ...imgAttribs } = firstTagChild.attribs || {};
        const captionNodes = node.children.slice(1);

        return (
          <p
            key={`p-img-${index}`}
            style={reactStyle}
            className={`text-foreground mb-4 ${getTextSizeClasses()} ${htmlClass || ''}`}
          >
            <figure className="my-4">
              <img
                {...imgAttribs}
                className="block w-full rounded-lg mx-auto"
              />
              {captionNodes.length > 0 && (
                <figcaption className="mt-2 text-sm italic text-gray-600 text-center">
                  {domToReact(captionNodes, { replace: transform })}
                </figcaption>
              )}
            </figure>
          </p>
        );
      }

      /**
       * === PARAGRAPH FIRST ===
       */
      if (paragraphCount === 1) {
        return (
          <p
            key={`p-${index}`}
            style={reactStyle}
            className={`text-foreground mb-4 ${getTextSizeClasses()} ${htmlClass || ''}`}
          >
            <strong className="uppercase">
              {lokus?.trim() ? lokus : 'TIMESINDONESIA'} –{' '}
            </strong>
            {domToReact(node.children, { replace: transform })}
          </p>
        );
      }

      /**
       * === AFTER PARAGRAPH 2 (ADS) ===
       */
      if (paragraphCount === 2 || paragraphCount === 7) {
        return (
          <React.Fragment key={`frag-${index}`}>
            <p
              style={reactStyle}
              className={`text-foreground mb-4 ${getTextSizeClasses()} ${htmlClass || ''}`}
            >
              {domToReact(node.children, { replace: transform })}
            </p>
            {/* <LazyAdopAd /> */}
            <div className="my-6 flex justify-center w-full" key={`ad-wrapper-${index}`}>
              <GoogleAds size='inline_rectangle' slot='4691830761' />
            </div>
          </React.Fragment>
        );
      }

      /**
       * === READ ALSO DISTRIBUTION ===
       */
      const readAlsoIndex = distributeIndexes.indexOf(paragraphCount);
      if (readAlsoIndex !== -1 && readAlsoArticles[readAlsoIndex]) {
        return (
          <React.Fragment key={`frag-${index}`}>
            <p
              style={reactStyle}
              className={`text-foreground mb-4 ${getTextSizeClasses()} ${htmlClass || ''}`}
            >
              {domToReact(node.children, { replace: transform })}
            </p>
            <div className="my-2">
              <ReadAlso articles={[readAlsoArticles[readAlsoIndex]]} />
            </div>
          </React.Fragment>
        );
      }

      /**
       * === NORMAL PARAGRAPH ===
       */
      return (
        <p
          key={`p-${index}`}
          style={reactStyle}
          className={`text-foreground mb-4 ${getTextSizeClasses()} ${htmlClass || ''}`}
        >
          {domToReact(node.children, { replace: transform })}
        </p>
      );
    }
  };

  /**
   * =====================
   * COPY WATERMARK
   * =====================
   */
  const handleCopy = useCallback(
    (e) => {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const container = document.createElement('div');
      for (let i = 0; i < selection.rangeCount; i++) {
        container.appendChild(selection.getRangeAt(i).cloneContents());
      }

      const selectedHtml = container.innerHTML || '';
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = selectedHtml;

      const plainText = tempDiv.innerText || '';
      const fullUrl = url ? `https://timesindonesia.co.id${url}` : '';

      e.clipboardData.setData(
        'text/plain',
        plainText +
        (fullUrl
          ? `\n\n---\nSumber: TIMES INDONESIA\n${fullUrl}`
          : '')
      );

      e.clipboardData.setData(
        'text/html',
        selectedHtml +
        (fullUrl
          ? `<br><br>---<br>Sumber: <a href="${fullUrl}" target="_blank">TIMES INDONESIA</a>`
          : '')
      );
    },
    [url]
  );

  return (
    <div
      className={`prose prose-img:rounded-lg prose-img:mx-auto max-w-none w-full mx-auto ${className}`}
      onCopy={handleCopy}
    >
      {htmlContent ? parse(htmlContent, { replace: transform }) : null}

      <p className="italic text-foreground text-base md:text-lg">
        Simak breaking news dan berita pilihan TIMES Indonesia langsung dari WhatsApp-mu!
        <br />
        Klik 👉{' '}
        <a href="https://whatsapp.com/channel/0029VaFG7TP29757xsqaDd2D">
          Channel TIMES Indonesia
        </a>
        <br />
        Pastikan WhatsApp kamu sudah terpasang.
      </p>
    </div>
  );
};

export default ArticleContent;
