import React from 'react';

const DownloadLink = ({ pdfUrl }) => {
  return (
    <div>
      <a href={pdfUrl} download>
        Download New PDF
      </a>
    </div>
  );
};

export default DownloadLink;
