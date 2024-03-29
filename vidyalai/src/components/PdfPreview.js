import React from 'react';

const PdfPreview = ({ pdfUrl }) => {
  console.log('PdfUrl:', pdfUrl); // Log pdfUrl to check the value

  return (
    <div>
      <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};

export default PdfPreview;
