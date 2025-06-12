import React, { useState } from 'react';
import { callGemini } from '../api/gemini';
import { toast } from 'react-toastify';
import CodeEditor from './CodeEditor';
import ExportButton from './ExportButton';

const CodeFixer = () => {
  const [buggyCode, setBuggyCode] = useState('');
  const [fixedCode, setFixedCode] = useState('');

  const handleFix = async () => {
    if (!buggyCode.trim()) {
      toast.error('Paste some buggy code!');
      return;
    }
    const prompt = `Fix the bugs in the following code:\n\n${buggyCode}`;
    const result = await callGemini(prompt);
    setFixedCode(result.text);
    saveToHistory('Bug Fixer', buggyCode, result.text);
  };

  const saveToHistory = (type, input, response) => {
    const history = JSON.parse(localStorage.getItem('gca-history') || '[]');
    history.unshift({ type, input, response, timestamp: new Date().toISOString() });
    localStorage.setItem('gca-history', JSON.stringify(history.slice(0, 50)));
  };

  return (
    <div>
      <h2>Bug Fixing Assistant</h2>
      <textarea
        rows="6"
        placeholder="Paste buggy code here..."
        value={buggyCode}
        onChange={(e) => setBuggyCode(e.target.value)}
      />
      <button onClick={handleFix}>Fix Code</button>
      {fixedCode && (
        <>
          <CodeEditor language="javascript" value={fixedCode} />
          <ExportButton code={fixedCode} language="JavaScript" />
        </>
      )}
    </div>
  );
};

export default CodeFixer;
