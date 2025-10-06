import React, { useCallback, useEffect } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ReadAlso from './ReadAlso.jsx';
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

  // Komponen Advertisement
  const Advertisement = () => (
    <div className="my-2 mx-auto">
      <p className="font-light text-sm text-center mb-1">Advertisement</p>
      <ins
        className="adsbyadop"
        _adop_zon="424c828c-767f-47c2-bf93-4bb10c62e94e"
        _adop_type="re"
        style={{ display: "inline-block", width: "300px", height: "250px" }}
        _page_url=""
      ></ins>

      <Script
        src="https://compass.adop.cc/assets/js/adop/adopJ.js?v=14"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
    </div>
  );



  const transform = (node, index) => {

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
            <Advertisement />
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


      <div className={`prose prose-img:rounded-lg prose-img:mx-auto max-w-[720px] w-full mx-auto px-4 ${className}`} onCopy={handleCopy}>
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
