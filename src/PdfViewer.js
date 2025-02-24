import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer({ file, showAllPages = false, tileWidth }) {
  const [numPages, setNumPages] = useState(null);
  const pdfContainerRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Dynamically calculate the scale based on the container's width and the PDF's width
  const calculateScale = () => {
    if (!pdfContainerRef.current) return 1; // Fallback scale

    const containerWidth = pdfContainerRef.current.offsetWidth;
    // Assuming a standard PDF width of 595px at scale 1
    const standardPdfWidth = 595;
    const scale = containerWidth / standardPdfWidth;

    return scale;
  };

  return (
    <div ref={pdfContainerRef} className="pdf-viewer" style={{ width: tileWidth }}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {showAllPages ? (
          Array.from({ length: numPages }, (_, index) => (
            <Page key={index} pageNumber={index + 1} scale={calculateScale()} />
          ))
        ) : (
          <Page pageNumber={1} scale={calculateScale()} />
        )}
      </Document>
    </div>
  );
}

export default PdfViewer;
