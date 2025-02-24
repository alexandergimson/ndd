// pdfUtils.js
import { PDFDocument } from 'pdf-lib';

export async function downloadMergedPDFs(pdfFiles, fileName = "Enter filename") {
  const mergedPdf = await PDFDocument.create();
  
  for (let file of pdfFiles) {
    const pdfBytes = await fetch(file).then(res => res.arrayBuffer());
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName || "Enter filename"; // Use the provided file name or default to "merged.pdf"
  link.click();
}
