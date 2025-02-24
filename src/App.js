import React, { useState } from 'react';
import PdfViewer from './PdfViewer'; // This version should support showing all pages
import PdfModal from './PdfModal';
import NavBar from './NavBar';
import './AppStyles.css';
import { downloadMergedPDFs } from './pdfUtils';
import pdfCategories from './pdfConfig';

function App() {
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState("Enter filename");
  const [allOpen, setAllOpen] = useState(false);



  // State to manage which categories are open
  const [openCategories, setOpenCategories] = useState(Object.keys(pdfCategories).reduce((acc, category) => {
    acc[category] = false;
    return acc;
  }, {}));

  const togglePdfSelection = (file) => {
    setSelectedPdfs((prev) => prev.includes(file) ? prev.filter(f => f !== file) : [...prev, file]);
  };

  const handlePreview = (event, file) => {
    event.stopPropagation();
    setPreviewPdf(file);
  };

  const removeSelectedPdf = (index) => {
    setSelectedPdfs((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleAllCategories = () => {
    const newState = !allOpen;
    setAllOpen(newState);
    setOpenCategories(Object.keys(pdfCategories).reduce((acc, category) => ({ ...acc, [category]: newState }), {}));
  };

  const moveSelectedUp = (index) => {
    setSelectedPdfs((currentSelectedPdfs) => {
      if (index === 0) return currentSelectedPdfs; // Can't move up the first item
      const newSelectedPdfs = [...currentSelectedPdfs];
      [newSelectedPdfs[index - 1], newSelectedPdfs[index]] = [newSelectedPdfs[index], newSelectedPdfs[index - 1]]; // Swap
      return newSelectedPdfs;
    });
  };

  const moveSelectedDown = (index) => {
    setSelectedPdfs((currentSelectedPdfs) => {
      if (index === currentSelectedPdfs.length - 1) return currentSelectedPdfs; // Can't move down the last item
      const newSelectedPdfs = [...currentSelectedPdfs];
      [newSelectedPdfs[index], newSelectedPdfs[index + 1]] = [newSelectedPdfs[index + 1], newSelectedPdfs[index]]; // Swap
      return newSelectedPdfs;
    });
  };

  return (
    <div>
      <NavBar />
      <div className="app-container">
        <div className="pdf-selector-container">
          <button onClick={toggleAllCategories}>{allOpen ? 'Collapse All' : 'Expand All'}</button>
          {Object.keys(pdfCategories).map((category) => (
            <div className="menu" key={category}>
              <h3 onClick={() => toggleCategory(category)}>{category} {openCategories[category] ? '▼' : '►'}</h3>
              {openCategories[category] && (
                <div className="pdf-grid">
                  {pdfCategories[category].map((pdf, index) => (
                    <div key={index} className={`pdf-item ${selectedPdfs.includes(pdf.path) ? 'selected' : ''}`} onClick={() => togglePdfSelection(pdf.path)}>
                      {/* Display the PDF name */}
                      <div className="pdf-name">{pdf.name}</div>
                      {/* Display only the first page for items under the menu */}
                      <div className="pdf-image">
                        <PdfViewer
                          file={pdf.path}
                          tileWidth="200px" // Adjust based on your CSS settings for .pdf-item
                          showAllPages={false}
                        />
                      </div>
                      <button id="previewbutton" onClick={(e) => { e.stopPropagation(); handlePreview(e, pdf.path); }}>Preview</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pdfs-selected-container">
            <div className="download-controls">
              <input
                type="text"
                placeholder="Enter filename"
                value={downloadFileName}
                onChange={(e) => setDownloadFileName(e.target.value)}
              />
              <button id="downloadbutton" onClick={() => downloadMergedPDFs(selectedPdfs, downloadFileName)}>Download</button>
            </div>

            {previewPdf && (
              <PdfModal isOpen={!!previewPdf} file={previewPdf} onClose={() => setPreviewPdf(null)}>
                {/* Assuming PdfViewer is capable of rendering all pages for the preview */}
                <PdfViewer file={previewPdf} width={600} showAllPages={true} />
              </PdfModal>
            )}
          {selectedPdfs.map((file, index) => (
            <div key={index} className="selected-pdf-item">
              <div className="pdf-viewer-container">

                <PdfViewer file={file} width={600} showAllPages={true} />
              </div>
              <div className="flex-container">
                <div className="flex-item remove-button" onClick={() => removeSelectedPdf(index)}></div>
                {index !== 0 && (
                  <div className="flex-item up-arrow" onClick={() => moveSelectedUp(index)}></div>
                )}
                {index !== selectedPdfs.length - 1 && (
                  <div className="flex-item down-arrow" onClick={() => moveSelectedDown(index)}></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


}

export default App;
