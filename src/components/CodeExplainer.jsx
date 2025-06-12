import React, { useState } from 'react';
import { callGemini } from '../api/gemini';
import { toast } from 'react-toastify';

const CodeExplainer = () => {
  const [codeInput, setCodeInput] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleExplain = async () => {
    if (!codeInput.trim()) return toast.error('Paste some code to explain!');
    const prompt = `Explain the following code line by line:\n\n${codeInput}`;
    const result = await callGemini(prompt);
    setExplanation(result.text);
    saveToHistory('Code Explainer', codeInput, result.text);
  };

  const saveToHistory = (type, input, response) => {
    const history = JSON.parse(localStorage.getItem('gca-history') || '[]');
    history.unshift({ type, input, response, timestamp: new Date().toISOString() });
    localStorage.setItem('gca-history', JSON.stringify(history.slice(0, 50)));
  };

  return (
    <div>
      <h2>Code Explainer</h2>
      <textarea
        rows="6"
        placeholder="Paste code here..."
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
      />
      <button onClick={handleExplain}>Explain</button>
      {explanation && <pre style={{ whiteSpace: 'pre-wrap' }}>{explanation}</pre>}
    </div>
  );
};

export default CodeExplainer;
