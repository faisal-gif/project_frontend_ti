import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import ReadAlso from './ReadAlso.jsx';

const ArticleContent = ({
  htmlContent,
  readAlsoArticles,
  getTextSizeClasses,
  className = '',
}) => {
  let paragraphCount = 0;

  const transform = (node, index) => {
    if (node.name === 'p') {
      paragraphCount++;

      if (paragraphCount === 2) {
        return (
          <React.Fragment key={`frag-${index}`}>
            <p className={`text-foreground mb-6 ${getTextSizeClasses()}`}>
              {domToReact(node.children)}
            </p>
            <div className="my-8">
              <ReadAlso articles={readAlsoArticles} />
            </div>
          </React.Fragment>
        );
      }

      return (
        <p className={`text-foreground mb-6 ${getTextSizeClasses()}`}>
          {domToReact(node.children)}
        </p>
      );
    }
  };

  return (
    <div className={`prose max-w-none ${className}`}>
      {parse(htmlContent, { replace: transform })}
    </div>
  );
};

export default ArticleContent;
