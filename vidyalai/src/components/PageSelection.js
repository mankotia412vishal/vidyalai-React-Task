import React, { useState } from 'react';

const PageSelection = ({ totalPages, onPageSelect }) => {
  const [selectedPages, setSelectedPages] = useState([]);

  const handleCheckboxChange = (pageNum) => {
    const updatedSelection = selectedPages.includes(pageNum)
      ? selectedPages.filter((page) => page !== pageNum)
      : [...selectedPages, pageNum];
    setSelectedPages(updatedSelection);
    onPageSelect(updatedSelection);
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
        <label key={pageNum}>
          <input
            type="checkbox"
            checked={selectedPages.includes(pageNum)}
            onChange={() => handleCheckboxChange(pageNum)}
          />
          Page {pageNum}
        </label>
      ))}
    </div>
  );
};

export default PageSelection;
