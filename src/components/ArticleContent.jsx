import React, { useCallback } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ReadAlso from './ReadAlso.jsx';

const ArticleContent = ({
  htmlContent = "",
  readAlsoArticles = [],
  getTextSizeClasses,
  lokus = '',
  className = '',
  url = ''
}) => {
  let paragraphCount = 0;

  // Hitung jumlah paragraf dengan fallback aman
  const totalParagraphs = (htmlContent.match(/<p[\s>]/g) || []).length;
  const totalReadAlso = readAlsoArticles.length;

  // Distribusi ReadAlso
  let distributeIndexes = [];
  if (totalParagraphs > 0 && totalReadAlso > 0) {
    const step = Math.ceil(totalParagraphs / totalReadAlso);
    distributeIndexes = readAlsoArticles.map((_, i) => (i + 2) * step);
  }

  const transform = (node, index) => {
    if (node.name === 'p') {
      paragraphCount++;

      // Paragraf pertama -> tambahkan pembuka TIMESINDONESIA
      if (paragraphCount === 1) {
        return (
          <p className={`text-foreground mb-6 ${getTextSizeClasses()}`} key={`p-${index}`}>
            <strong>TIMESINDONESIA, {lokus} - </strong>
            {domToReact(node.children || [])}
          </p>
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
      const watermarkText = fullUrl ? `\n\n---\nSumber: TIMESINDONESIA\n${fullUrl}` : "";
      const watermarkHtml = fullUrl ? `<br><br>---<br>Sumber: <a href="${fullUrl}" target="_blank" rel="noopener noreferrer">TIMESINDONESIA</a>` : "";

      e.clipboardData.setData("text/plain", plainText + watermarkText);
      e.clipboardData.setData("text/html", selectedHtml + watermarkHtml);
    },
    [url]
  );

  return (
    <div className={`prose max-w-none ${className}`} onCopy={handleCopy}>
      {htmlContent ? parse(htmlContent, { replace: transform }) : null}
    </div>
  );
};

export default ArticleContent;
