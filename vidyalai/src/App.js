import React, { useState } from 'react';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import PageSelection from './components/PageSelection';
import PdfPreview from './components/PdfPreview';
import DownloadLink from './components/DownloadLink';
import './App.css';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setPdfUrl(response.data.pdfUrl);
      setSelectedPages([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageSelect = (pages) => {
    setSelectedPages(pages);
  };

  const handleCreatePdf = async () => {
    try {
      const response = await axios.post('http://localhost:5000/extract-pages', {
        pdfUrl,
        selectedPages,
      });
      setPdfUrl(response.data.newPdfUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>PDF Extractor</h1>
      <UploadForm onFileUpload={handleFileUpload} />
      {pdfUrl && (
        <>
          <PdfPreview pdfUrl={pdfUrl} />
          <PageSelection totalPages={10} onPageSelect={handlePageSelect} />
          <button onClick={handleCreatePdf}>Create New PDF</button>
          <DownloadLink pdfUrl={pdfUrl} />
        </>
      )}
    </div>
  );
};

export default App;
