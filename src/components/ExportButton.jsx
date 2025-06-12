import React from 'react';
import { saveAs } from 'file-saver';

const ExportButton = ({ code, language }) => {
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const ext = language === 'Python' ? 'py' : language === 'JavaScript' ? 'js' : 'txt';
    saveAs(blob, `code-output.${ext}`);
  };

  return (
    <button onClick={handleDownload} style={{ marginTop: '1rem' }}>
      📥 Export Code
    </button>
  );
};

export default ExportButton;
