const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Serve files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve files from the 'output' directory
app.use('/output', express.static(path.join(__dirname, 'output')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Endpoint to handle PDF upload
app.post('/upload', upload.single('pdf'), (req, res) => {
  res.status(200).json({ pdfUrl: `http://localhost:${port}/uploads/${req.file.originalname}` });
});

// Endpoint to extract selected pages and create a new PDF
app.post('/extract-pages', async (req, res) => {
  const { pdfUrl, selectedPages } = req.body;
  const pdfBytes = fs.readFileSync(`uploads/${pdfUrl.split('/').pop()}`);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();

  for (const pageNum of selectedPages) {
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
    newPdf.addPage(copiedPage);
  }

  const extractedPdfBytes = await newPdf.save();
  const newPdfFileName = `newPdf_${Date.now()}.pdf`; // Generate a unique filename
  fs.writeFileSync(`output/${newPdfFileName}`, extractedPdfBytes);

  res.status(200).json({ newPdfUrl: `http://localhost:${port}/output/${newPdfFileName}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
