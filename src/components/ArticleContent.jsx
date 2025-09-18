import React, { useCallback } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ReadAlso from './ReadAlso.jsx';

const ArticleContent = ({
  htmlContent,
  readAlsoArticles = [],
  getTextSizeClasses,
  lokus = '',
  className = '',
  url
}) => {
  let paragraphCount = 0;

  // Hitung jumlah paragraf dari htmlContent (kasar)
  const totalParagraphs = (htmlContent.match(/<p[\s>]/g) || []).length;
  const totalReadAlso = readAlsoArticles.length;

  // Tentukan di paragraf ke berapa saja ReadAlso ditaruh
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
            {domToReact(node.children)}
          </p>
        );
      }

      // Cek apakah paragraf ini masuk dalam distribusi ReadAlso
      const readAlsoIndex = distributeIndexes.indexOf(paragraphCount);
      if (readAlsoIndex !== -1) {
        return (
          <React.Fragment key={`frag-${index}`}>
            <p className={`text-foreground mb-6 ${getTextSizeClasses()}`}>
              {domToReact(node.children)}
            </p>
            <div className="my-2">
              <ReadAlso articles={[readAlsoArticles[readAlsoIndex]]} />
            </div>
          </React.Fragment>
        );
      }

      return (
        <p className={`text-foreground mb-6 ${getTextSizeClasses()}`} key={`p-${index}`}>
          {domToReact(node.children)}
        </p>
      );
    }
  };

const handleCopy = useCallback(
  (e) => {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // Ambil HTML yang diseleksi
    const container = document.createElement("div");
    for (let i = 0; i < selection.rangeCount; i++) {
      container.appendChild(selection.getRangeAt(i).cloneContents());
    }
    const selectedHtml = container.innerHTML;

    // Buat versi plain text dengan newline
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = selectedHtml;

    // Replace <p> dengan newline biar ada spasi
    const plainText = tempDiv.innerText; 

    const fullUrl = `https://timesindonesia.co.id${url}`;
    const watermarkText = `\n\n---\nSumber: TIMESINDONESIA\n${fullUrl}`;
    const watermarkHtml = `<br><br>---<br>Sumber: <a href="${fullUrl}" target="_blank" rel="noopener noreferrer">TIMESINDONESIA</a>`;

    // Simpan ke clipboard
    e.clipboardData.setData("text/plain", plainText + watermarkText);
    e.clipboardData.setData("text/html", selectedHtml + watermarkHtml);
  },
  [url]
);

  return (
    <div className={`prose max-w-none ${className}`}
      onCopy={handleCopy}>
      {parse(htmlContent, { replace: transform })}
    </div>
  );

};



export default ArticleContent;
