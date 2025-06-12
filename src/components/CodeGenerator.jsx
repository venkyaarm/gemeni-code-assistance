import React, { useState } from 'react';
import { callGemini } from '../api/gemini';
import { enhancePrompt } from '../utils/enhancer';
import { extractCodeOnly } from '../utils/codeUtils';  // <-- import utility
import CodeEditor from './CodeEditor';
import ExportButton from './ExportButton';
import { toast } from 'react-toastify';

const CodeGenerator = () => {
  const [language, setLanguage] = useState('JavaScript');
  const [task, setTask] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    if (!task.trim()) return toast.error('Enter a task description!');
    const prompt = enhancePrompt(`Generate ${language} code for: ${task}`);

    const result = await callGemini(prompt);

    // Extract raw code only from AI response
    const cleanCode = extractCodeOnly(result.text);

    setOutput(cleanCode);
    saveToHistory('Code Generator', task, cleanCode);
  };

  const saveToHistory = (type, input, response) => {
    const history = JSON.parse(localStorage.getItem('gca-history') || '[]');
    history.unshift({ type, input, response, timestamp: new Date().toISOString() });
    localStorage.setItem('gca-history', JSON.stringify(history.slice(0, 50)));
  };

  return (
    <div>
      <h2>Code Generator</h2>
      <textarea
        rows="2"
        placeholder="Describe what code you need..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option>JavaScript</option>
        <option>Python</option>
        <option>HTML</option>
        <option>CSS</option>
        <option>Java</option>
        <option>C++</option>
      </select>
      <button onClick={handleGenerate}>Generate</button>
      {output && (
        <>
          <CodeEditor language={language.toLowerCase()} value={output} />
          <ExportButton code={output} language={language} />
        </>
      )}
    </div>
  );
};

export default CodeGenerator;
