import React, { useState } from 'react';
import { callGemini } from '../api/gemini';
import { enhancePrompt } from '../utils/enhancer';
import { toast } from 'react-toastify';

const ChatAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return toast.error('Ask something!');
    const prompt = enhancePrompt(query);
    const result = await callGemini(prompt);
    setResponse(result.text);
    saveToHistory('Chat Assistant', query, result.text);
  };

  const saveToHistory = (type, input, response) => {
    const history = JSON.parse(localStorage.getItem('gca-history') || '[]');
    history.unshift({ type, input, response, timestamp: new Date().toISOString() });
    localStorage.setItem('gca-history', JSON.stringify(history.slice(0, 50)));
  };

  return (
    <div>
      <h2>AI Chat Assistant</h2>
      <textarea
        rows="2"
        placeholder="Ask your programming question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleAsk}>Ask Gemini</button>
      {response && <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>}
    </div>
  );
};

export default ChatAssistant;