import React, { useCallback, useEffect } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ReadAlso from './ReadAlso.jsx';
import LazyAdopAd from './LazyAdopAd.jsx';
import Script from 'next/script.js';

const ArticleContent = ({
  htmlContent = "",
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

    if (node.type === 'tag' && node.name === 'p') {
      const firstChild = node.children.find(child => child.type === 'tag');

      if (firstChild && firstChild.name === 'img') {
        // --- PERBAIKAN DI SINI ---
        // Kita pisahkan atribut 'style' dari sisa atribut lainnya
        const { style, ...restOfAttribs } = firstChild.attribs;

        const captionNodes = node.children.slice(1);

        return (
          <figure className="mb-6">
            {/* Gunakan sisa atribut, sehingga 'style' dari DB akan terbuang */}
            <img {...restOfAttribs} className="block w-full rounded-lg" />
            <figcaption className="mt-2 text-sm italic text-gray-600 text-center">
              {domToReact(captionNodes, { replace: transform })}
            </figcaption>
          </figure>
        );
      }
    }

    if (node.name === 'span') {
      return <>{domToReact(node.children, { replace: transform })}</>;
    }

    if (node.name === 'p') {
      paragraphCount++;

      // Paragraf pertama
      if (paragraphCount === 1) {
        return (
          <p className={`text-foreground mb-6 ${getTextSizeClasses()}`} key={`p-${index}`}>
            <strong className='uppercase'>{lokus && lokus.trim() !== "" ? lokus : "TIMESINDONESIA"} – </strong>
            {domToReact(node.children || [])}
          </p>
        );
      }

      // Setelah paragraf ke-2 → tampilkan iklan
      if (paragraphCount === 2) {
        return (
          <React.Fragment key={`frag-${index}`}>
            <p className={`text-foreground mb-6 ${getTextSizeClasses()}`}>
              {domToReact(node.children || [])}
            </p>
            <LazyAdopAd />
          </React.Fragment>
        );
      }

      // Cek distribusi ReadAlso
      const readAlsoIndex = distributeIndexes.indexOf(paragraphCount);
      if (readAlsoIndex !== -1 && readAlsoArticles[readAlsoIndex]) {
        return (
          <React.Fragment key={`frag-${index}`}>
            <p className={`text-foreground mb-6 ${getTextSizeClasses()}`}>
              {domToReact(node.children || [])}
            </p>
            <div className="my-2">
              <ReadAlso articles={[readAlsoArticles[readAlsoIndex]]} />
            </div>
          </React.Fragment>
        );
      }

      return (
        <p className={`text-foreground mb-6 ${getTextSizeClasses()}`} key={`p-${index}`}>
          {domToReact(node.children || [])}
        </p>
      );
    }
  };

  const handleCopy = useCallback(
    (e) => {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const container = document.createElement("div");
      for (let i = 0; i < selection.rangeCount; i++) {
        container.appendChild(selection.getRangeAt(i).cloneContents());
      }
      const selectedHtml = container.innerHTML || "";

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = selectedHtml;
      const plainText = tempDiv.innerText || "";

      const fullUrl = url ? `https://timesindonesia.co.id${url}` : "";
      const watermarkText = fullUrl ? `\n\n---\nSumber: TIMES INDONESIA\n${fullUrl}` : "";
      const watermarkHtml = fullUrl ? `<br><br>---<br>Sumber: <a href="${fullUrl}" target="_blank" rel="noopener noreferrer">TIMES INDONESIA</a>` : "";

      e.clipboardData.setData("text/plain", plainText + watermarkText);
      e.clipboardData.setData("text/html", selectedHtml + watermarkHtml);
    },
    [url]
  );

  return (
    <>
      <div className={`prose prose-img:rounded-lg prose-img:mx-auto prose-img:!w-auto max-w-none w-full mx-auto ${className}`} onCopy={handleCopy}>
        {htmlContent ? parse(htmlContent, { replace: transform }) : null}
        <p className='italic text-foreground text-base md:text-lg'>
          Simak breaking news dan berita pilihan TIMES Indonesia langsung dari WhatsApp-mu!
          <br />
          Klik 👉 <a href="https://whatsapp.com/channel/0029VaFG7TP29757xsqaDd2D">Channel TIMES Indonesia</a>
          <br />
          Pastikan WhatsApp kamu sudah terpasang.
        </p>
      </div>



    </>

  );
};

export default ArticleContent;
